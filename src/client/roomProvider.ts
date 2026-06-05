import * as ColyseusReact from '@colyseus/react';
import type CelestialSystemRoom from '../server/celestialSystemRoom';
import { type Metadata } from '../server/celestialSystemRoom';
import { StagingRoom } from '../server';
export default {
    staging: ColyseusReact.createRoomContext<StagingRoom>(),
    game: ColyseusReact.createRoomContext<CelestialSystemRoom>(),
    lobby: ColyseusReact.createLobbyContext<Metadata>()
};