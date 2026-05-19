import React from 'react';
import Konva from 'konva';
import * as KV from 'react-konva';
import { CreatureState } from '../../common/gameState';
import roomProvider from '../roomProvider';

export default function CreatureToken({ creature, idx, draggable }: { creature: CreatureState, idx: number, draggable: boolean }): React.JSX.Element {
    const { room } = roomProvider.useRoom();
    const [dragging, setDragging] = React.useState(false);
    const [position, setPosition] = React.useState<{ x: number, y: number }>({ x: creature.position.x, y: creature.position.y });

    React.useEffect(() => {
        if (!dragging) setPosition(creature.position);
    }, [creature]);

    return <>
        <KV.Circle
            x={position.x}
            y={position.y}
            draggable={draggable}
            radius={50}
            fill="red"
            filters={[Konva.Filters.Emboss]}
            onDragStart={() => setDragging(true)}
            onDragMove={({ target }) => {
                setPosition({ x: target.attrs.x, y: target.attrs.y });
                room.send("moveCreature", { idx, x: target.attrs.x, y: target.attrs.y });
            }}
            onDragEnd={() => setDragging(false)}
        />
        <KV.Text
            x={position.x}
            y={position.y}
            text={creature.name}
        />
    </>;
}