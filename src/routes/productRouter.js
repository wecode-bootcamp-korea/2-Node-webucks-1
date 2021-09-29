import express from 'express';
import {
  getCategories,
  getProduct,
  getProducts,
  createLike,
  deleteLike,
} from '../controllers/product';
import { onlyForLoginAndActiveUser } from '../middleWares/authMiddleWare';
import { errorCatcher } from '../middleWares/errorMiddleWare';

const router = express();

router.get('/', errorCatcher(getProducts));
router.get('/categories', errorCatcher(getCategories));
router.get('/:id', errorCatcher(getProduct));

router
  .all(onlyForLoginAndActiveUser)
  .post('/:id/like', errorCatcher(createLike))
  .delete('/:id/like', errorCatcher(deleteLike));

export default router;
