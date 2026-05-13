import React from 'react';
import GameState from '../../common/gameState';
import Modal from '../modal';
import ChatComponent from '../chat/chatComponent';

export default function PlayerInterface({ state }: { state: GameState }): React.JSX.Element {
    return <>
        {!state.gameMaster && <Modal title="Waiting...">Waiting for game master...</Modal>}
        Lorem Ipusm I don't remember the rest.
        <ChatComponent />
    </>;
}