import * as ORM from 'typeorm';
import Account, { AdventureClientData } from './account';

@ORM.Entity()
export default class Adventure {
    @ORM.PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @ORM.Column("text")
    public name: string;

    @ORM.ManyToOne(() => Account, account => account.adventures, { cascade: true, eager: true })
    public owner: Account;

    public constructor(owner: Account, name: string) {
        this.owner = owner;
        this.name = name;
    }

    public asClientData(): AdventureClientData {
        return {
            name: this.name
        };
    }
}