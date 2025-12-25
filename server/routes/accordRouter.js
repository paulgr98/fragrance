import { Router } from 'express';
import { getAllAccords, getAccordById } from '../controllers/accordController.js';

const router = Router();

router.get('/', getAllAccords);
router.get('/:id', getAccordById);

export default router;