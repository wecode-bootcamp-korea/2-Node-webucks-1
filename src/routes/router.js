import express from 'express';
import categoryRouter from './categoryRouter';
import userRouter from './userRouter';
import productRouter from './productRouter';
import nextLevel from '../controllers/indexController';

const router = express.Router();
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);
router.get('/', nextLevel);

export default router;
