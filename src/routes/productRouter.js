import express from 'express';
import validateToken from '../middlewares/validateToken';
import { productController } from '../controllers';

const router = express.Router();

router.get('/', validateToken, productController.getProducts);
router.get('/:id', validateToken, productController.getProduct);
router.get('/:id/like', validateToken, productController.likeProduct);
router.post('/:id/comment', validateToken, productController.commentProduct);
router.put(
  '/:id/comment',
  validateToken,
  productController.updateCommentProduct
);
router.delete(
  '/:id/comment',
  validateToken,
  productController.deleteCommentProduct
);

export default router;
