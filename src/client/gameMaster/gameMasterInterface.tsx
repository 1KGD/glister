import React from 'react';
import * as Colyseus from '@colyseus/sdk';
import GameState from '../../common/gameState';
import './gameMasterInterface.css';

export default function GameMasterInterface({ state, room }: { state: GameState, room: Colyseus.Room }): React.JSX.Element {
    return <>{JSON.stringify(state)}</>;
}