import { DataTypes } from 'sequelize';
import sequalize from '../config/sequelize.js';

const Brand = sequalize.define(
    'Brand',
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
        tableName: 'brands',
        timestamps: false
    }
);

export default Brand;