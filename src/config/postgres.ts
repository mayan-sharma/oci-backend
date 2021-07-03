import { Sequelize } from "sequelize";

import config from './config';

const db = new Sequelize(config.DATABASE_NAME, config.DATABASE_USER, config.DATABASE_PASSWORD, {
    host: config.DATABASE_HOST,
    dialect: 'postgres'
});

export default db;