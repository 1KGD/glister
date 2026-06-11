import * as React from 'react';
import * as THREE from 'three';
import * as DREI from '@react-three/drei';
import PositionState from '../common/positionState';
import roomProvider from './roomProvider';

export default function Player({ name, position, isLocal }: { name: string, position: PositionState, isLocal?: boolean }): React.JSX.Element {
    const [cameraRef, setCameraRef] = React.useState<THREE.PerspectiveCamera>(null);
    return <group position={[position.x, position.y, position.z]}>
        {isLocal && <>
            <DREI.PerspectiveCamera ref={setCameraRef} makeDefault />
            {cameraRef && <DREI.CameraControls camera={cameraRef} />}
        </>}
        <mesh scale={0.4}>
            <torusKnotGeometry />
            <meshPhysicalMaterial metalness={0.8} roughness={0.2} />
        </mesh>
        <DREI.Text position={[0, 0.6, 0]}>
            {name}
        </DREI.Text>
    </group>;
}