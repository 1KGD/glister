import * as Colyseus from 'colyseus';
import CelestialSystemState, * as State from '../common/celestialSystemState';
import accountManager from './accountManager';
import ormDataSource from './ormDataSource';
import CelestialSystem from './celestialSystem';
import Ship from './ship';

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

        for (const ship of await system.ships) {
            const schema = ship.toSchemaState();
            this.state.ships.set(ship.id, schema);
            schema.updateSystem = this.clock.setInterval(() => schema.position.x += 0.1, 1000 / 20);
        }

        this.clock.setInterval(async () => await this.saveState(), 5000);
    }

    public override async onDispose(): Promise<void> {
        await this.saveState();
    }

    private async saveState(): Promise<void> {
        for (const [id, ship] of this.state.ships) {
            const shipEntry = await ormDataSource.manager.findOneBy(Ship, { id });
            shipEntry.positionFromState(ship.position);
            await ormDataSource.manager.save(shipEntry);
        }
    }

    public override async onAuth(_client: Colyseus.Client, _options: unknown, context: Colyseus.AuthContext): Promise<ClientAuth | boolean> {
        const tokenRegex = /token=(?<token>[\w\d-]*)/gm.exec(context.headers.get("cookie"));
        if (!tokenRegex || !tokenRegex.groups?.token) return false;
        const account = await accountManager.verify(tokenRegex.groups.token);
        if (!account) return false;
        return { name: account.name };
    }

    public override onJoin(client: Client): void {
    }

    public override onLeave(client: Client): void {
    }
}