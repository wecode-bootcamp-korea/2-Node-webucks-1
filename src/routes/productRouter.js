import express from 'express';
import productController from '../controllers/productController'; // 라우터는 ~Controller에만 의존
const router = express.Router();

router.get('/', productController.getProduct);
router.post('/fix_product', productController.setProduct);

export default productRouter;
