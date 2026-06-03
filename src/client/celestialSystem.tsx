import React from 'react';
import roomProvider from './roomProvider';
import * as Tesseract from 'tesseract';

export default function CelestialSystem(): React.JSX.Element {
    const { isConnecting, room } = roomProvider.game.useRoom();
    const state = roomProvider.game.useRoomState();
    if (isConnecting || !room) return <Tesseract.Modal title="Loading...">Loading system...</Tesseract.Modal>

    return <Tesseract.Modal title="Debug">System ID: {state.systemId}</Tesseract.Modal>;
}