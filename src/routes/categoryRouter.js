import express from 'express';
import categoryController from '../controllers/categoryController'; // 라우터는 categoryController에만 의존
const router = express.Router();

router.get('/', categoryController.getCategory);
router.post('/fix_category', categoryController.setCategory);

export default categoryRouter;
