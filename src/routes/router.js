import express from 'express';

import categoryRouter from './categoryRouter';
import productRouter from './productRouter';
import userRouter from './userRouter';
import { indexController } from '../controllers/index';
const router = express.Router();

router.get('/', indexController.getHome);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);

export default router;
