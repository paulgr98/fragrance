import { Router } from 'express';
import { getAllAccords, getAccordById, getAccordByName } from '../controllers/accordController.js';

const router = Router();

router.get('/', getAllAccords);
router.get('/:id', getAccordById);
router.get('/search/:name', getAccordByName);

export default router;