import React from 'react';
import * as KV from 'react-konva';
import './gameMap.css';
import roomProvider from '../roomProvider';
import CreatureToken from './creatureToken';
import { CreatureState } from '../../common/gameState';

export default function GameMap({ isGameMaster }: { isGameMaster?: boolean }): React.JSX.Element {
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
                {state.creatures.map((creature, idx) => <CreatureToken creature={creature as CreatureState} idx={idx} key={idx} draggable={isGameMaster} />)}
            </KV.Layer>
        </KV.Stage>
    </div>;
}