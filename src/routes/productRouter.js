import express from 'express';
const router = express.Router();

import { productController } from '../controllers';

router.get('/', productController.getProduct);
router.get('/:id', productController.getProductOne);

export default router;
