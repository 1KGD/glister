import React from 'react';
import * as KV from 'react-konva';
import './gameMap.css';
import roomProvider from '../roomProvider';

export default function GameMap({ isGameMaster }: { isGameMaster: boolean }): React.JSX.Element {
    const { room } = roomProvider.useRoom();
    const state = roomProvider.useRoomState();
    return <div className="game-map-container">
        <KV.Stage width={window.innerWidth} height={window.innerHeight} className="game-map">
            <KV.Layer>
                {state.creatures.map((creature, idx) =>
                    <KV.Circle
                        key={idx}
                        x={creature.position.x}
                        y={creature.position.y}
                        radius={50}
                        draggable
                        onDragMove={({ target }) => {
                            room.send("moveCreature", { idx, x: target.attrs.x, y: target.attrs.y });
                        }}
                        fill="red"
                    />
                )}
            </KV.Layer>
        </KV.Stage>
    </div>;
}