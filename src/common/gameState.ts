import * as $ from "@colyseus/schema";
import StatsState from "./statsState";
import * as uuid from 'uuid';

export enum CreatureType {
    Player,
    Monster,
    NPC
}

@$.entity
export class GameMasterState extends $.Schema {
    @$.type("string") public readonly id: string;

    public constructor(id: string) {
        super();
        this.id = id;
    }
}

@$.entity
export class PositionState extends $.Schema {
    @$.type("number") public x: number = 0;
    @$.type("number") public y: number = 0;
}

@$.entity
export class CreatureState extends $.Schema {
    @$.type("string") public name: string;
    @$.type(PositionState) public position: PositionState = new PositionState;
    @$.type(StatsState) public readonly stats: StatsState = new StatsState;
    @$.type(CreatureType) public type: CreatureType;

    public constructor(name: string, type: CreatureType) {
        super();
        this.name = name;
        this.type = type;
    }
}

@$.entity
export class PlayerState extends $.Schema {
    @$.type("string") public readonly name: string;
    @$.type("string") public readonly creatureId: string;

    public constructor(name: string, creatureId: string) {
        super();
        this.name = name;
        this.creatureId = creatureId;
    }
}

export default class GameState extends $.Schema {
    @$.type(GameMasterState) public gameMaster: GameMasterState;
    @$.type({ map: PlayerState }) public readonly players: $.MapSchema<PlayerState, string>;
    @$.type({ map: CreatureState }) public readonly creatures: $.MapSchema<CreatureState, string>;

    public constructor() {
        super();
        this.players = new $.MapSchema;
        this.creatures = new $.MapSchema;
        this.addCreature(new CreatureState("Goblin", CreatureType.Monster));
    }

    public addCreature(creature: CreatureState): string {
        const creatureId = uuid.v4();
        this.creatures.set(creatureId, creature);
        return creatureId;
    }
}