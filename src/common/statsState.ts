import * as $ from '@colyseus/schema';

@$.entity
export class StatState extends $.Schema {
    @$.type("int8") public value: number;

    public constructor() {
        super();

        this.value = 0;
    }
}

@$.entity
export class ResourceState extends $.Schema {
    @$.type("number") public current: number;
    @$.type("number") public max: number;

    public constructor(current: number, max: number) {
        super();
        this.current = current;
        this.max = max;
    }
}

@$.entity
export default class StatsState extends $.Schema {
    @$.type(StatState) public str: StatState = new StatState;
    @$.type(StatState) public wis: StatState = new StatState;
    @$.type(StatState) public dex: StatState = new StatState;
    @$.type(StatState) public con: StatState = new StatState;
    @$.type(StatState) public int: StatState = new StatState;

    @$.type(ResourceState) public health: ResourceState;

    public constructor() {
        super();

        this.health = new ResourceState(20, 20);
    }
}