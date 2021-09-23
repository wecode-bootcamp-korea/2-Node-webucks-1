import express from 'express';
import {
  createComment,
  deleteComment,
  updateComment,
} from '../controllers/commentControllers';
import { authMiddleWare } from '../middleWares/authMiddleWare';

const router = express();

router.post('/create', authMiddleWare, createComment);
router.put('/:id/update', authMiddleWare, updateComment);
router.delete('/:id/delete', authMiddleWare, deleteComment);

export default router;
