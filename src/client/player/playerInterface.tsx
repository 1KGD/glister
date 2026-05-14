import React from 'react';
import { PlayerState } from '../../common/gameState';
import Modal from '../modal';
import ChatComponent from '../chat/chatComponent';
import PlayerSheet from './playerSheet';
import roomProvider from '../roomProvider';
import GameMap from '../map/gameMap';
import './playerInteface.css';

export default function PlayerInterface(): React.JSX.Element {
    const { room } = roomProvider.useRoom();
    const state = roomProvider.useRoomState();
    return <div className="interface player-interface">
        {!state.gameMaster && <Modal title="Waiting...">Waiting for game master...</Modal>}
        <GameMap />
        {state.players[room.sessionId] ? <PlayerSheet player={state.players[room.sessionId] as PlayerState} /> : <Modal title="loading...">Loading Player Sheet</Modal>}
        <ChatComponent />
    </div>;
}