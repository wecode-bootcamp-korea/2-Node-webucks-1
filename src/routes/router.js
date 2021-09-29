import express from 'express';
import categoryRouter from './categoryRouter';
import userRouter from './userRouter';
import productRouter from './productRouter';

const router = express.Router();
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);

export default router;
