import * as ORM from 'typeorm';

export default new ORM.DataSource({
    type: "better-sqlite3",
    database: "server.db3",
    synchronize: true,
    logging: true
});