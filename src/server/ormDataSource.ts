import * as ORM from 'typeorm';
import Account, { SessionToken } from './account';

export default new ORM.DataSource({
    type: "better-sqlite3",
    database: "server.db3",
    synchronize: true,
    logging: true,
    entities: [Account, SessionToken]
});