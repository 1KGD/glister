import * as ColyseusReact from '@colyseus/react';
import type GameRoom from '../server/gameRoom';
import { type Metadata } from '../server/gameRoom';
import { StagingRoom } from '../server';
export default {
    staging: ColyseusReact.createRoomContext<StagingRoom>(),
    game: ColyseusReact.createRoomContext<GameRoom>(),
    lobby: ColyseusReact.createLobbyContext<Metadata>()
};