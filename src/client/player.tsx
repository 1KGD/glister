import * as React from 'react';
import * as DREI from '@react-three/drei';
import PositionState from '../common/positionState';
import roomProvider from './roomProvider';

export default function Player({ name, position }: { name: string, position: PositionState }): React.JSX.Element {
    return <group scale={0.4} position={[position.x, position.y, position.z]}>
        <mesh>
            <torusKnotGeometry />
            <meshPhysicalMaterial metalness={0.8} roughness={0.2} />
        </mesh>
        <DREI.Text position={[0, 2.5, 0]}>
            {name}
        </DREI.Text>
    </group>;
}