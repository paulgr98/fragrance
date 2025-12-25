import { DataTypes } from 'sequelize';
import sequalize from '../config/sequelize.js';

const Note = sequalize.define(
    'Note',
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
        tableName: 'notes',
        timestamps: false
    }
);

export default Note;