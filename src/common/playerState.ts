import * as $ from '@colyseus/schema';
import * as Colyseus from 'colyseus';
import  PositionState  from './positionState';

@$.entity
export default class PlayerState extends $.Schema {
    @$.type("string")
    public readonly name: string;

    @$.type(PositionState)
    public position: PositionState = new PositionState(0, 0, 0);

    public updateSystem: Colyseus.Delayed;

    public constructor(name: string) {
        super();
        this.name = name;
    }
}