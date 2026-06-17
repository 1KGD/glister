import React from 'react';
import * as THREE from 'three';
import * as Fiber from '@react-three/fiber';
import { useEditorComponentContext } from '../editor/editorShip';

export default function Reactor(): React.JSX.Element {
    const context = useEditorComponentContext();

    const reactorRef = React.useRef<THREE.Object3D>(null);

    Fiber.useFrame((_state: Fiber.RootState, delta: number) => {
        if (reactorRef.current) reactorRef.current.rotation.y += 0.1 * delta;
    });

    return <line>
        <boxGeometry />
        <meshPhysicalMaterial />
        <pointLight color="green" />
        <mesh ref={reactorRef} scale={0.22}>
            <torusKnotGeometry />
            <meshPhysicalMaterial />
        </mesh>
    </line>;
}