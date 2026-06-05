import * as Colyseus from 'colyseus';
import CelestialSystemState, * as State from '../common/celestialSystemState';
import accountManager from './accountManager';
import config from '../../config';
import PlayerState from '../common/playerState';
import ormDataSource from './ormDataSource';
import CelestialSystem from './celestialSystem';

export interface Metadata {
}

type ClientAuth = { name: string }

type Client = Colyseus.Client<{
    messages: {
    },
    auth: ClientAuth,
}>

export default class CelestialSystemRoom extends Colyseus.Room<{
    state: CelestialSystemState,
    metadata: Metadata,
    client: Client,
}> {
    public override state: CelestialSystemState;

    public override messages = {

    };

    public override async onCreate(options: { systemId: string }): Promise<void> {
        const system = await ormDataSource.manager.findOneBy(CelestialSystem, { id: options.systemId });
        this.state = new CelestialSystemState(system);
    }

    public override async onAuth(_client: Colyseus.Client, _options: unknown, context: Colyseus.AuthContext): Promise<ClientAuth | boolean> {
        const tokenRegex = /token=(?<token>[\w\d-]*)/gm.exec(context.headers.get("cookie"));
        if (!tokenRegex || !tokenRegex.groups?.token) return false;
        const account = await accountManager.verify(tokenRegex.groups.token);
        if (!account) return false;
        return { name: account.name };
    }

    public override onJoin(client: Client): void {
        const ship = new State.CelestialShipState(client.auth.name);
        ship.updateSystem = this.clock.setInterval(() => ship.position.y += 0.01, 1);
        this.state.ships.set(client.sessionId, ship);
    }

    public override onLeave(client: Client): void {
        this.state.ships.delete(client.sessionId);
    }
}