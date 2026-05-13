import * as $ from "@colyseus/schema";

@$.entity
export class PlayerState extends $.Schema {
    @$.type("string") public name: string;

    public constructor(name: string) {
        super();
        this.name = name;
    }
}

@$.entity
export class GameMasterState extends $.Schema {
    @$.type("string") public readonly id: string;

    public constructor(id: string) {
        super();
        this.id = id;
    }
}

export default class GameState extends $.Schema {
    @$.type(GameMasterState) public gameMaster: GameMasterState;
    @$.type({ map: PlayerState }) public players: $.MapSchema<PlayerState, string>;

    public constructor() {
        super();
        this.players = new $.MapSchema();
    }
}