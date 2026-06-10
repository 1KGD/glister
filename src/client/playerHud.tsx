import React from 'react';
import * as DREI from '@react-three/drei';
import * as THREE from 'three';
import * as Tesseract from 'tesseract';
import * as Arwes from '@arwes/react';
import roomProvider from './roomProvider';

function MessagePopup({ message }: { message: string }): React.JSX.Element {
    const [oldMessage, setOldMessage] = React.useState<string>(null);

    React.useEffect(() => { if (message) setOldMessage(message); }, [message]);

    if (!oldMessage) return;
    return <Tesseract.Page focused position={new THREE.Vector3(0, 4, -12)} hidden={!message}>
        <Arwes.Text as="div">{oldMessage}</Arwes.Text>
    </Tesseract.Page>;
}

export default function PlayerHUD(): React.JSX.Element {
    const [message, setMessage] = React.useState<string>(null);

    roomProvider.ship.useRoomMessage("notify", setMessage);

    React.useEffect(() => {
        if (!message) return;
        speechSynthesis.speak(new SpeechSynthesisUtterance(message));
        const timeout = setTimeout(() => setMessage(null), 2000);
        return (): void => { speechSynthesis.cancel(); clearTimeout(timeout); };
    }, [message]);

    return <DREI.Hud>
        <DREI.PerspectiveCamera makeDefault />
        <MessagePopup message={message} />
    </DREI.Hud >;
}