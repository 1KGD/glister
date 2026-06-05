import 'reflect-metadata';
import * as Colyseus from 'colyseus';
import CelestialSystemRoom from './celestialSystemRoom';
import config from '../../config';
import ormDataSource from './ormDataSource';
import routes from './routes';
import cookieParser from 'cookie-parser';
import CelestialSystem, { createCelestialSystems } from './celestialSystem';

export class StagingRoom extends Colyseus.Room {
    public override onJoin(client: Colyseus.Client): void {
        this.clock.setTimeout(async () => client.send("switch", await (await ormDataSource.manager.findOneBy(CelestialSystem, {})).createSession()), 1000);
    }
}

const server = Colyseus.defineServer({
    routes,
    express: (app) => {
        app.use(cookieParser());
    },
    transport: new Colyseus.WebSocketTransport(),
    rooms: {
        lobby: Colyseus.defineRoom(Colyseus.LobbyRoom),
        celestialSystem: Colyseus.defineRoom(CelestialSystemRoom),
        staging: Colyseus.defineRoom(StagingRoom)
    },
    greet: !config.dev,
});

ormDataSource.initialize().then(async () => {
    if (!await ormDataSource.manager.findOneBy(CelestialSystem, {})) await createCelestialSystems();
    await server.listen(config.multiplayer.port);
}
).catch(e => { throw e; });

export default server;