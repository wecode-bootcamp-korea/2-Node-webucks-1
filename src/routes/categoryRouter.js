import express from 'express';
import { categoryController } from '../controllers';
const router = express.Router();

// console.log(categoryController);

router.get('/', categoryController.getCategory);
router.post('/fix', categoryController.setCategory);

export default router;
