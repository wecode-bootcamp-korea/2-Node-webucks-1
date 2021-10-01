import express from 'express';
import userController from '../controllers/userController';
const routes = express.Router();

routes.get('/', userController.getUsers);
routes.post('/signup', userController.creatUser);
routes.post('/login', userController.loginUser);

export default routes;
