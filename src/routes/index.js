import commentRouter from './commentRouter';
import productRouter from './productRouter';
import userRouter from './userRouter';
import express from 'express';
import { authMiddleWare } from '../middleWares/authMiddleWare';

const router = express.Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/comments', authMiddleWare, commentRouter);

export default router;
