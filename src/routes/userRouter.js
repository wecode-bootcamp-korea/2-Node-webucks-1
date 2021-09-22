import express from 'express';
import userController from '../controllers/userController'; // 라우터는 ~Controller에만 의존
const router = express.Router();

router.get('/', userController.getUser);
router.post('/fix_user', userController.setUser);

export default userRouter;
