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
import * as Router from 'react-router';
import Homepage from './homepage';

const client = new Colyseus.Client("/api");

function Interface({ roomId }: { roomId: string }): React.JSX.Element {
    const { room, error, isConnecting } = roomProvider.useRoom();
    const state = roomProvider.useRoomState();
    if (error) return <Modal blocking title={"Error: " + error.name}>{error.message}</Modal>;
    if (isConnecting) return <Modal blocking title="Connecting">Joining {roomId}...</Modal>;
    if (!state) return <Modal blocking title="Connecting">Fetching State...</Modal>;

    if (state.gameMaster?.id === room.sessionId) return <GameMasterInterface />;
    return <PlayerInterface />;
}

function LoginPage(): React.JSX.Element {
    return <Modal title="Login">
        <form method="post" action="/api/login">
            <input type="text" name="username" />
            <input type="password" name="password" />
            <input type="submit" />
        </form>
    </Modal>;
}

function SessionPage(): React.JSX.Element {
    const { roomId } = Router.useParams();
    const [isGameMaster, setIsGameMaster] = React.useState(false);
    return <roomProvider.RoomProvider connect={() => {
        return client.joinById(roomId, { isGameMaster }, GameState);
    }} deps={[roomId, isGameMaster]}>
        <button onClick={() => setIsGameMaster(true)}>make me game master</button>
        <Interface roomId={roomId} />
    </roomProvider.RoomProvider>;
}

function Error(): React.JSX.Element {
    return <>foo</>;
}

function App(): React.JSX.Element {
    return <Router.BrowserRouter>
        <Router.Routes>
            <Router.Route index element={<Homepage />} />
            <Router.Route path="login">
                <Router.Route index element={<LoginPage />} />
                <Router.Route path="error" element={<>Login Error</>} />
            </Router.Route>
            <Router.Route path="session">
                <Router.Route path=":roomId" element={<SessionPage />} />
            </Router.Route>
        </Router.Routes>
    </Router.BrowserRouter>;
}

createRoot(document.getElementById("root")).render(<App />);