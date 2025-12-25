import Brand from '../models/Brand.js';
import { Op, fn, col, where } from 'sequelize';

export async function getBrands(req, res) {
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

        const { rows: brands, count: totalBrands } = await Brand.findAndCountAll({
            where: where,
            limit: limit,
            offset: offset,
            order: orderArray
        });
        res.status(200).json({
            brands,
            totalBrands,
            totalPages: Math.ceil(totalBrands / limit),
            currentPage: page,
            orderBy: orderArray
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function getBrandById(req, res) {
    try {
        const brand = await Brand.findByPk(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found.' });
        }
        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getBrandByName(req, res) {
    try {

        const q = req.params.name;

        const results = await Brand.findAll({
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