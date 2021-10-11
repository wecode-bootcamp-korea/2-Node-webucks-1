import express from 'express';
import { productController } from '../controllers';
import { decodeToken } from '../middlewares/decodeToken';
const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/:id/comment', decodeToken, productController.insertComment);

export default router;
