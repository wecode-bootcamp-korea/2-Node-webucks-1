import express from 'express';
const router = express.Router();

import categoryRouter from './categoryRouter';
import productRouter from './productRouter';
import userRouter from './userRouter';

router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);

export default router;
