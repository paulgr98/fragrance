import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect,
        logging: false
    }
);

export default sequelize;