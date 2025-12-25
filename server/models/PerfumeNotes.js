import { DataTypes } from 'sequelize';
import sequalize from '../config/sequelize.js';

const PerfumeNotes = sequalize.define(
    'PerfumeNotes',
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
        type: {
            type: DataTypes.ENUM('top', 'middle', 'base'),
            allowNull: false
        }
    },
    {
        tableName: 'perfume_notes',
        timestamps: false
    }
);

export default PerfumeNotes;