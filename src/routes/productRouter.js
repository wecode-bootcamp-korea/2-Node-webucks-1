import express from 'express';
import {
  getCategories,
  getProduct,
  getProducts,
  createLike,
  deleteLike,
} from '../controllers/product';
import { onlyForLoginAndActiveUser } from '../middleWares/authMiddleWare';

const router = express();

router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProduct);
router.post('/:id/like', onlyForLoginAndActiveUser, createLike);
router.delete('/:id/dislike', onlyForLoginAndActiveUser, deleteLike);

export default router;
