import React from 'react';
import PositionState from '../../common/positionState';

export default function Ship({ position }: { position: PositionState }): React.JSX.Element {
    return <mesh position={[position.x, position.y, position.z]}>
        <boxGeometry />
        <meshNormalMaterial />
    </mesh>;
}