import * as ORM from 'typeorm';
import * as Colyseus from '@colyseus/sdk';
import ormDataSource from './ormDataSource';
import { matchMaker } from 'colyseus';

const systemCount = 1000;

@ORM.Entity()
export default class CelestialSystem {
    @ORM.PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @ORM.ManyToMany(() => CelestialSystem, celestialSystem => celestialSystem.routes, { lazy: true })
    public routes: Promise<CelestialSystem[]>;

    @ORM.OneToMany(() => Position, position => position.system)
    public readonly positions: Position[];

    @ORM.Column("text", { nullable: true })
    public sessionId: string;

    public async createSession(): Promise<Colyseus.SeatReservation> {
        if (this.sessionId) {
            const room = await matchMaker.getRoomById(this.sessionId);
            if (room) return matchMaker.reserveSeatFor(room, {});
        }
        const room = await matchMaker.create("game", { systemId: this.id });
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

@ORM.Entity()
export class Position {
    @ORM.PrimaryGeneratedColumn("rowid")
    private readonly id: string;

    @ORM.Column("float")
    public x: number = 0;

    @ORM.Column("float")
    public y: number = 0;

    @ORM.Column("float")
    public z: number = 0;

    @ORM.ManyToOne(() => CelestialSystem, celestialSystem => celestialSystem.positions, { lazy: true, cascade: true })
    public readonly system: Promise<CelestialSystem>;
}