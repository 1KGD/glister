import * as ORM from 'typeorm';
import ormDataSource from './ormDataSource';

export class AccountManager {
    public constructor() {
        ormDataSource.initialize().then(() => console.log("loaded")).catch(e => { throw e; });
    }
}

@ORM.Entity()
export class Account {
    @ORM.PrimaryGeneratedColumn()
    public id: number;

    @ORM.Column("string")
    public name: string;
}

export default new AccountManager;