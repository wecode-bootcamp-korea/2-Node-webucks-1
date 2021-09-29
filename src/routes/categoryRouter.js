import express from 'express';
import categoryController from '../controllers/categoryController';
const router = express.Router();

router.post('/', categoryController.createCategory);

export default router;
