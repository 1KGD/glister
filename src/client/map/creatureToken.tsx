import React from 'react';
import Konva from 'konva';
import * as KV from 'react-konva';
import { CreatureState } from '../../common/gameState';
import roomProvider from '../roomProvider';

export default function CreatureToken({ creature, idx, draggable }: { creature: CreatureState, idx: number, draggable: boolean }): React.JSX.Element {
    const { room } = roomProvider.useRoom();
    return <>
        <KV.Circle
            x={creature.position.x}
            y={creature.position.y}
            draggable={draggable}
            radius={50}
            fill="red"
            filters={[Konva.Filters.Emboss]}
            onDragMove={({ target }) => room.send("moveCreature", { idx, x: target.attrs.x, y: target.attrs.y })}
        />
        <KV.Text
            x={creature.position.x}
            y={creature.position.y}
            text={creature.name}
        />
    </>;
}