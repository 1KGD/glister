import React from 'react';
import PositionState from '../../common/positionState';

export default function Ship({ position }: { position: PositionState }): React.JSX.Element {
    return <mesh position={[position.x, position.y, position.z]}>
        <boxGeometry />
        <meshPhysicalMaterial metalness={0.6} roughness={0.2} />
    </mesh>;
}