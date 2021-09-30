import express from 'express';
const router = express.Router();

import userRouter from './userRouter';
import categoryRouter from './categoryRouter';
import productRouter from './productRouter';

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);

export default router;
