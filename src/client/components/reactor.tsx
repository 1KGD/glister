import React from 'react';
import * as THREE from 'three';
import * as Fiber from '@react-three/fiber';
import { useEditorComponentContext } from '../editor/editorShip';

export default function Reactor(): React.JSX.Element {
    const { hovered } = useEditorComponentContext();

    const reactorRef = React.useRef<THREE.Object3D>(null);

    Fiber.useFrame((_state: Fiber.RootState, delta: number) => {
        if (reactorRef.current) reactorRef.current.rotation.y += 0.4 * (hovered ? 8 : 1) * delta;
    });

    return <line>
        <boxGeometry />
        <meshPhysicalMaterial />
        <pointLight color="green" castShadow />
        <mesh ref={reactorRef} castShadow receiveShadow>
            <torusKnotGeometry args={[0.2, 0.05]} />
            <meshPhysicalMaterial />
        </mesh>
    </line>;
}