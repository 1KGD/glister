import React from 'react';
import * as THREE from 'three';
import * as Fiber from '@react-three/fiber';
import { useEditorComponentContext } from '../editorShip';

export default function EditorReactor(): React.JSX.Element {
    const context = useEditorComponentContext();

    const reactorRef = React.useRef<THREE.Mesh>(null);

    Fiber.useFrame(() => {
        if (reactorRef.current) reactorRef.current.rotation.x += 0.1;
    });

    return <line>
        <boxGeometry />
        <meshMatcapMaterial />
        <mesh ref={reactorRef} scale={0.22}>
            <torusKnotGeometry />
        </mesh>
    </line>;
}