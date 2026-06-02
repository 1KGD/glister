import * as ORM from 'typeorm';
import Account, { SessionToken } from './account';
import config from '../../config';
import Ship from './celestialObject';
import CelestialSystem, { Position } from './celestialSystem';

export default new ORM.DataSource({
    type: "better-sqlite3",
    database: "./data/server.db3",
    synchronize: true,
    logging: config.dev,
    entities: [Account, SessionToken, CelestialSystem, Ship, Position]
});