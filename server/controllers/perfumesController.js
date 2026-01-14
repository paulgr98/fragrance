import { Perfume, Brand, Note, PerfumeNotes } from '../models/models.js';
import { Op, fn, col, where } from 'sequelize';

function flattenPerfumes(perfumes) {
    return perfumes.map(perfume => {
        return {
            ...perfume.toJSON(),
            Notes: perfume.Notes.map(note => ({
                id: note.id,
                name: note.name,
                noteType: note.PerfumeNotes.noteType
            }))
        };
    });
}

export async function getPerfumes(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 50, 100);
        const offset = (page - 1) * limit;

        const where = {};

        if (req.query.nameLike) {
            where.name = {
                [Op.like]: `%${req.query.nameLike}%`
            };
        }

        let orderArray;
        if (req.query.orderBy && req.query.orderDirection) {
            const orderBy = ['name', 'id'].includes(req.query.orderBy) ? req.query.orderBy : 'name';
            const direction = req.query.orderDirection.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
            orderArray = [[orderBy, direction]];
        }

        orderArray = orderArray || [['name', 'ASC']];

        const { rows: perfumes, count: totalPerfumes } = await Perfume.findAndCountAll({
            where: where,
            limit: limit,
            offset: offset,
            order: orderArray,
            include: [
                {
                    model: Brand,
                },
                {
                    model: Note,
                    through: {
                        model: PerfumeNotes,
                        attributes: ['noteType']
                    },
                    required: false
                }
            ],
            distinct: true,
            subQuery: false
        });

        const simplifiedPerfumes = flattenPerfumes(perfumes);

        res.status(200).json({
            perfumes: simplifiedPerfumes,
            totalPerfumes,
            totalPages: Math.ceil(totalPerfumes / limit),
            currentPage: page,
            orderBy: orderArray,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getPerfumeById(req, res) {
    try {
        const perfume = await Perfume.findByPk(req.params.id, {
            include: [
                {
                    model: Brand,
                },
                {
                    model: Note,
                    through: {
                        model: PerfumeNotes,
                        attributes: ['noteType']
                    },
                    required: false
                }
            ]
        });
        if (!perfume) {
            return res.status(404).json({ message: 'Perfume not found.' });
        }
        res.status(200).json(flattenPerfumes([perfume])[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getPerfumeByName(req, res) {
    try {
        const q = req.params.name;

        const results = await Perfume.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${q}%` } },
                    where(
                        fn("SOUNDEX", col("name")),
                        fn("SOUNDEX", q)
                    )
                ]
            },
            limit: 10,
            include: [
                {
                    model: Brand,
                },
                {
                    model: Note,
                    through: {
                        model: PerfumeNotes,
                        attributes: ['noteType']
                    },
                    required: false
                }
            ]
        });

        res.status(200).json(flattenPerfumes(results));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}