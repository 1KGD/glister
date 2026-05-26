import * as ColyseusReact from '@colyseus/react';
import type GameRoom from '../server/gameRoom';
import { type Metadata } from '../server/gameRoom';
export default { ...ColyseusReact.createRoomContext<GameRoom>(), ...ColyseusReact.createLobbyContext<Metadata>() };