import * as ORM from 'typeorm';
import Adventure, { type AdventureClientData } from './adventure';

@ORM.Entity()
export class SessionToken {
    @ORM.PrimaryGeneratedColumn("uuid")
    public readonly value: string;

    @ORM.Column("datetime")
    public readonly creationTime: Date;

    public constructor() {
        this.creationTime = new Date;
    }
}

export type AccountClientData = {
    name: string,
    adventures: AdventureClientData[]
};

@ORM.Entity()
export default class Account {
    @ORM.PrimaryGeneratedColumn()
    public readonly id: number;

    @ORM.Column("text", { unique: true })
    public readonly name: string;

    @ORM.Column("text")
    public readonly password: string;

    @ORM.Column("text", { nullable: true, unique: true })
    public token: string;

    @ORM.OneToMany(() => Adventure, adventure => adventure.owner, { lazy: true })
    public adventures: Promise<Adventure[]>;

    public constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }

    public async asClientData(): Promise<AccountClientData> {
        const adventures = await this.adventures;
        return {
            name: this.name,
            adventures: adventures ? adventures.map(adventure => adventure.asClientData()) : []
        };
    }
}