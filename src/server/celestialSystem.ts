import * as ORM from 'typeorm';
import ormDataSource from './ormDataSource';

@ORM.Entity()
export default class CelestialSystem {
    @ORM.PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @ORM.ManyToMany(() => CelestialSystem, celestialSystem => celestialSystem.routes, { lazy: true })
    public routes: Promise<CelestialSystem[]>;

    @ORM.OneToMany(() => Position, position => position.system)
    public readonly positions: Position[];
}

export async function createCelestialSystem(): Promise<void> {
    await ormDataSource.manager.save(new CelestialSystem);
}

@ORM.Entity()
export class Position {
    @ORM.PrimaryGeneratedColumn("rowid")
    private readonly id: string;

    @ORM.Column("float")
    public x: number;

    @ORM.Column("float")
    public y: number;

    @ORM.Column("float")
    public z: number;

    @ORM.ManyToOne(() => CelestialSystem, celestialSystem => celestialSystem.positions, { lazy: true, cascade: true })
    public readonly system: Promise<CelestialSystem>;
}