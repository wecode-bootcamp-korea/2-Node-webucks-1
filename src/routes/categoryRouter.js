import express from 'express';
import { categoryController } from '../controllers';
const router = express.Router();
// const { categoryController } = controller;

router.get('/', categoryController.getCategory);
router.post('/new-category', categoryController.setCategory);

export default router;
