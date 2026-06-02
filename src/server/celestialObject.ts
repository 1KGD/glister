import * as ORM from 'typeorm';
import Account from './account';
import { Position } from './celestialSystem';
import ormDataSource from './ormDataSource';

@ORM.Entity()
export default class CelestialObject {
    @ORM.PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @ORM.ManyToOne(() => Account, account => account.ships, { lazy: true, cascade: true })
    public readonly owner: Promise<Account>;

    @ORM.OneToOne(() => Position, { lazy: true, cascade: true, nullable: true })
    @ORM.JoinColumn()
    public position: Promise<Position>;

    public constructor(owner: Account) {
        this.owner = Promise.resolve(owner);
    }

    public async setupPosition(): Promise<void> {
        this.position = ormDataSource.manager.save(new Position);
        await ormDataSource.manager.save(this);
    }
}