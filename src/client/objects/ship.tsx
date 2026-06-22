import React from 'react';
import * as Router from 'react-router';
import * as THREE from 'three';
import PositionState from '../../common/positionState';
import roomProvider from '../roomProvider';
import Player from './player';
import * as Tesseract from 'tesseract';
import Link from '../widgets/link';

export default function Ship({ position, navigate }: { position: PositionState, navigate: Router.NavigateFunction }): React.JSX.Element {
    const { isConnecting, room } = roomProvider.ship.useRoom();
    const state = roomProvider.ship.useRoomState();
    React.useEffect(() => { if (room && !isConnecting) room.send("ready") }, [isConnecting]);

    return <mesh position={[position.x, position.y, position.z]}>
        <Tesseract.Page xray position={new THREE.Vector3(0, 0, -2)}>
            <>
                <Link navigate={navigate} to="/api/logout" viewTransition refresh>Logout</Link>
                <Link navigate={navigate} to="/editor" viewTransition refresh>Ship Editor</Link>
            </>
        </Tesseract.Page>
        <torusKnotGeometry />
        <meshPhysicalMaterial metalness={0.8} roughness={0.4} color="orange" />
        {state?.players && Object.values(state.players).map((player, i) => <Player key={i} name={player.name} position={player.position as PositionState} isLocal />)}
    </mesh>;
}