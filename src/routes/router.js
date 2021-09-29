import express from 'express';

import categoryRouter from './categoryRouter';
import productRouter from './productRouter';
import userRouter from './userRouter';
import indexRouter from './indexRouter';

const router = express.Router();

router.use('/', indexRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);

export default router;
