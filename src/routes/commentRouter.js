import express from 'express';
import {
  createComment,
  createCommentlike,
  deleteComment,
  deleteCommentLike,
  updateComment,
} from '../controllers/comment';

const router = express();

router.post('/:id/like', createCommentlike);
router.delete('/:id/like', deleteCommentLike);

router.delete('/:id', deleteComment);
router.put('/:id', updateComment);
router.post('/:coffeeId', createComment);
export default router;
