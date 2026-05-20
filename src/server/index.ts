import 'reflect-metadata';
import * as Colyseus from 'colyseus';
import GameRoom from './gameRoom';
import config from '../../config';
import accountManager from './accountManager';
import ormDataSource from './ormDataSource';
await ormDataSource.initialize();
console.log(accountManager);
//await accountManager.addAccount("john","foo");
//await accountManager.login("john","foo");
await Colyseus.defineServer({
    transport: new Colyseus.WebSocketTransport(),
    rooms: {
        game: Colyseus.defineRoom(GameRoom),
    },
    greet: !config.dev,
}).listen(config.multiplayer.port);