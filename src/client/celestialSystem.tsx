import React from 'react';
import * as DREI from '@react-three/drei';
import roomProvider from './roomProvider';
import * as Tesseract from 'tesseract';
import Player from './player';
import PositionState from '../common/positionState';

export default function CelestialSystem(): React.JSX.Element {
    const { isConnecting, room } = roomProvider.game.useRoom();
    const state = roomProvider.game.useRoomState();
    if (isConnecting || !room) return <Tesseract.Modal title="Loading...">Loading system...</Tesseract.Modal>;
    if (!state.players) return <Tesseract.Modal title="Loading...">Loading players...</Tesseract.Modal>;

    return <>
        <DREI.Stars />
        {Object.values(state.players).map(player => <Player key={player.name} name={player.name} position={player.position as PositionState} />)}
    </>;
}