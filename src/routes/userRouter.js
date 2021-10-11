import express from 'express';
import { userController } from '../controllers';
import { decodeToken } from '../middlewares/decodeToken';
const router = express.Router();

router.get('/', userController.getUser);
router.post('/login', userController.login);
router.post('/', userController.makeUser);
router.post('/like', decodeToken, userController.updateProductLike);

// router.post('/signUp', userController.login);

export default router;
