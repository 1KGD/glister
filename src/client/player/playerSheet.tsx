import React from 'react';
import { PlayerState } from '../../common/gameState';
import './playerSheet.css';

export default function PlayerSheet({ player }: { player: PlayerState }): React.JSX.Element {
    return <>{JSON.stringify(player)}</>;
}