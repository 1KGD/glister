import 'reflect-metadata';
import * as Colyseus from 'colyseus';
import GameRoom from './gameRoom';
import config from '../../config';
import ormDataSource from './ormDataSource';
import routes from './routes';
import cookieParser from 'cookie-parser';
import CelestialSystem, { createCelestialSystem } from './celestialSystem';

export class StagingRoom extends Colyseus.Room {
    public override async onJoin(client: Colyseus.Client): Promise<void> {
        client.send("switch", await (await ormDataSource.manager.findOneBy(CelestialSystem, {})).createSession());
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
        game: Colyseus.defineRoom(GameRoom),
        staging: Colyseus.defineRoom(StagingRoom)
    },
    greet: !config.dev,
});

ormDataSource.initialize().then(async () => {
    await server.listen(config.multiplayer.port);
}
).catch(e => { throw e; });

export default server;