import * as React from 'react';
import * as DREI from '@react-three/drei';
import PositionState from '../common/positionState';
import roomProvider from './roomProvider';

export default function Player({ name, position }: { name: string, position: PositionState }): React.JSX.Element {
    return <group scale={0.4} position={[position.x, position.y, position.z]}>
        <DREI.CameraControls />
        <mesh>
            <torusKnotGeometry />
            <meshPhongMaterial />
        </mesh>
        <DREI.Text position={[0, 2.5, 0]}>
            {name}
        </DREI.Text>
    </group>;
}