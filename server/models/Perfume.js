import { DataTypes } from 'sequelize';
import sequalize from '../config/sequelize.js';

const Perfume = sequalize.define(
    'Perfume',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        release_year: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        concentration: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        thumbnail_url: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'perfumes',
        timestamps: false
    }
);

export default Perfume;