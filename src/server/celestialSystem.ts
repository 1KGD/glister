import * as ORM from 'typeorm';
import * as Colyseus from 'colyseus';
import ormDataSource from './ormDataSource';
import { StarType } from '../common/celestialSystemState';
import Ship from './ship';
import Planet from './planet';

const systemCount = 1000;

@ORM.Entity()
export default class CelestialSystem {
    @ORM.PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @ORM.Column("simple-enum")
    public readonly starType: StarType = StarType.DWARF;

    @ORM.ManyToMany(() => CelestialSystem, celestialSystem => celestialSystem.routes, { lazy: true })
    public routes: Promise<CelestialSystem[]>;

    @ORM.OneToMany(() => Ship, ship => ship.system, { lazy: true })
    public readonly ships: Promise<Ship[]>;

    @ORM.OneToMany(() => Planet, planet => planet.system, { lazy: true })
    public readonly planets: Promise<Planet[]>;

    @ORM.Column("text", { nullable: true })
    public sessionId: string;

    public async populatePlanets(): Promise<void> {
        for (let i = 0; i < 10; i++) {
            const newPlanet = new Planet(this);
            await ormDataSource.manager.save(newPlanet);
        }
    }

    public async createSession(): Promise<Colyseus.matchMaker.ISeatReservation> {
        if (this.sessionId) {
            const room = await Colyseus.matchMaker.getRoomById(this.sessionId);
            if (room) return Colyseus.matchMaker.reserveSeatFor(room, {});
        }
        const room = await Colyseus.matchMaker.create("celestialSystem", { systemId: this.id });
        this.sessionId = room.roomId;
        await ormDataSource.manager.save(this);
        return room;
    }
}

export async function createCelestialSystems(): Promise<void> {
    let count = await ormDataSource.manager.count(CelestialSystem);
    while (count < systemCount) {
        const system = new CelestialSystem;
        await ormDataSource.manager.save(system);
        await system.populatePlanets();
        count = await ormDataSource.manager.count(CelestialSystem)
        console.log(`Populating Systems: ${Math.round(count/systemCount)}%`);
    }
}