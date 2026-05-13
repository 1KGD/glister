import React from 'react';
import * as Colyseus from '@colyseus/sdk';
import GameState from '../../common/gameState';
import './gameMasterInterface.css';
import roomProvider from '../roomProvider';

export default function GameMasterInterface(): React.JSX.Element {
    const state = roomProvider.useRoomState();
    return <>{JSON.stringify(state)}</>;
}