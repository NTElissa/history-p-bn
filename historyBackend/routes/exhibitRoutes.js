import express from 'express';
import {
  createExhibit,
  getExhibits,
  getExhibitById,
  updateExhibit,
  deleteExhibit
} from '../controllers/exhibitController.js';

const router = express.Router();

router.get('/', getExhibits);
router.get('/:id', getExhibitById);
router.post('/', createExhibit);
router.put('/:id', updateExhibit);
router.delete('/:id', deleteExhibit);

export default router;
