import React from 'react';
import * as THREE from 'three';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';

export default function Teapot(): React.JSX.Element {
    const geo = React.useMemo(() => new TeapotGeometry(0.3), []);

    return <mesh geometry={geo}>
        <meshPhysicalMaterial metalness={0.6} roughness={0.1}/>
    </mesh>;
}