import { DataTypes } from 'sequelize';
import sequalize from '../config/sequelize.js';

const PerfumeNotes = sequalize.define(
    'PerfumeNotes',
    {
        perfumeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'perfumes',
                key: 'id'
            }
        },
        noteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'notes',
                key: 'id'
            }
        },
        noteType: {
            type: DataTypes.ENUM('top', 'middle', 'base'),
            allowNull: false
        }
    },
    {
        tableName: 'perfume_notes',
        timestamps: false,
        underscored: true
    }
);

export default PerfumeNotes;