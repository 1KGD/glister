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
        this.set(x,y,z);
    }

    public set(x: number, y: number, z:number): this {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
}