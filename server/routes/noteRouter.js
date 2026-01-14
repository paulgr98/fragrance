import { Router } from 'express';
import { getAllNotes, getNoteById, getNoteByName } from '../controllers/noteController.js';

const router = Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.get('/search/:name', getNoteByName);

export default router;