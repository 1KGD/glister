import React from 'react';
import { PlayerState } from '../../common/gameState';
import './playerSheet.css';
import roomProvider from '../roomProvider';

export default function PlayerSheet({ player }: { player: PlayerState }): React.JSX.Element {
    const creatures = roomProvider.useRoomState(state => state.creatures);
    return <div className="player-sheet">{JSON.stringify(creatures[player.creatureId].stats)}</div>;
}