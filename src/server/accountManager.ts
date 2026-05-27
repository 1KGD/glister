import ormDataSource from './ormDataSource';
import Account, { AccountClientData, SessionToken } from './account';
import config from '../../config';
import Adventure from './adventure';

export class LoginError extends Error { }

export class AccountManager {
    public async addAccount(name: string, password: string): Promise<void> {
        await ormDataSource.manager.save(new Account(name, password));
    }

    public async login(name: string, password: string): Promise<string> {
        const account = await ormDataSource.manager.findOneBy(Account, { name });
        if (account.password !== password) {
            throw new LoginError("Bad username or password");
        }
        const token = new SessionToken;
        await ormDataSource.manager.save(token);
        account.token = token.value;
        await ormDataSource.manager.save(account);
        return token.value;
    }

    public async verify(token: string): Promise<Account> {
        await this.cleanDeadSessions();
        if (!await ormDataSource.manager.findOneBy(SessionToken, { value: token })) return null;
        return await ormDataSource.manager.findOneBy(Account, { token });
    }

    public async cleanDeadSessions(): Promise<void> {
        for (const token of await ormDataSource.manager.find(SessionToken)) {
            if ((new Date).valueOf() - token.creationTime.valueOf() >= config.multiplayer.sessionTokenExperationTime) {
                await this.logout(token.value);
            }
        }
    }

    public async getUserData(token: string): Promise<AccountClientData> {
        await this.cleanDeadSessions();
        return (await ormDataSource.manager.findOneBy(Account, { token }))?.asClientData();
    }

    public async getUserId(token: string): Promise<number> {
        return (await ormDataSource.manager.findOneBy(Account, { token })).id;
    }

    public async logout(token: string): Promise<void> {
        const account = await ormDataSource.manager.findOneBy(Account, { token: token });
        account.token = null;
        await ormDataSource.manager.save(account);
        await ormDataSource.manager.delete(SessionToken, token);
    }

    public async createAdventure(ownerId: number, name: string): Promise<void> {
        const owner = await ormDataSource.manager.findOneBy(Account, { id: ownerId });
        const adventure = new Adventure(owner, name);
        adventure.owner = owner;
        await ormDataSource.manager.save(adventure);
    }
}

export default new AccountManager;