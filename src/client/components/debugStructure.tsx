import React from 'react';
import { useEditorComponentContext } from '../editor/editorShip';

export default function DebugStructure(): React.JSX.Element {
    const { hovered } = useEditorComponentContext();

    return <mesh castShadow receiveShadow>
        <boxGeometry />
        <meshPhysicalMaterial metalness={0.6} roughness={0.2} color={hovered ? "red" : "white"} />
    </mesh>;
}