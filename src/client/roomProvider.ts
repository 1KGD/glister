import * as ColyseusReact from '@colyseus/react';
import type CelestialSystemRoom from '../server/celestialSystemRoom';
import type ShipRoom from '../server/shipRoom';
import { type CelestialSystemMetadata } from '../server/celestialSystemRoom';
import { type StagingRoom } from '../server';
export default {
    staging: ColyseusReact.createRoomContext<StagingRoom>(),
    celestialSystem: ColyseusReact.createRoomContext<CelestialSystemRoom>(),
    ship: ColyseusReact.createRoomContext<ShipRoom>(),
    lobby: ColyseusReact.createLobbyContext<CelestialSystemMetadata>()
};