import React from 'react';
import PositionState from '../../common/positionState';
import roomProvider from '../roomProvider';
import Player from '../player';

export default function Ship({ position }: { position: PositionState }): React.JSX.Element {
    const state = roomProvider.ship.useRoomState();
    return <mesh position={[position.x, position.y, position.z]}>
        <torusKnotGeometry />
        <meshPhysicalMaterial metalness={0.8} roughness={0.4} color="orange" />
        {state?.players && Object.values(state.players).map((player, i) => <Player key={i} name={player.name} position={player.position as PositionState} isLocal />)}
    </mesh>;
}