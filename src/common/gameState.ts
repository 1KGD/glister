import * as $ from "@colyseus/schema";

@$.entity
export class PlayerState extends $.Schema {
    @$.type("string") public name: string;
}

export class GameMasterState extends $.Schema {
    @$.type("string") public name: string;
}

export default class GameState extends $.Schema {
    @$.type(GameMasterState) public gameMaster: GameMasterState;
    @$.type([PlayerState]) public players: $.ArraySchema<PlayerState>;

    public constructor() {
        super();
        this.gameMaster = new GameMasterState();
        this.players = new $.ArraySchema();
    }
}