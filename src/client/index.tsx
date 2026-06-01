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
import * as Router from 'react-router';
import Homepage from './homepage';
import type server from '../server/index';
import { useAdventure } from './dataProvider';
import * as Tesseract from 'tesseract';

const client = new Colyseus.Client<typeof server>("/api");

function Interface({ roomId }: { roomId: string }): React.JSX.Element {
    const { room, error, isConnecting } = roomProvider.useRoom();
    const state = roomProvider.useRoomState();
    if (error) return <Tesseract.Modal blocking title={"Error: " + error.name}>{error.message}</Tesseract.Modal>;
    if (isConnecting) return <Tesseract.Modal blocking title="Connecting">Joining {roomId}...</Tesseract.Modal>;
    if (!state) return <Tesseract.Modal blocking title="Connecting">Fetching State...</Tesseract.Modal>;

    if (state.gameMaster?.id === room.sessionId) return <GameMasterInterface />;
    return <PlayerInterface />;
}

function LoginPage(): React.JSX.Element {
    return <Tesseract.Modal title="Login">
        <form method="post" action="/api/login">
            <input type="text" name="username" autoComplete="username" />
            <input type="password" name="password" autoComplete="current-password" />
            <input type="submit" />
        </form>
    </Tesseract.Modal>;
}

function SessionPage(): React.JSX.Element {
    const { roomId } = Router.useParams();
    const [isGameMaster, setIsGameMaster] = React.useState(false);
    return <roomProvider.RoomProvider connect={() => {
        return client.joinById(roomId, { isGameMaster });
    }} deps={[roomId, isGameMaster]}>
        <Interface roomId={roomId} />
    </roomProvider.RoomProvider>;
}

function CreateSessionPage(): React.JSX.Element {
    const navigate = Router.useNavigate();
    return <Tesseract.Modal title="Create session">
        <button onClick={() => {
            client.create("game", {}).then(async (room) => {
                await navigate(`/session/${room.roomId}`);
                await room.leave(); // This is so cursed
            }).catch(e => { throw e; });
        }}>Create</button>
    </Tesseract.Modal>;
}

function CreateAccountPage(): React.JSX.Element {
    return <Tesseract.Modal title="Create account">
        <form method="post" action="/api/createAccount">
            <input type="text" name="username" />
            <input type="password" name="password" />
            <input type="submit" />
        </form>
    </Tesseract.Modal>;
}

function SessionList({ navigate }: { navigate: Router.NavigateFunction }): React.JSX.Element {
    const { isConnecting, error, rooms } = roomProvider.useLobby();
    if (isConnecting) return <>Loading...</>;
    if (error) return <>error {error.message}</>;
    return <>
        {rooms.map(room => <div key={room.roomId}>
            <Tesseract.Link navigate={navigate} to={`/session/${room.roomId}`}>{room.metadata?.name}</Tesseract.Link>
        </div>)}
    </>;
}

function FindSessionPage(): React.JSX.Element {
    const navigate = Router.useNavigate();
    const [refreshCounter, setRefreshCounter] = React.useState(0);
    return <roomProvider.LobbyProvider connect={() => client.joinOrCreate("lobby")} deps={[refreshCounter]}>
        <Tesseract.Modal title="Session list">
            <SessionList navigate={navigate} /><br />
            <button onClick={() => setRefreshCounter(refreshCounter + 1)}>refresh</button>
        </Tesseract.Modal>
    </roomProvider.LobbyProvider>;
}

function CreateAdventurePage(): React.JSX.Element {
    return <Tesseract.Modal title="create adventure">
        <form method="post" action="/api/createAdventure">
            <input type="text" name="name" />
            <input type="submit" />
        </form>
    </Tesseract.Modal>;
}

function AdventurePage(): React.JSX.Element {
    const { adventureId } = Router.useParams();
    const { loading, adventure } = useAdventure(adventureId);

    if (loading) return <Tesseract.Modal title="Loading...">Loading adventure data</Tesseract.Modal>;
    return <div>{adventure.name}</div>;
}

function App(): React.JSX.Element {
    return <Tesseract.Wrapper>
        <Router.BrowserRouter>
            <Router.Routes>
                <Router.Route path="/" element={<Homepage />}>
                    <Router.Route path="login">
                        <Router.Route index element={<LoginPage />} />
                        <Router.Route path="error" element={<>Login Error</>} />
                    </Router.Route>
                    <Router.Route path="adventure">
                        <Router.Route path="create" element={<CreateAdventurePage />} />
                        <Router.Route path=":adventureId" element={<AdventurePage />} />
                    </Router.Route>
                    <Router.Route path="createAccount" element={<CreateAccountPage />} />
                    <Router.Route path="session">
                        <Router.Route path="create" element={<CreateSessionPage />} />
                        <Router.Route path="find" element={<FindSessionPage />} />
                        <Router.Route path=":roomId" element={<SessionPage />} />
                    </Router.Route>
                </Router.Route>
            </Router.Routes>
        </Router.BrowserRouter>
    </Tesseract.Wrapper>;
}

createRoot(document.getElementById("root")).render(<App />);