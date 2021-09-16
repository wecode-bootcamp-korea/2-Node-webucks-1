import express from 'express';
import { joinController } from '../controllers/userController';

const userRouter = express();
userRouter.post('/join', joinController);

export default userRouter;
