import React from 'react';
import * as DREI from '@react-three/drei';
import EditorShip from './editorShip';
import './editor.css';
import * as Tesseract from 'tesseract';

export interface IEditorCameraControls {
    active: boolean
}

export const EditorCameraControlProvider = React.createContext<{
    editorCameraControls: IEditorCameraControls,
    setEditorCameraControls: (value: IEditorCameraControls) => void
}>(null);

export default function Editor(): React.JSX.Element {
    const [editorCameraControls, setEditorCameraControls] = React.useState<IEditorCameraControls>({ active: true });
    const { tesseractContext, setTesseractContext } = Tesseract.useTessractContext();

    React.useEffect(() => {
        setTesseractContext({ ...tesseractContext, backgroundColor: "blue" });
        return (): void => setTesseractContext({ ...tesseractContext, backgroundColor: "black" });
    }, []);

    return <EditorCameraControlProvider value={{ editorCameraControls, setEditorCameraControls }}>
        <DREI.OrbitControls makeDefault enabled={editorCameraControls.active} />
        <EditorShip />
        <DREI.Grid infiniteGrid sectionColor="white" cellColor="lightgrey" />
    </EditorCameraControlProvider>;
}