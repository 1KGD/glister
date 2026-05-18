import * as Colyseus from 'colyseus';
import { GameRoom } from './gameRoom';
import config from '../../config';
await Colyseus.defineServer({
    transport: new Colyseus.WebSocketTransport(),
    rooms: {
        game: Colyseus.defineRoom(GameRoom),
    },
    greet: false,
}).listen(config.multiplayer.port);