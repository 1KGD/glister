import * as ColyseusReact from '@colyseus/react';
import GameState from '../common/gameState';
import { type GameRoom } from '../server/gameRoom';
export default ColyseusReact.createRoomContext<GameRoom>();