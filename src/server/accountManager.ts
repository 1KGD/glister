import * as ORM from 'typeorm';
import ormDataSource from './ormDataSource';
import Account, { SessionToken } from './account';
import config from '../../config';

export class AccountManager {
    public async addAccount(name: string, password: string): Promise<void> {
        await ormDataSource.manager.save(new Account(name, password));
    }

    public async verifyAccount(name: string, password: string): Promise<string> {
        await this.cleanDeadSessions();
        const account = await ormDataSource.manager.findOneBy(Account, { name: name });
        if (account.password !== password) {
            return null;
        }
        const token = new SessionToken;
        await ormDataSource.manager.save(token);
        account.token = token.value;
        await ormDataSource.manager.save(account);
        return token.value;
    }

    public async cleanDeadSessions(): Promise<void> {
        for (const token of await ormDataSource.manager.find(SessionToken)) {
            console.log((new Date).valueOf() - token.creationTime.valueOf());
            if ((new Date).valueOf() - token.creationTime.valueOf() >= config.multiplayer.sessionTokenExperationTime) {
                await ormDataSource.manager.delete(SessionToken, token.value);
            }
        }
    }
}

export default new AccountManager;