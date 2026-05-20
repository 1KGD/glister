import 'reflect-metadata';
import * as Colyseus from 'colyseus';
import GameRoom from './gameRoom';
import config from '../../config';
import { AccountManager } from './accountManager';
console.log(AccountManager);
await Colyseus.defineServer({
    transport: new Colyseus.WebSocketTransport(),
    rooms: {
        game: Colyseus.defineRoom(GameRoom),
    },
    greet: !config.dev,
}).listen(config.multiplayer.port);