import * as ORM from 'typeorm';
import Account from './account';

export type AdventureClientData = {
    id: string,
    name: string,
}

@ORM.Entity()
export default class Adventure {
    @ORM.PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @ORM.Column("text")
    public name: string;

    @ORM.ManyToOne(() => Account, account => account.adventures, { cascade: true, lazy: true })
    public owner: Promise<Account>;

    public constructor(owner: Account, name: string) {
        this.owner = Promise.resolve(owner);
        this.name = name;
    }

    public asClientData(): AdventureClientData {
        return {
            id: this.id,
            name: this.name
        };
    }
}