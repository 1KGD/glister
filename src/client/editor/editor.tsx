import React from 'react';
import * as Router from 'react-router';
import * as THREE from 'three';
import * as DREI from '@react-three/drei';
import * as Arwes from '@arwes/react';
import EditorShip from './editorShip';
import './editor.css';
import * as Tesseract from 'tesseract';
import EditorReactor from './components/reactor';

export interface IEditorCameraControls {
    active: boolean
}

export interface IEditorComponentData {
    children: React.JSX.Element,
    position: THREE.Vector3,
}

export const EditorCameraControlProvider = React.createContext<{
    editorCameraControls: IEditorCameraControls,
    setEditorCameraControls: (value: IEditorCameraControls) => void
}>(null);

function MainPage({ navigate }: { navigate: Router.NavigateFunction }): React.JSX.Element {
    return <Tesseract.Page xray position={new THREE.Vector3(0, 5, -5)}>
        <Arwes.Text as="div">Editor</Arwes.Text>
        <Tesseract.Link navigate={navigate} to="/" viewTransition refresh>Back</Tesseract.Link>
    </Tesseract.Page>;
}

const SchematicContext = React.createContext<boolean>(null);

export function useIsSchematic(): boolean {
    return React.useContext(SchematicContext);
}

function Schematic({ children }: React.PropsWithChildren): React.JSX.Element {
    return <>
        <DREI.Hud>
            <DREI.PerspectiveCamera makeDefault />
            <mesh position={[0.75, 0.5, -2]}>
                <planeGeometry />
                <meshBasicMaterial>
                    <DREI.RenderTexture attach="map" frames={1}>
                        <ambientLight intensity={5} />
                        <DREI.PerspectiveCamera makeDefault position={[0, 0, 5]} />
                        <SchematicContext value={true}>
                            {children}
                        </SchematicContext>
                    </DREI.RenderTexture>
                </meshBasicMaterial>
            </mesh>
        </DREI.Hud>
        <SchematicContext value={false}>
            {children}
        </SchematicContext>
    </>;
}

export default function Editor(): React.JSX.Element {
    const [editorCameraControls, setEditorCameraControls] = React.useState<IEditorCameraControls>({ active: true });
    const { tesseractContext, setTesseractContext } = Tesseract.useTessractContext();
    const navigate = Router.useNavigate();

    const [components, setComponents] = React.useState<IEditorComponentData[]>([
        { children: <EditorReactor />, position: new THREE.Vector3 },
    ]);

    React.useEffect(() => {
        setTesseractContext({ ...tesseractContext, backgroundColor: "blue" });
        return (): void => setTesseractContext({ ...tesseractContext, backgroundColor: "black" });
    }, []);

    return <EditorCameraControlProvider value={{ editorCameraControls, setEditorCameraControls }}>
        <DREI.OrbitControls makeDefault enabled={editorCameraControls.active} />
        <directionalLight />
        <MainPage navigate={navigate} />
        <Schematic>
            <EditorShip components={components} setComponents={setComponents} />
        </Schematic>
        <DREI.Grid infiniteGrid side={THREE.DoubleSide} sectionColor="white" cellColor="lightgrey" />
    </EditorCameraControlProvider>;
}