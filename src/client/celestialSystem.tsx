import React from 'react';
import * as THREE from 'three';
import * as DREI from '@react-three/drei';
import * as Post from '@react-three/postprocessing';
import roomProvider from './roomProvider';
import * as Tesseract from 'tesseract';
import Player from './player';
import type PositionState from '../common/positionState';
import Star from './objects/star';
import Ship from './objects/ship';
import PlayerHUD from './playerHud';
import Planet from './objects/planet';
import { CelestialPlanetState } from '../common/celestialSystemState';

export default function CelestialSystem(): React.JSX.Element {
    const { isConnecting, room } = roomProvider.celestialSystem.useRoom();
    const state = roomProvider.celestialSystem.useRoomState();
    if (isConnecting || !room) return <Tesseract.Modal title="Loading...">Loading system...</Tesseract.Modal>;
    if (!state.ships) return <Tesseract.Modal title="Loading...">Loading players...</Tesseract.Modal>;

    return <>
        <Post.EffectComposer>
            <Post.Bloom />
            <Post.ASCII />
        </Post.EffectComposer>
        <PlayerHUD />
        <DREI.Stars />
        <Star type={state.starType} size={state.starSize} />
        {Object.values(state.planets).map((planet, i) => <Planet key={i} state={planet as CelestialPlanetState} />)}
        {Object.values(state.ships).map((ship, i) => <Ship key={i} position={ship.position as PositionState} />)}
    </>;
}