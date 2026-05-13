import * as $ from "@colyseus/schema";
import StatsState from "./statsState";

@$.entity
export class PlayerState extends $.Schema {
    @$.type("string") public readonly name: string;
    @$.type(StatsState) public stats: StatsState;

    public constructor(name: string) {
        super();
        this.name = name;
        this.stats = new StatsState();
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