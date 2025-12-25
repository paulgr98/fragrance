import { Router } from 'express';
import { getPerfumes, getPerfumeById, getPerfumeByName } from '../controllers/perfumesController.js';

const router = Router();

router.get('/', getPerfumes);
router.get('/:id', getPerfumeById);
router.get('/search/:name', getPerfumeByName);

export default router;