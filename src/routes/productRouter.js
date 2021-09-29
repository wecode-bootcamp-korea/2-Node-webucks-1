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

router
  .all(onlyForLoginAndActiveUser)
  .post('/:id/like', createLike)
  .delete('/:id/like', deleteLike);

export default router;
