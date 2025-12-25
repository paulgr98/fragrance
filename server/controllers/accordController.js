import Accord from '../models/Accord.js';

export async function getAllAccords(req, res) {
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

        const { rows: accords, count: totalAccords } = await Accord.findAndCountAll({
            where: where,
            limit: limit,
            offset: offset,
            order: orderArray
        });
        res.status(200).json({
            accords,
            totalAccords,
            totalPages: Math.ceil(totalAccords / limit),
            currentPage: page,
            orderBy: orderArray
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function getAccordById(req, res) {
    try {
        const accord = await Accord.findByPk(req.params.id);
        if (!accord) {
            return res.status(404).json({ message: 'Accord not found.' });
        }
        res.status(200).json(accord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}