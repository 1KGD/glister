import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Colyseus from '@colyseus/sdk';
import * as ColyseusReact from '@colyseus/react';
import roomProvider from './roomProvider';
import config from '../../config';
import GameState from '../common/gameState';
if (config.dev) await import("@colyseus/sdk/debug");

const client = new Colyseus.Client("/api");

function RoomStatus(): React.JSX.Element {
    const { room, error, isConnecting } = roomProvider.useRoom();
    const state = roomProvider.useRoomState();
    if (error) return <pre>ERROR {error.name}: {error.message} [{JSON.stringify(error.cause)}]</pre>;
    if (isConnecting || !state) return <>Connecting...</>;
    return <>{state.g}</>;
}

function App(): React.JSX.Element {
    return <roomProvider.RoomProvider connect={() => client.joinOrCreate("game", {}, GameState)}>
        <RoomStatus />
    </roomProvider.RoomProvider>;
}

createRoot(document.getElementById("root")).render(<App />);