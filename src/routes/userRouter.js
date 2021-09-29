import express from 'express';
import { userController } from '../controllers'; // 라우터는 ~Controller에만 의존
const router = express.Router();

router.get('/', userController.getUser);
router.post('/login', userController.logInUser);
router.post('/signup', userController.setUser);

export default router;
