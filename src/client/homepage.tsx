import React from 'react';
import * as Router from 'react-router';
import * as THREE from 'three';
import * as DREI from '@react-three/drei';
import { useAccount } from './dataProvider';
import './homepage.css';
import * as Tesseract from 'tesseract';
import * as Colyseus from '@colyseus/sdk';
import type server from '../server/index';
import roomProvider from './roomProvider';
import CelestialSystem from './celestialSystem';

const client = new Colyseus.Client<typeof server>("/api");

function StagingHandler({ seatReservation, setSeatReservation }: { seatReservation: Colyseus.SeatReservation, setSeatReservation: (value: Colyseus.SeatReservation) => void }): null {
    roomProvider.staging.useRoomMessage("switch", setSeatReservation);
    const { room } = roomProvider.staging.useRoom();
    React.useEffect(() => { if (seatReservation && room) void room.leave(); }, [seatReservation, room]);
    Tesseract.useModal({ title: "Loading...", body: "Staging..." }, !seatReservation);
    return null;
}

function ShipRoom({ children }: React.PropsWithChildren): React.JSX.Element {
    const { isConnecting } = roomProvider.celestialSystem.useRoom();
    const [shipRoomSeat, setShipRoomSeat] = React.useState<Colyseus.SeatReservation>(null);
    roomProvider.celestialSystem.useRoomMessage("joinShip", seatReservation => setShipRoomSeat(seatReservation));
    Tesseract.useModal({ title: "Loading...", body: "Boarding Ship" }, isConnecting);
    if (isConnecting) return null;
    return <roomProvider.ship.RoomProvider connect={() => client.consumeSeatReservation(shipRoomSeat)} deps={[shipRoomSeat]}>
        {children}
    </roomProvider.ship.RoomProvider>;
}

enum Controls {
    forward = 'forward',
    back = 'back',
    left = 'left',
    right = 'right',
    jump = 'jump',
}

function MainGame({ navigate }: { navigate: Router.NavigateFunction }): React.JSX.Element {
    const [seatReservation, setSeatReservation] = React.useState<Colyseus.SeatReservation>(null);

    const controls = React.useMemo<DREI.KeyboardControlsEntry<Controls>[]>(() => [
        { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
        { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
        { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
        { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
        { name: Controls.jump, keys: ['Space'] },
    ], []);

    return <roomProvider.staging.RoomProvider connect={() => client.joinOrCreate("staging")}>
        <StagingHandler seatReservation={seatReservation} setSeatReservation={setSeatReservation} />
        <roomProvider.celestialSystem.RoomProvider connect={() => client.consumeSeatReservation(seatReservation)} deps={[seatReservation]}>
            <ShipRoom>
                <DREI.KeyboardControls map={controls}>
                    {seatReservation && <CelestialSystem navigate={navigate} />}
                </DREI.KeyboardControls>
            </ShipRoom>
        </roomProvider.celestialSystem.RoomProvider>
    </roomProvider.staging.RoomProvider>;
}

export default function Homepage(): React.JSX.Element {
    const navigate = Router.useNavigate();
    const { loading, loggedIn, account } = useAccount();
    const outlet = Router.useOutlet({ loading, loggedIn, account });
    Tesseract.useModal({ title: "Loading...", body: "Logging in..." }, loading);
    if (loading) return <>{outlet}</>;
    return <>
        {loggedIn && !outlet && <MainGame navigate={navigate} />}
        <Tesseract.Page position={new THREE.Vector3(0, 0, 12)} focused={!outlet && !loggedIn}>
            <div>
                {loggedIn ? account.name : "not logged in"}
            </div>
            {
                loggedIn ?
                    null :
                    <>
                        <Tesseract.Link navigate={navigate} to="/login" disabled={!!outlet}>Login</Tesseract.Link><br />
                        <Tesseract.Link navigate={navigate} to="/createAccount" disabled={!!outlet}>Create Account</Tesseract.Link>
                    </>
            }
        </Tesseract.Page>
        {outlet}
    </>;
}