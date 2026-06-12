import * as ORM from 'typeorm';
import CelestialSystem from './celestialSystem';

@ORM.Entity()
export default class Planet {
    @ORM.PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @ORM.ManyToOne(() => CelestialSystem, celestialSystem => celestialSystem.planets, { lazy: true, cascade: true, nullable: true })
    public readonly system: Promise<CelestialSystem>;

    @ORM.Column("float")
    public readonly orbitRadius: number;

    @ORM.Column("float")
    public readonly orbitSpeed: number;

    @ORM.Column("float")
    public readonly size: number;

    public constructor(system: CelestialSystem) {
        this.system = Promise.resolve(system);
        this.orbitRadius = 4000 + Math.random() * 20000;
        this.orbitSpeed = 1000 + Math.random() * 1000;
        this.size = 50 + Math.random() * 500;
    }
}