import React from 'react';
import Konva from 'konva';
import * as KV from 'react-konva';
import { CreatureState } from '../../common/gameState';
import roomProvider from '../roomProvider';

export default function CreatureToken({ creature, idx, isGameMaster }: { creature: CreatureState, idx: number, isGameMaster: boolean }): React.JSX.Element {
    const { room } = roomProvider.useRoom();
    const [dragging, setDragging] = React.useState(false);
    const [position, setPosition] = React.useState<{ x: number, y: number }>({ x: creature.position.x, y: creature.position.y });

    React.useEffect(() => {
        if (!dragging) setPosition(creature.position);
    }, [creature]);

    React.useEffect(() => {
        if (isGameMaster && dragging) room.send("moveCreature", { idx, x: position.x, y: position.y });
    }, [position]);

    return <KV.Group
        x={position.x - 50}
        y={position.y - 50}
        draggable={isGameMaster}
        onDragStart={() => setDragging(true)}
        onDragMove={({ target }) => {
            setPosition({ x: target.attrs.x + 50, y: target.attrs.y + 50 });
        }}
        onDragEnd={() => setDragging(false)}
    >
        <KV.Circle
            x={50}
            y={50}
            radius={50}
            fill="red"
        />
        <KV.Text
            width={100}
            height={100}
            y={isGameMaster ? -5 : 0}
            verticalAlign="middle"
            align="center"
            text={creature.name}
        />
        {isGameMaster && <KV.Text
            width={100}
            height={100}
            y={5}
            verticalAlign="middle"
            align="center"
            text={`${creature.stats.health.current}/${creature.stats.health.max} HP`}
        />}
    </KV.Group>;
}