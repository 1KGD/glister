import React from 'react';
import * as Router from 'react-router';
import * as Post from '@react-three/postprocessing';
import roomProvider from './roomProvider';
import * as Tesseract from 'tesseract';
import Player from './objects/player';
import type PositionState from '../common/positionState';
import Sun from './objects/sun';
import Ship from './objects/ship';
import PlayerHUD from './playerHud';
import Planet from './objects/planet';
import { CelestialPlanetState } from '../common/celestialSystemState';

export default function CelestialSystem({ navigate }: { navigate: Router.NavigateFunction }): React.JSX.Element {
    const { isConnecting } = roomProvider.celestialSystem.useRoom();
    const state = roomProvider.celestialSystem.useRoomState();
    Tesseract.useModal({ title: "Connecting..." }, isConnecting);
    Tesseract.useModal({ title: "Loading..." }, !state);

    if (isConnecting || !state) return;

    return <>
        <Post.EffectComposer>
            <Post.Bloom />
        </Post.EffectComposer>
        <PlayerHUD />
        <Sun type={state.starType} size={state.starSize} />
        {state.planets && Object.values(state.planets).map((planet, i) => <Planet key={i} state={planet as CelestialPlanetState} />)}
        {state.ships && Object.values(state.ships).map((ship, i) => <Ship key={i} navigate={navigate} position={ship.position as PositionState} />)}
    </>;
}