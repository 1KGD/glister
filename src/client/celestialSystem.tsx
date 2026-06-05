import React from 'react';
import * as THREE from 'three';
import * as DREI from '@react-three/drei';
import * as Post from '@react-three/postprocessing';
import roomProvider from './roomProvider';
import * as Tesseract from 'tesseract';
import Player from './player';
import type PositionState from '../common/positionState';
import Star from './objects/star';

export default function CelestialSystem(): React.JSX.Element {
    const starRef = React.useRef<THREE.Mesh>(null);

    const { isConnecting, room } = roomProvider.game.useRoom();
    const state = roomProvider.game.useRoomState();
    if (isConnecting || !room) return <Tesseract.Modal title="Loading...">Loading system...</Tesseract.Modal>;
    if (!state.ships) return <Tesseract.Modal title="Loading...">Loading players...</Tesseract.Modal>;

    return <>
        <Post.EffectComposer>
            <Post.Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
            <Post.Noise opacity={0.02} />
        </Post.EffectComposer >
        <DREI.Stars />
        <Star type={state.starType} ref={starRef} />
        {Object.values(state.ships).map((ship, i) => <Player key={i} name={i.toString()} position={ship.position as PositionState} />)}
    </>;
}