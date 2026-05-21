import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Colyseus from '@colyseus/sdk';
import roomProvider from './roomProvider';
import config from '../../config';
import GameState from '../common/gameState';
import GameMasterInterface from './gameMaster/gameMasterInterface';
if (config.dev) await import("@colyseus/sdk/debug");
import './colors.css';
import './index.css';
import PlayerInterface from './player/playerInterface';
import Modal from './modal';
import { getCookie } from 'typescript-cookie';

const client = new Colyseus.Client("/api");

function Interface(): React.JSX.Element {
    const { room, error, isConnecting } = roomProvider.useRoom();
    const state = roomProvider.useRoomState();
    if (error) return <Modal blocking title={"Error: " + error.name}>{error.message}</Modal>;
    if (isConnecting) return <Modal blocking title="Connecting">Joining Game...</Modal>;
    if (!state) return <Modal blocking title="Connecting">Fetching State...</Modal>;

    if (state.gameMaster?.id === room.sessionId) return <GameMasterInterface />;
    return <PlayerInterface />;
}

function App(): React.JSX.Element {
    const [isGameMaster, setIsGameMaster] = React.useState(false);
    const [roomName, setRoomName] = React.useState("game");

    return <roomProvider.RoomProvider connect={() => {
        return client.joinOrCreate(roomName, { isGameMaster }, GameState);
    }} deps={[roomName, isGameMaster]}>
        <button onClick={() => setIsGameMaster(true)}>make me game master</button>
        <Interface />
        <form method="post" action="/api/login">
            <input type="text" name="username" />
            <input type="password" name="password" />
            <input type="submit" />
        </form>
    </roomProvider.RoomProvider >;
}

createRoot(document.getElementById("root")).render(<App />);