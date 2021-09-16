import express from 'express';
import {
  joinController,
  loginControllser,
} from '../controllers/userController';

const userRouter = express();
userRouter.post('/join', joinController);
userRouter.post('/login', loginControllser);

export default userRouter;
