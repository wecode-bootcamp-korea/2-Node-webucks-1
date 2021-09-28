import express from 'express';
import { categoryController } from '../controllers';

const router = express.Router();

router.get('/', categoryController.getCategory);
router.post('/createCategory', categoryController.createCategory);

export default router;
