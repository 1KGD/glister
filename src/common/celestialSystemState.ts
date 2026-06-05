import * as $ from "@colyseus/schema";
import * as Colyseus from 'colyseus';
import CelestialSystem from "../server/celestialSystem";
import PositionState from "./positionState";

export const enum StarType {
    NORMAL,
    DWARF
}

@$.entity
export class CelestialShipState extends $.Schema {
    @$.type(PositionState)
    public position: PositionState = new PositionState(0, 0, 0);

    public updateSystem: Colyseus.Delayed;
}

export default class CelestialSystemState extends $.Schema {
    @$.type("string")
    public readonly systemId: string;

    @$.type({ map: CelestialShipState })
    public readonly ships: $.MapSchema<CelestialShipState>;

    @$.type("string")
    public readonly starType: StarType;

    public constructor(system: CelestialSystem) {
        super();
        this.systemId = system.id;
        this.starType = system.starType;
        this.ships = new $.MapSchema;
    }
}