import express from 'express';
import productController from '../controllers/productController';
const routes = express.Router();

routes.get('/', productController.getProduct);
routes.get('/:id', productController.getProductOne);

export default routes;
