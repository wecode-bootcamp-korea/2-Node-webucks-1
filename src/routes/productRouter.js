import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/auth';

import { productController } from '../controllers';

router.get('/', productController.getProduct);
router.get('/:id', productController.getProductOne);
router.get('/:id/like', authMiddleware, productController.likeProduct);
router.post('/:id/comment', authMiddleware, productController.commentProduct);
router.post(
  '/:id/comment/u',
  authMiddleware,
  productController.updateCommentProduct
);
router.get(
  '/:id/comment/d',
  authMiddleware,
  productController.deleteCommentProduct
);

export default router;
