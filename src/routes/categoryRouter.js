import express from 'express';
const router = express.Router();

import { categoryController } from '../controllers';

router.get('/', categoryController.getCategory);
router.post('/new-category', categoryController.setCategory);

export default router;
