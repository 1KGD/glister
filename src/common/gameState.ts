import * as $ from "@colyseus/schema";

@$.entity
export class PlayerState extends $.Schema {
    @$.type("string") public name: string;
}

@$.entity
export class GameMasterState extends $.Schema {
    @$.type('string') public readonly id: string;
    @$.type("string") public name: string;

    public constructor(id: string) {
        super();
        this.id = id;
    }
}

export default class GameState extends $.Schema {
    @$.type(GameMasterState) public gameMaster: GameMasterState;
    @$.type([PlayerState]) public players: $.ArraySchema<PlayerState>;

    public constructor() {
        super();
        this.players = new $.ArraySchema();
    }
}