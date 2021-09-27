import express from 'express';
import {
  createComment,
  createCommentlike,
  createRecomment,
  deleteComment,
  deleteCommentLike,
  updateComment,
} from '../controllers/commentControllers';

const router = express();

router.post('/:coffeeId/create', createComment);
router.put('/:id/update', updateComment);
router.delete('/:id/delete', deleteComment);
router.post('/:id/like', createCommentlike);
router.delete('/:id/dislike', deleteCommentLike);
export default router;
