import React from 'react';
import PositionState from '../../common/positionState';

export default function Ship({ position }: { position: PositionState }): React.JSX.Element {
    return <mesh position={[position.x, position.y, position.z]}>
        <torusKnotGeometry />
        <meshPhysicalMaterial metalness={0.8} roughness={0.4} color="red" />
    </mesh>;
}