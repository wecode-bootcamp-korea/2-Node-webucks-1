import express from 'express';
import productController from '../controllers/productController';
const routes = express.Router();

routes.get('/', productController.getAllProducts);
routes.get('/:id', productController.getProduct);

export default routes;
