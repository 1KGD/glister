import * as $ from '@colyseus/schema';

export default class PositionState extends $.Schema {
    @$.type("number")
    public x: number;
    @$.type("number")
    public y: number;
    @$.type("number")
    public z: number;

    public constructor(x: number, y: number, z: number) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
    }
}