import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/auth';

import { productController } from '../controllers';

router.get('/', productController.getProduct);
router.get('/:id', productController.getProductOne);
router.get('/:id/like', authMiddleware, productController.likeProduct);

export default router;
