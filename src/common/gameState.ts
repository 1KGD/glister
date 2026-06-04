import * as $ from "@colyseus/schema";
import PlayerState from "./playerState";
import CelestialSystem from "../server/celestialSystem";

export const enum StarType {
    NORMAL,
    DWARF
}

export default class GameState extends $.Schema {
    @$.type("string")
    public readonly systemId: string;

    @$.type({ map: PlayerState })
    public readonly players: $.MapSchema<PlayerState>;

    @$.type("string")
    public readonly starType: StarType;

    public constructor(system: CelestialSystem) {
        super();
        this.systemId = system.id;
        this.starType = system.starType;
        this.players = new $.MapSchema;
    }
}