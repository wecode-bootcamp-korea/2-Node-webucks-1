import express from 'express';
import productController from '../controllers/productController';
const router = express.Router();

router.get('/', productController.getProduct);
router.get('/:id', productController.getProductOne);

export default router;
