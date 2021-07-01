import * as pg from 'pg';

import config from './config';

const { Pool } = pg;

const pool = new Pool({
    user: config.DATABASE_USER,
    host: config.DATABASE_HOST,
    database: config.DATABASE_NAME,
    password: config.DATABASE_PASSWORD,
    port: parseInt(config.DATABASE_PORT)
});

export default pool;