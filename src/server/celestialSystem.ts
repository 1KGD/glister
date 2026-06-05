import * as ORM from 'typeorm';
import * as Colyseus from '@colyseus/sdk';
import ormDataSource from './ormDataSource';
import { matchMaker } from 'colyseus';
import { StarType } from '../common/celestialSystemState';
import Ship from './ship';

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

    @ORM.Column("text", { nullable: true })
    public sessionId: string;

    public async createSession(): Promise<Colyseus.SeatReservation> {
        if (this.sessionId) {
            const room = await matchMaker.getRoomById(this.sessionId);
            if (room) return matchMaker.reserveSeatFor(room, {});
        }
        const room = await matchMaker.create("celestialSystem", { systemId: this.id });
        this.sessionId = room.roomId;
        await ormDataSource.manager.save(this);
        return room;
    }
}

export async function createCelestialSystems(): Promise<void> {
    while (await ormDataSource.manager.count(CelestialSystem) < systemCount) {
        const system = new CelestialSystem;
        await ormDataSource.manager.save(system);
    }
}