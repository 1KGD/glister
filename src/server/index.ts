import 'reflect-metadata';
import * as Colyseus from 'colyseus';
import GameRoom from './gameRoom';
import config from '../../config';
import accountManager from './accountManager';
import ormDataSource from './ormDataSource';
import routes from './routes';
import cookieParser from 'cookie-parser';
await ormDataSource.initialize();
console.log(accountManager);
//await accountManager.addAccount("john","foo");
//await accountManager.login("john","foo");
await Colyseus.defineServer({
    routes,
    express: (app)=>{
        app.use(cookieParser());
    },
    transport: new Colyseus.WebSocketTransport(),
    rooms: {
        game: Colyseus.defineRoom(GameRoom),
    },
    greet: !config.dev,
}).listen(config.multiplayer.port);