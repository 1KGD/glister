import * as $ from "@colyseus/schema";
import type * as Colyseus from 'colyseus';
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

@$.entity
export class CelestialPlanetState extends $.Schema {
    @$.type("number")
    public readonly orbitDistance: number;

    @$.type("number")
    public readonly orbitTime: number;

    @$.type("number")
    public readonly size: number;

    public constructor(orbitDistance: number, orbitTime: number, size: number) {
        super();
        this.orbitDistance = orbitDistance;
        this.orbitTime = orbitTime;
        this.size = size;
    }
}

@$.entity
export class CelestialPlayerState extends $.Schema { }

export default class CelestialSystemState extends $.Schema {
    @$.type("string")
    public readonly systemId: string;

    @$.type("number")
    public time: number = 0;

    @$.type({ map: CelestialShipState })
    public readonly ships: $.MapSchema<CelestialShipState>;

    @$.type({ map: CelestialPlayerState })
    public readonly players: $.MapSchema<CelestialPlayerState>;

    @$.type({ map: CelestialPlanetState })
    public readonly planets: $.MapSchema<CelestialPlanetState>;

    @$.type("string")
    public readonly starType: StarType;

    @$.type("number")
    public readonly starSize: number = 1000;

    public constructor(system: CelestialSystem) {
        super();
        this.systemId = system.id;
        this.starType = system.starType;
        this.ships = new $.MapSchema;
        this.players = new $.MapSchema;
        this.planets = new $.MapSchema;
    }

    public async populatePlanets(system: CelestialSystem): Promise<void> {
        for (const planet of await system.planets) {
            this.planets.set(planet.id, new CelestialPlanetState(planet.orbitRadius, planet.orbitSpeed, planet.size));
        }
    }
}