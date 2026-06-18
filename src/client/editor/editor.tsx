import React from 'react';
import * as Router from 'react-router';
import * as THREE from 'three';
import * as DREI from '@react-three/drei';
import * as Arwes from '@arwes/react';
import EditorShip from './editorShip';
import './editor.css';
import * as Tesseract from 'tesseract';
import EditorReactor from '../components/reactor';
import PartsMenu from './partsMenu';

export interface IEditorCameraControls {
    active: boolean
}

export interface IEditorComponentData {
    children: React.JSX.Element,
    position: THREE.Vector3,
}

export const ShipComponentsProvider = React.createContext<{ components: IEditorComponentData[], setComponents: (value: IEditorComponentData[]) => void }>(null);

export function useShipComponents(): { components: IEditorComponentData[], setComponents: (value: IEditorComponentData[]) => void } {
    return React.useContext(ShipComponentsProvider);
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
    const components = useShipComponents();

    return <>
        {visible && <Tesseract.Overlay>
            <div className="schematic">
                <Arwes.Animator>
                    <Arwes.FrameKranox animated />
                    <DREI.View className="schematic-view">
                        <ShipComponentsProvider value={components}>
                            <DREI.PerspectiveCamera makeDefault position={[0, 0, 5]} />
                            <ambientLight intensity={5} color="green"/>
                            <SchematicContext value={true}>
                                {children}
                            </SchematicContext>
                        </ShipComponentsProvider>
                    </DREI.View>
                </Arwes.Animator>
            </div>
        </Tesseract.Overlay>}
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

    const [schematicVisible, setSchematicVisible] = React.useState<boolean>(true);

    React.useEffect(() => {
        setTesseractContext({ ...tesseractContext, backgroundColor: "blue" });
        return (): void => setTesseractContext({ ...tesseractContext, backgroundColor: "black" });
    }, []);

    return <EditorCameraControlProvider value={{ editorCameraControls, setEditorCameraControls }}>
        <ShipComponentsProvider value={{ components, setComponents }}>
            <DREI.OrbitControls makeDefault enabled={editorCameraControls.active} />
            <directionalLight />
            <MainPage navigate={navigate} />
            <PartsMenu />
            <Schematic visible={schematicVisible}>
                <EditorShip />
            </Schematic>
            <DREI.Grid infiniteGrid side={THREE.DoubleSide} sectionColor="white" cellColor="lightgrey" />
            <mesh onClick={() => setSchematicVisible(!schematicVisible)}>
                <sphereGeometry args={[0.1]} />
            </mesh>
        </ShipComponentsProvider>
    </EditorCameraControlProvider>;
}