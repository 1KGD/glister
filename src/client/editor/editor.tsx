import React from 'react';
import * as THREE from 'three';
import * as Tesseract from 'tesseract';
import * as Arwes from '@arwes/react';
import debug from '../index.tsx?raw';

export default function Editor(): React.JSX.Element {
    return <Tesseract.Page position={new THREE.Vector3(1, 1, -15)} focused>
        <Arwes.Animator>
            <Arwes.Text easing="outSine" as="pre">{debug}</Arwes.Text>
        </Arwes.Animator>
    </Tesseract.Page >;
}