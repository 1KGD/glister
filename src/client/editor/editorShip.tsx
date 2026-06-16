import React from 'react';
import * as THREE from 'three';
import * as DREI from '@react-three/drei';
import EditorReactor from './components/reactor';

interface IEditorComponentData {
    children: React.JSX.Element,
    position: THREE.Vector3,
}

const ShipComponentsProvider = React.createContext<{ components: IEditorComponentData[], setComponents: (value: IEditorComponentData[]) => void }>(null);

export function useShipComponents(): IEditorComponentData[] {
    return React.useContext(ShipComponentsProvider).components;
}

interface IEditorComponentContext {
    hovered: boolean
}

const EditorComponentContext = React.createContext<IEditorComponentContext>(null);

export function useEditorComponentContext(): IEditorComponentContext {
    return React.useContext(EditorComponentContext);
}

function EditorComponent({ componentId, position, children }: { componentId: number, position: THREE.Vector3 } & React.PropsWithChildren): React.JSX.Element {
    const [context, setContext] = React.useState<IEditorComponentContext>({ hovered: false });

    const groupRef = React.useRef<THREE.Group>(null);

    return <EditorComponentContext value={context}>
        {groupRef.current && <DREI.TransformControls
            mode="translate"
            object={groupRef}
        />}
        <group
            ref={groupRef}
            position={position}
            onPointerOver={() => setContext({ ...context, hovered: true })}
            onPointerLeave={() => setContext({ ...context, hovered: false })}
        >
            {children}
        </group>
    </EditorComponentContext >;
}

export default function EditorShip(): React.JSX.Element {
    const [components, setComponents] = React.useState<IEditorComponentData[]>([
        { children: <EditorReactor />, position: new THREE.Vector3 },
    ]);
    return <ShipComponentsProvider value={{ components, setComponents }}>
        {components.map((component, i) => <EditorComponent key={i} componentId={i} position={component.position}>{component.children}</EditorComponent>)}
    </ShipComponentsProvider>;
}