import { Perfume, Brand, Note } from '../models/models.js';
import { Op, fn, col, where } from 'sequelize';

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
            order: orderArray
        });

        //TODO: fix include
        res.status(200).json({
            perfumes,
            totalPerfumes,
            totalPages: Math.ceil(totalPerfumes / limit),
            currentPage: page,
            orderBy: orderArray,
            include: [
                {
                    model: Brand,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                },
                {
                    model: Note,
                    attributes: ['id', 'name'],
                    through: { attributes: ['type'] }

                }
            ],
            distinct: true
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getPerfumeById(req, res) {
    try {
        const perfume = await Perfume.findByPk(req.params.id);
        if (!perfume) {
            return res.status(404).json({ message: 'Perfume not found.' });
        }
        res.status(200).json(perfume);
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
            limit: 10
        });

        res.status(200).json(results);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}