import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Colyseus from '@colyseus/sdk';
import { useRoom } from '@colyseus/react';
import config from '../../config';
if (config.dev) await import("@colyseus/sdk/debug");

const client = new Colyseus.Client("/api");


function App(): React.JSX.Element {
    const { room, error, isConnecting } = useRoom(
        () => client.joinOrCreate("game"),
    );
    return <>Hello, World!</>;
}

createRoot(document.getElementById("root")).render(<App />);