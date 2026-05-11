import * as $ from "@colyseus/schema";

export class GameMasterState extends $.Schema {
    @$.type("string") public name: string;
}

export default class GameState extends $.Schema {
    public gameMaster: GameMasterState;

    public constructor() {
        super();
        this.gameMaster = new GameMasterState();
    }
}