import express from 'express';
import {
  getCategories,
  getProduct,
  getProducts,
} from '../controllers/productController';

const productRouter = express();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProduct);
productRouter.get('/categories', getCategories);

export default productRouter;
