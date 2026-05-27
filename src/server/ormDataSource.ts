import * as ORM from 'typeorm';
import Account, { SessionToken } from './account';
import config from '../../config';
import Adventure from './adventure';

export default new ORM.DataSource({
    type: "better-sqlite3",
    database: "./data/server.db3",
    synchronize: true,
    logging: config.dev,
    entities: [Account, SessionToken, Adventure]
});