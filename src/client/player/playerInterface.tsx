import React from 'react';
import * as THREE from 'three';
import { PlayerState } from '../../common/gameState';
import ChatComponent from '../chat/chatComponent';
import PlayerSheet from './playerSheet';
import roomProvider from '../roomProvider';
import GameMap from '../map/gameMap';
import * as Tesseract from 'tesseract';
import './playerInteface.css';

export default function PlayerInterface(): React.JSX.Element {
    const { room } = roomProvider.useRoom();
    const state = roomProvider.useRoomState();
    if (!state.players) return <>Loading...</>;
    const player = state.players[room.sessionId] as PlayerState;
    const gameMaster = state.gameMaster;
    return <>
        {!gameMaster && <Tesseract.Modal title="Waiting...">Waiting for game master...</Tesseract.Modal>}
        {player ? <Tesseract.Page focused position={new THREE.Vector3(0, 0, -8)}>
            <GameMap />
            <PlayerSheet player={player} />
            <ChatComponent />
        </Tesseract.Page> : <Tesseract.Modal title="loading...">Loading Player Sheet</Tesseract.Modal>}</>;
}