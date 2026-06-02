import * as ORM from 'typeorm';
import * as Colyseus from '@colyseus/sdk';
import ormDataSource from './ormDataSource';
import CelestialObject from './celestialObject';
import GameRoom from './gameRoom';
import server from '.';
import { matchMaker } from 'colyseus';

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
        const room = await matchMaker.create("game");
        this.sessionId = room.sessionId;
        await ormDataSource.manager.save(this);
        return room;
    }
}

export async function createCelestialSystem(): Promise<void> {
    await ormDataSource.manager.save(new CelestialSystem);
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