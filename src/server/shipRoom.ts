import * as Colyseus from 'colyseus';
import Account from './account';
import ShipState from '../common/shipState';
import accountManager from './accountManager';
import PlayerState from '../common/playerState';
import CelestialSystemState from '../common/celestialSystemState';

interface ShipMetadata {
    readonly shipId: string;
}

type CelestialSystemClient = Colyseus.Client<{
    messages: {
        notify: string
    },
    auth: Account,
}>

export default class ShipRoom extends Colyseus.Room<{
    state: ShipState,
    metadata: ShipMetadata,
    client: CelestialSystemClient,
}> {
    public override state: ShipState;

    public override messages = {
        ready: (client: CelestialSystemClient): void => {
            const player = this.state.players.get(client.sessionId);
            if (!player.ready) {
                this.broadcast("notify", `welcome aboard, ${client.auth.name}`);
                this.clock.setTimeout(() => client.send("notify", "The Quick Brown Fox Jumped Over The Lazy Dog"), 4000);
                this.state.players.get(client.sessionId).ready = true;
            }
        }
    };

    public override onCreate(options: { shipId: string }): void {
        this.metadata = { shipId: options.shipId };
        this.state = new ShipState;
    }

    public override async onAuth(_client: Colyseus.Client, _options: unknown, context: Colyseus.AuthContext): Promise<Account | false> {
        const tokenRegex = /token=(?<token>[\w\d-]*)/gm.exec(context.headers.get("cookie"));
        if (!tokenRegex || !tokenRegex.groups?.token) return false;
        const account = await accountManager.verify(tokenRegex.groups.token);
        if (!account) return false;
        return account;
    }

    public override onJoin(client: CelestialSystemClient): void {
        this.state.players.set(client.sessionId, new PlayerState(client.auth.name));
    }

    public override onLeave(client: CelestialSystemClient): void {
        this.state.players.delete(client.sessionId);
    }
}
