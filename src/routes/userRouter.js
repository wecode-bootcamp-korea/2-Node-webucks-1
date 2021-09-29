import express from 'express';
import validateToken from '../middlewares/validateToken';
import { userController } from '../controllers';

const router = express.Router();

router.get('/', validateToken, userController.getUsers);
router.post('/login', userController.loginUser);
router.post('/', userController.createUser);
router.delete('/', validateToken, userController.deleteUser);

export default router;
