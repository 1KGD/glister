import React from 'react';
import planetFragShader from '../assets/shaders/planet.frag.glsl?raw';
import planetVertShader from '../assets/shaders/planet.vert.glsl?raw';
import { CelestialPlanetState } from '../../common/celestialSystemState';
import roomProvider from '../roomProvider';

export default function Planet({ state }: { state: CelestialPlanetState }): React.JSX.Element {
    const { time } = roomProvider.celestialSystem.useRoomState();
    return <mesh position={[
        Math.sin(time * 2 * Math.PI / state.orbitTime) * state.orbitDistance,
        0.,
        Math.cos(time * 2 * Math.PI / state.orbitTime) * state.orbitDistance
    ]} scale={state.size}>
        <sphereGeometry />
        <meshPhongMaterial />
        {/*<shaderMaterial transparent fragmentShader={planetFragShader} vertexShader={planetVertShader} />*/}
    </mesh>;
}