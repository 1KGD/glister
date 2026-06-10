import React from 'react';
import planetFragShader from '../assets/shaders/planet.frag.glsl?raw';
import planetVertShader from '../assets/shaders/planet.vert.glsl?raw';

export default function Planet({ children }: React.PropsWithChildren): React.JSX.Element {
    return <mesh>
        <sphereGeometry />
        <shaderMaterial transparent fragmentShader={planetFragShader} vertexShader={planetVertShader} />
    </mesh>;
}