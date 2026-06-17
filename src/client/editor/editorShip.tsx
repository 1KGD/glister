import React from 'react';
import * as Fiber from '@react-three/fiber';
import * as THREE from 'three';
import * as DREI from '@react-three/drei';
import { useIsSchematic, useShipComponents } from './editor';

interface IEditorComponentContext {
    hovered: boolean
}

const EditorComponentContext = React.createContext<IEditorComponentContext>(null);

export function useEditorComponentContext(): IEditorComponentContext {
    return React.useContext(EditorComponentContext);
}

function EditorComponent({ componentId, position, children }: { componentId: number, position: THREE.Vector3 } & React.PropsWithChildren): React.JSX.Element {
    const { components, setComponents } = useShipComponents();
    const [context, setContext] = React.useState<IEditorComponentContext>({ hovered: false });
    const isSchematic = useIsSchematic();

    const groupRef = React.useRef<THREE.Group>(null);

    return <EditorComponentContext value={context}>
        {isSchematic ?
            <group position={position}>{children}</group> :
            <>
                {groupRef.current && <DREI.TransformControls
                    mode="translate"
                    object={groupRef}
                    onObjectChange={() => {
                        if (groupRef.current) {
                            setComponents(components.map((component, i) => {
                                if (i === componentId) return { ...component, position: groupRef.current.position.clone() }; // Incredebly cursed but works
                                return component;
                            }));
                        }
                    }}
                />}
                <group
                    ref={groupRef}
                    position={position}
                    onPointerOver={() => setContext({ ...context, hovered: true })}
                    onPointerLeave={() => setContext({ ...context, hovered: false })}
                >
                    {children}
                </group>
            </>
        }
    </EditorComponentContext >;
}

export default function EditorShip(): React.JSX.Element {
    const { components } = useShipComponents();

    return <>
        {components.map((component, i) => <EditorComponent key={i} componentId={i} position={component.position}>{component.children}</EditorComponent>)}
    </>;
}