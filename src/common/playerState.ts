import * as $ from '@colyseus/schema';

@$.entity
export default class PlayerState extends $.Schema {
    @$.type("string")
    public readonly name: string;

    public constructor(name: string) {
        super();
        this.name = name;
    }
}