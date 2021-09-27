import categoryRouter from './categoryRouter';
import productRouter from './productRouter';
import userRouter from './userRouter';
import express from 'express';
const routes = express.Router();

routes.use('/categories', categoryRouter);
routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.get('/',(req,res) => {
  res.send('Hello world');
});

export default routes;