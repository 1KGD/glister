import React from 'react';
import * as DREI from '@react-three/drei';
import { useEditorComponentContext } from '../editorShip';

export default function EditorReactor(): React.JSX.Element {
    const context = useEditorComponentContext();
    return <mesh>
        <boxGeometry />
        <meshBasicMaterial />
        <DREI.Text position={[0, 1, 0]}>{JSON.stringify(context)}</DREI.Text>
    </mesh>;
}