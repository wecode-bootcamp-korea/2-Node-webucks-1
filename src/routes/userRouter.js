import express from 'express';
import { userController } from '../controllers';
const router = express.Router();

router.get('/', userController.getUser);
router.post('/new-user', userController.setUser);

export default router;
