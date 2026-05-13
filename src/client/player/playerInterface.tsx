import React from 'react';
import * as Colyseus from '@colyseus/sdk';
import GameState from '../../common/gameState';
import Modal from '../modal';
import ChatComponent from '../chat/chatComponent';

export default function PlayerInterface({ state, room }: { state: GameState, room: Colyseus.Room }): React.JSX.Element {
    return <>
        {!state.gameMaster && <Modal title="Waiting...">Waiting for game master...</Modal>}
        Lorem Ipusm I don't remember the rest.
        <ChatComponent />
    </>;
}