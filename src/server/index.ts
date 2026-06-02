import 'reflect-metadata';
import * as Colyseus from 'colyseus';
import GameRoom from './gameRoom';
import config from '../../config';
import ormDataSource from './ormDataSource';
import routes from './routes';
import cookieParser from 'cookie-parser';
import CelestialSystem, { createCelestialSystem } from './celestialSystem';

const server = Colyseus.defineServer({
    routes,
    express: (app) => {
        app.use(cookieParser());
    },
    transport: new Colyseus.WebSocketTransport(),
    rooms: {
        lobby: Colyseus.defineRoom(Colyseus.LobbyRoom),
        game: Colyseus.defineRoom(GameRoom),
    },
    greet: !config.dev,
});

ormDataSource.initialize().then(async () => {
    setTimeout(async (): void =>
        void (await ormDataSource.manager.findOneBy(CelestialSystem, {})).createSession(), 5000);
    await server.listen(config.multiplayer.port);
}
).catch(e => { throw e; });

export default server;