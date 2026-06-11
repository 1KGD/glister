import * as $ from "@colyseus/schema";
import PlayerState from "./playerState";

export default class ShipState extends $.Schema {
    @$.type({ map: PlayerState })
    public readonly players: $.MapSchema<PlayerState>;

    public constructor() {
        super();
        this.players = new $.MapSchema;
    }
}