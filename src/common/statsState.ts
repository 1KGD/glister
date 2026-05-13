import * as $ from '@colyseus/schema';

@$.entity
export class StatState extends $.Schema {
    @$.type("int8") public value: number;
}

@$.entity
export default class StatsState extends $.Schema {
    @$.type(StatState) public str: StatState;
    @$.type(StatState) public wis: StatState;
    @$.type(StatState) public dex: StatState;
    @$.type(StatState) public con: StatState;
    @$.type(StatState) public int: StatState;

    public constructor() {
        super();
        this.str = new StatState();
        this.wis = new StatState();
        this.dex = new StatState();
        this.con = new StatState();
        this.int = new StatState();
    }
}