import express from 'express';
import {
  getCategories,
  getProduct,
  getProducts,
  createLike,
  deleteLike,
} from '../controllers/productControllers';
import { authMiddleWare } from '../middleWares/authMiddleWare';

const router = express();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/categories', getCategories);
router.post('/:id/like', authMiddleWare, createLike);
router.delete('/:id/dislike', authMiddleWare, deleteLike);

export default router;
