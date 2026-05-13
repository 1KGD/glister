import React from 'react';
import * as KV from 'react-konva';
import './gameMap.css';

export default function GameMap(): React.JSX.Element {
    return <div className="game-map-container">
        <KV.Stage width={window.innerWidth} height={window.innerHeight} className="game-map">
            <KV.Layer>
                <KV.Text text="Hello, World!" />
            </KV.Layer>
        </KV.Stage>
    </div>;
}