import Note from '../models/Note.js';
import { Op, fn, col, where } from 'sequelize';

export async function getAllNotes(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 50, 100);
        const offset = (page - 1) * limit;

        const where = {};

        if (req.query.name) {
            where.name = {
                [Op.iLike]: `%${req.query.name}%`
            };
        }

        let orderArray;
        if (req.query.orderBy && req.query.orderDirection) {
            const orderBy = ['name', 'id'].includes(req.query.orderBy) ? req.query.orderBy : 'name';
            const direction = req.query.orderDirection.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
            orderArray = [[orderBy, direction]];
        }

        orderArray = orderArray || [['name', 'ASC']];

        const { rows: notes, count: totalNotes } = await Note.findAndCountAll({
            where: where,
            limit: limit,
            offset: offset,
            order: orderArray
        });
        res.status(200).json({
            notes,
            totalNotes,
            totalPages: Math.ceil(totalNotes / limit),
            currentPage: page,
            orderBy: orderArray
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function getNoteById(req, res) {
    try {
        const note = await Note.findByPk(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getNoteByName(req, res) {
    try {

        const q = req.params.name;

        const results = await Note.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${q}%` } },
                    where(
                        fn("SOUNDEX", col("name")),
                        fn("SOUNDEX", q)
                    )
                ]
            },
            limit: 10
        });

        res.status(200).json(results);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}