import express from 'express';
import userController from '../controllers/userController';
const routes = express.Router();

routes.get('/', userController.getUser);
routes.post('/', userController.creatUser);

export default routes;
