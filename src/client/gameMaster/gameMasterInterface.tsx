import React from 'react';
import * as Colyseus from '@colyseus/sdk';
import GameState from '../../common/gameState';
import './gameMasterInterface.css';
import roomProvider from '../roomProvider';
import GameMap from '../map/gameMap';

export default function GameMasterInterface(): React.JSX.Element {
    const state = roomProvider.useRoomState();
    return <div className="interface game-master-interface">
        <GameMap isGameMaster />
        <div style={{ maxWidth: "20vw" }}>{JSON.stringify(state)}</div>
    </div>;
}