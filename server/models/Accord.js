import { DataTypes } from 'sequelize';
import sequalize from '../config/sequelize.js';

const Accord = sequalize.define(
    'Accord',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'accords',
        timestamps: false
    }
);

export default Accord;