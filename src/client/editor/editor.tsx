import React from 'react';
import * as DREI from '@react-three/drei';
import EditorShip from './editorShip';

export interface IEditorCameraControls {
    active: boolean
}

export const EditorCameraControlProvider = React.createContext<{
    editorCameraControls: IEditorCameraControls,
    setEditorCameraControls: (value: IEditorCameraControls) => void
}>(null);

export default function Editor(): React.JSX.Element {
    const [editorCameraControls, setEditorCameraControls] = React.useState<IEditorCameraControls>({ active: true });
    return <EditorCameraControlProvider value={{ editorCameraControls, setEditorCameraControls }}>
        <DREI.OrbitControls makeDefault enabled={editorCameraControls.active} />
        <EditorShip />
        <DREI.Grid followCamera infiniteGrid/>
    </EditorCameraControlProvider>;
}