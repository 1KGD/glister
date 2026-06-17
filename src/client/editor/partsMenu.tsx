import React from 'react';
import * as DREI from '@react-three/drei';
import * as THREE from 'three';
import * as Arwes from '@arwes/react';
import * as Tesseract from 'tesseract';
import { IEditorComponentData } from './editor';
import partsDefinitions, { ComponentGroup, IComponentDefinition } from './partsDefinitions';

function Part({ component }: { component: IComponentDefinition }): React.JSX.Element {
    const Preview = component.render;

    return <div className="part">
        <Arwes.FrameUnderline animated />
        <Arwes.Text>{component.name}</Arwes.Text>
        <DREI.View style={{ width: "100%", height: "100px" }}>
            <directionalLight />
            <DREI.PerspectiveCamera makeDefault position={[0, 0, 2]} />
            <Preview />
        </DREI.View>
    </div>;
}

function PartsGroup({ name, components }: { name: string, components: readonly IComponentDefinition[] }): React.JSX.Element {
    const [collapsed, setCollapsed] = React.useState<boolean>(true);

    return <div className="parts-group">
        <Arwes.FrameHeader animated />
        <Arwes.Text className="parts-group-header" as="h2" onClick={() => setCollapsed(!collapsed)}>{name}</Arwes.Text>
        <Arwes.Animator active={!collapsed}>
            <Arwes.Text>{JSON.stringify(collapsed)}</Arwes.Text>
            {components.map(component => <Part key={component.name} component={component} />)}
        </Arwes.Animator>
    </div>;
}

export default function PartsMenu({ components }: { components: IEditorComponentData[] }): React.JSX.Element {
    return <Tesseract.Page xray position={new THREE.Vector3(0, 2, -5)}>
        <Arwes.Text as="h1">Parts</Arwes.Text>
        {
            Object.keys(partsDefinitions)
                .map(key => ({ group: key as keyof typeof ComponentGroup, components: partsDefinitions[key as keyof typeof ComponentGroup] }))
                .map(({ group, components }) => <PartsGroup key={group} name={ComponentGroup[group]} components={components} />)
        }
    </Tesseract.Page>;
}