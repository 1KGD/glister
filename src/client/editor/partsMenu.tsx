import React from 'react';
import * as DREI from '@react-three/drei';
import * as Fiber from '@react-three/fiber';
import * as THREE from 'three';
import * as Arwes from '@arwes/react';
import * as Tesseract from 'tesseract';
import { ShipComponentsProvider, useShipComponents } from './editor';
import partsDefinitions, { ComponentGroup, IComponentDefinition } from '../components/partsDefinitions';

function PartPreview({ children }: React.PropsWithChildren): React.JSX.Element {
    const groupRef = React.useRef<THREE.Group>(null);

    Fiber.useFrame((_state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.4;
        }
    });

    return <group ref={groupRef}>{children}</group>;
}

function Part({ component, active }: { component: IComponentDefinition, active: boolean }): React.JSX.Element {
    const { components, setComponents } = useShipComponents();

    return <div className="part" onClick={() => setComponents(components.concat([{ children: React.createElement(component.render), position: new THREE.Vector3 }]))}>
        <Arwes.FrameUnderline animated className="part-frame" />
        <Arwes.Text manager="decipher">{component.name}</Arwes.Text>
        {active && <DREI.View style={{ width: "100%", height: "100px" }}>
            <directionalLight />
            <ambientLight />
            <DREI.PerspectiveCamera makeDefault position={[0, 0, 2]} />
            <PartPreview>
                {React.createElement(component.render)}
            </PartPreview>
        </DREI.View>}
    </div>;
}

function PartsGroup({ name, components }: { name: string, components: readonly IComponentDefinition[] }): React.JSX.Element {
    const [collapsed, setCollapsed] = React.useState<boolean>(true);

    return <div className="parts-group" style={{ maxHeight: collapsed ? "50px" : "none" }}>
        <Arwes.FrameHeader animated className="parts-group-frame" />
        <Arwes.Text className="parts-group-header" as="h2" onClick={() => setCollapsed(!collapsed)}>{name}</Arwes.Text>
        <Arwes.Animator active={!collapsed}>
            {components.map(component => <Part key={component.name} component={component} active={!collapsed} />)}
        </Arwes.Animator>
    </div>;
}

export default function PartsMenu(): React.JSX.Element {
    const components = useShipComponents();
    return <Tesseract.Overlay>
        <ShipComponentsProvider value={components}>
            <div className="parts-menu">
                <Arwes.FrameLines animated className="parts-menu-frame" />
                <Arwes.Text as="h1">Parts</Arwes.Text>
                {
                    Object.keys(partsDefinitions)
                        .map(key => ({ group: key as keyof typeof ComponentGroup, components: partsDefinitions[key as keyof typeof ComponentGroup] }))
                        .map(({ group, components }) => <PartsGroup key={group} name={ComponentGroup[group]} components={components} />)
                }
            </div>
        </ShipComponentsProvider>
    </Tesseract.Overlay>;
}