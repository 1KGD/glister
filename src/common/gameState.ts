import * as $ from "@colyseus/schema";
import PlayerState from "./playerState";

export default class GameState extends $.Schema {
    @$.type("string")
    public readonly systemId: string;

    @$.type({ map: PlayerState })
    public readonly players: $.MapSchema<PlayerState>;

    public constructor(systemId: string) {
        super();
        this.systemId = systemId;
        this.players = new $.MapSchema;
    }
}