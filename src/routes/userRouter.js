import express from 'express';
import userController from '../controllers/userController';
const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.login);

export default router;
