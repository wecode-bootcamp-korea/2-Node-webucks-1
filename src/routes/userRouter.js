import express from 'express';
import { userController } from '../controllers';
const router = express.Router();

router.get('/', userController.getUser);
router.post('/login', userController.login);
router.post('/', userController.makeUser);
router.post('/like', userController.updateProductLike);

export default router;
