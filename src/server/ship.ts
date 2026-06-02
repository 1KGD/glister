import * as ORM from 'typeorm';
import Account from './account';
import { Position } from './celestialSystem';

@ORM.Entity()
export default class Ship {
    @ORM.PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @ORM.ManyToOne(() => Account, account => account.ships, { lazy: true, cascade: true })
    public readonly owner: Promise<Account>;

    @ORM.OneToOne(() => Position, { lazy: true })
    @ORM.JoinColumn()
    public readonly position: Promise<Position>;
}