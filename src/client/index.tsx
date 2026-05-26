import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Colyseus from '@colyseus/sdk';
import roomProvider from './roomProvider';
import config from '../../config';
import GameMasterInterface from './gameMaster/gameMasterInterface';
if (config.dev) await import("@colyseus/sdk/debug");
import './colors.css';
import './index.css';
import PlayerInterface from './player/playerInterface';
import Modal from './modal';
import * as Router from 'react-router';
import Homepage from './homepage';
import type server from '../server/index';

const client = new Colyseus.Client<typeof server>("/api");

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
            <input type="text" name="username" autoComplete="username" />
            <input type="password" name="password" autoComplete="current-password" />
            <input type="submit" />
        </form>
    </Modal>;
}

function SessionPage(): React.JSX.Element {
    const { roomId } = Router.useParams();
    const [isGameMaster, setIsGameMaster] = React.useState(false);
    return <roomProvider.RoomProvider connect={() => {
        return client.joinById(roomId, { isGameMaster });
    }} deps={[roomId, isGameMaster]}>
        <button onClick={() => setIsGameMaster(true)}>make me game master</button>
        <Interface roomId={roomId} />
    </roomProvider.RoomProvider>;
}

function CreateSessionPage(): React.JSX.Element {
    const goto = Router.useNavigate();
    return <Modal title="Create session">
        <button onClick={() => {
            client.create("game", {}).then(async (room) => {
                await goto(`/session/${room.roomId}`);
                await room.leave(); // This is so cursed
            }).catch(e => { throw e; });
        }}>Create</button>
    </Modal>;
}

function CreateAccountPage(): React.JSX.Element {
    return <Modal title="Create account">
        <form method="post" action="/api/createAccount">
            <input type="text" name="username" />
            <input type="password" name="password" />
            <input type="submit" />
        </form>
    </Modal>;
}

function SessionList(): React.JSX.Element {
    const { isConnecting, error, rooms } = roomProvider.useLobby();
    if (isConnecting) return <>connecting...</>;
    if (error) return <>error {error.message}</>;
    return <>
        {rooms.map(room => <div key={room.roomId}>
            <Router.Link to={`/session/${room.roomId}`}>{room.metadata?.name}</Router.Link>
        </div>)}
    </>;
}

function FindSessionPage(): React.JSX.Element {
    const [refreshCounter, setRefreshCounter] = React.useState(0);
    return <roomProvider.LobbyProvider connect={() => client.joinOrCreate("lobby")} deps={[refreshCounter]}>
        <Modal title="Session list">
            <SessionList />
            <button onClick={() => setRefreshCounter(refreshCounter + 1)}>refresh</button>
        </Modal>
    </roomProvider.LobbyProvider>;
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
                <Router.Route path="create" element={<CreateSessionPage />} />
                <Router.Route path="find" element={<FindSessionPage />} />
                <Router.Route path=":roomId" element={<SessionPage />} />
            </Router.Route>
            <Router.Route path="createAccount" element={<CreateAccountPage />} />
        </Router.Routes>
    </Router.BrowserRouter>;
}

createRoot(document.getElementById("root")).render(<App />);