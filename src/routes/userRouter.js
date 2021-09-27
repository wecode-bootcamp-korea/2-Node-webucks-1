import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/auth';

import { userController } from '../controllers';

router.get('/', userController.getUser);
router.post('/login', userController.logInUser);
router.post('/signup', userController.createUser);
router.get('/check', authMiddleware, userController.checkUser);

export default router;
