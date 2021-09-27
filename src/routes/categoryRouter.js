import express from 'express';
import categoryController from '../controllers/categoryController';

const routes = express.Router();

routes.get('/', categoryController.getCategory);

export default routes;
