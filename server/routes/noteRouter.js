import { Router } from 'express';
import { getAllNotes, getNoteById } from '../controllers/noteController.js';

const router = Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);

export default router;