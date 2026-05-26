import * as ORM from 'typeorm';
import Account, { SessionToken } from './account';
import config from '../../config';

export default new ORM.DataSource({
    type: "better-sqlite3",
    database: "server.db3",
    synchronize: true,
    logging: config.dev,
    entities: [Account, SessionToken]
});