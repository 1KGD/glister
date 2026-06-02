import * as ORM from 'typeorm';

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
    name: string
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

    public constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }

    public asClientData(): AccountClientData {
        return {
            name: this.name,
        };
    }
}