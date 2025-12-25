import { Router } from 'express';
import { getBrands, getBrandById, getBrandByName } from '../controllers/brandController.js';

const router = Router();

router.get('/', getBrands);
router.get('/:id', getBrandById);
router.get('/search/:name', getBrandByName);

export default router;