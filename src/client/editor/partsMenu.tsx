import React from 'react';
import * as THREE from 'three';
import * as Arwes from '@arwes/react';
import * as Tesseract from 'tesseract';
import { IEditorComponentData } from './editor';
import partsDefinitions, { ComponentGroup, IComponentDefinition } from './partsDefinitions';

function Part({ component }: { component: IComponentDefinition }): React.JSX.Element {
    return <div className="part">
        <Arwes.Text>{component.name}</Arwes.Text>
        <Arwes.FrameUnderline />
    </div>;
}

function PartsGroup({ name, components }: { name: string, components: IComponentDefinition[] }): React.JSX.Element {
    return <div className="parts-group">
        <Arwes.Text as="h2">{name}</Arwes.Text>
        {components.map(component => <Part key={component.name} component={component} />)}
        <Arwes.FrameHeader />
    </div>;
}

export default function PartsMenu({ components }: { components: IEditorComponentData[] }): React.JSX.Element {
    return <Tesseract.Page xray position={new THREE.Vector3(0, 2, -5)}>
        <Arwes.Text as="h1">Parts</Arwes.Text>
        {
            Object.keys(partsDefinitions)
                .map(key => ({ group: key as keyof typeof ComponentGroup, components: partsDefinitions[key as keyof typeof ComponentGroup] }))
                .map(({ group, components }) => <PartsGroup name={ComponentGroup[group]} components={components} />)
        }
    </Tesseract.Page>;
}