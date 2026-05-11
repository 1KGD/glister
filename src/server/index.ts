import * as Colyseus from 'colyseus';
import { GameRoom } from './gameRoom';
import config from '../../config';
await Colyseus.defineServer({
    rooms: {
        game: Colyseus.defineRoom(GameRoom),
    },
}).listen(config.multiplayer.port);