import React from 'react';

export default function DebugStructure(): React.JSX.Element {
    return <mesh castShadow receiveShadow>
        <boxGeometry />
        <meshPhysicalMaterial metalness={0.6} roughness={0.2} />
    </mesh>;
}