import React from 'react';
import * as THREE from 'three';
import { StarType } from '../../common/celestialSystemState';
import * as Tesseract from 'tesseract';

export default function Sun({ type, size }: { type: StarType, size: number }): React.JSX.Element {
    const ref = React.useRef<THREE.Mesh>(new THREE.Mesh);
    let sun = <Tesseract.Page position={new THREE.Vector3}>Something went disastrously wrong with the star</Tesseract.Page>;
    switch (Number(type)) {
        case StarType.NORMAL:
            sun = <mesh scale={size}>
                <sphereGeometry />
                <meshPhysicalMaterial transparent />

                <pointLight intensity={50000000} />
            </mesh>;
            break;
        case StarType.DWARF:
            sun = <mesh scale={size}>
                <sphereGeometry />
                <meshPhysicalMaterial emissive="white" />

                <pointLight intensity={50000000 /* That is one bright sun */} />
            </mesh>;
            break;
    }
    return <>
        {sun}
    </>;
}