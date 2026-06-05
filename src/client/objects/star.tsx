import React from 'react';
import * as THREE from 'three';
import { StarType } from '../../common/celestialSystemState';
import * as Tesseract from 'tesseract';
import * as Post from '@react-three/postprocessing';

export default function Star({ type, ref }: { type: StarType, ref?: React.Ref<THREE.Mesh> }): React.JSX.Element {
    switch (Number(type)) {
        case StarType.NORMAL:
            return <mesh ref={ref}>
                <sphereGeometry />
                <meshPhysicalMaterial transparent />

                <pointLight intensity={100} />
            </mesh>;
        case StarType.DWARF:
            return <mesh ref={ref}>
                <sphereGeometry />
                <meshPhysicalMaterial transparent />

                <pointLight intensity={10} />
            </mesh>;
    }
    return <Tesseract.Page position={new THREE.Vector3}>Something went disastrously wrong with the star</Tesseract.Page>;
}