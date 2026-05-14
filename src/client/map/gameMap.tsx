import React from 'react';
import * as KV from 'react-konva';
import './gameMap.css';
import roomProvider from '../roomProvider';

export default function GameMap({ isGameMaster }: { isGameMaster?: boolean }): React.JSX.Element {
    const { room } = roomProvider.useRoom();
    const state = roomProvider.useRoomState();

    const containerRef = React.useRef<HTMLDivElement>(null);
    const [size, setSize] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
        const checkSize = (): void => {
            setSize({
                width: containerRef.current.clientWidth,
                height: containerRef.current.clientHeight,
            });
        };

        checkSize();

        window.addEventListener('resize', checkSize);
        return (): void => window.removeEventListener('resize', checkSize);

    }, []);

    return <div ref={containerRef} className="game-map-container">
        <KV.Stage width={size.width} height={size.height} className="game-map" >
            <KV.Layer>
                {state.creatures.map((creature, idx) =>
                    <KV.Circle
                        key={idx}
                        x={creature.position.x}
                        y={creature.position.y}
                        radius={50}
                        draggable={isGameMaster}
                        onDragMove={({ target }) => room.send("moveCreature", { idx, x: target.attrs.x, y: target.attrs.y })}
                        fill="red"
                    />
                )}
            </KV.Layer>
        </KV.Stage>
    </div>;
}