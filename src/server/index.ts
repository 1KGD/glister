//import 'reflect-metadata';
import * as Colyseus from 'colyseus';
import GameRoom from './gameRoom';
import config from '../../config';
import ormDataSource from './ormDataSource';
import routes from './routes';
import cookieParser from 'cookie-parser';
import accountManager from './accountManager';
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
    await accountManager.createAdventure(1, "foo");
    await server.listen(config.multiplayer.port);
}
).catch(e => { throw e; });
export default server;