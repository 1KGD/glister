import React from 'react';
import * as Fiber from '@react-three/fiber';
import * as Router from 'react-router';
import * as THREE from 'three';
import * as DREI from '@react-three/drei';
import * as Arwes from '@arwes/react';
import * as ArwesEffects from '@arwes/react-effects';
import EditorShip from './editorShip';
import './editor.css';
import * as Tesseract from 'tesseract';
import EditorReactor from '../components/reactor';
import PartsMenu from './partsMenu';
import Link from '../widgets/link';
import Button from '../widgets/button';

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
        <Link navigate={navigate} to="/" viewTransition>Back</Link>
    </Tesseract.Page>;
}

const SchematicContext = React.createContext<boolean>(null);

export function useIsSchematic(): boolean {
    return React.useContext(SchematicContext);
}

function Schematic({ visible, children }: { visible?: boolean } & React.PropsWithChildren): React.JSX.Element {
    const components = useShipComponents();

    return <>
        <Tesseract.Overlay>
            <div className="schematic" style={{ pointerEvents: visible ? "all" : "none" }}>
                <Arwes.Animator active={visible}>
                    <Arwes.FrameKranox animated />
                    {visible && <>
                        <ArwesEffects.Illuminator color="hsl(20 50% 50% / 20%)" style={{ clipPath: Arwes.styleFrameClipKranox() }} />
                        <Arwes.Text as="h1" manager="decipher">Schematic</Arwes.Text>
                        <Fiber.Canvas linear flat className="schematic-view" style={{ clipPath: Arwes.styleFrameClipKranox() }}>
                            <ShipComponentsProvider value={components}>
                                <DREI.PerspectiveCamera makeDefault position={[0, 0, 5]} />
                                <ambientLight intensity={5} color="white" />
                                <SchematicContext value={true}>
                                    {children}
                                </SchematicContext>
                            </ShipComponentsProvider>
                        </Fiber.Canvas>
                    </>}
                </Arwes.Animator>
            </div>
        </Tesseract.Overlay>
        <SchematicContext value={false}>
            {children}
        </SchematicContext>
    </>;
}

export default function Editor(): React.JSX.Element {
    const [editorCameraControls, setEditorCameraControls] = React.useState<IEditorCameraControls>({ active: true });
    const navigate = Router.useNavigate();

    const [components, setComponents] = React.useState<IEditorComponentData[]>([
        { children: <EditorReactor />, position: new THREE.Vector3 },
    ]);

    const [schematicVisible, setSchematicVisible] = React.useState<boolean>(false);

    return <EditorCameraControlProvider value={{ editorCameraControls, setEditorCameraControls }}>
        <ShipComponentsProvider value={{ components, setComponents }}>
            <DREI.Stars />
            <DREI.OrbitControls makeDefault enabled={editorCameraControls.active} maxDistance={100} />
            <directionalLight />
            <MainPage navigate={navigate} />
            <PartsMenu />
            <Schematic visible={schematicVisible}>
                <EditorShip />
            </Schematic>
            <Tesseract.Overlay>
                <div className="editor-header">
                    <Arwes.FrameUnderline animated />
                    <Arwes.Text as="h2">Editor</Arwes.Text>
                    <Button onClick={() => setSchematicVisible(!schematicVisible)}>
                        Toggle Schematic
                    </Button>
                </div>
            </Tesseract.Overlay>
            <DREI.Grid infiniteGrid side={THREE.DoubleSide} sectionColor="white" cellColor="lightgrey" />
        </ShipComponentsProvider>
    </EditorCameraControlProvider>;
}