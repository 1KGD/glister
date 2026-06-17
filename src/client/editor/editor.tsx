import React from 'react';
import * as Router from 'react-router';
import * as THREE from 'three';
import * as DREI from '@react-three/drei';
import * as Arwes from '@arwes/react';
import EditorShip from './editorShip';
import './editor.css';
import * as Tesseract from 'tesseract';
import EditorReactor from './components/reactor';
import { texture } from 'three/tsl';
import PartsMenu from './partsMenu';

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

function Schematic({ visible, children }: { visible?: boolean } & React.PropsWithChildren): React.JSX.Element {
    const textureRef = React.useRef<THREE.Texture>(null);

    return <>
        {visible && <DREI.Hud>
            <DREI.PerspectiveCamera makeDefault />
            <mesh position={[0, 0, -1.5]} >
                <planeGeometry />
                <meshBasicMaterial color="white" />
                <DREI.Decal>
                    <meshBasicMaterial color="blue" transparent>
                        <DREI.RenderTexture ref={textureRef} attach="map" frames={1}>
                            <ambientLight intensity={5} />
                            <DREI.PerspectiveCamera makeDefault position={[0, 0, 5]} />
                            <SchematicContext value={true}>
                                {children}
                            </SchematicContext>
                        </DREI.RenderTexture>
                    </meshBasicMaterial>
                </DREI.Decal>
            </mesh>
        </DREI.Hud>}
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

    const [schematicVisible, setSchematicVisible] = React.useState<boolean>(false);

    React.useEffect(() => {
        setTesseractContext({ ...tesseractContext, backgroundColor: "blue" });
        return (): void => setTesseractContext({ ...tesseractContext, backgroundColor: "black" });
    }, []);

    return <EditorCameraControlProvider value={{ editorCameraControls, setEditorCameraControls }}>
        <DREI.OrbitControls makeDefault enabled={editorCameraControls.active} />
        <directionalLight />
        <MainPage navigate={navigate} />
        <PartsMenu components={components}/>
        <Schematic visible={schematicVisible}>
            <EditorShip components={components} setComponents={setComponents} />
        </Schematic>
        <DREI.Grid infiniteGrid side={THREE.DoubleSide} sectionColor="white" cellColor="lightgrey" />
        <mesh onClick={() => setSchematicVisible(!schematicVisible)}>
            <sphereGeometry args={[0.1]} />
        </mesh>
    </EditorCameraControlProvider>;
}