import express from 'express';
import categoryController from '../controllers/categoryController';
const router = express.Router();

router.get('/', categoryController.getCategory);
router.post('/new-category', categoryController.setCategory);

export default router;