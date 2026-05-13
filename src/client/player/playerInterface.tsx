import React from 'react';
import * as Colyseus from '@colyseus/sdk';
import GameState, { PlayerState } from '../../common/gameState';
import Modal from '../modal';
import ChatComponent from '../chat/chatComponent';
import PlayerSheet from './playerSheet';
import roomProvider from '../roomProvider';

export default function PlayerInterface(): React.JSX.Element {
    const { room } = roomProvider.useRoom();
    const state = roomProvider.useRoomState();
    return <>
        {!state.gameMaster && <Modal title="Waiting...">Waiting for game master...</Modal>}
        {state.players[room.sessionId] ? <PlayerSheet player={state.players[room.sessionId] as PlayerState} /> : <Modal title="loading...">Loading Player Sheet</Modal>}
        <ChatComponent />
    </>;
}