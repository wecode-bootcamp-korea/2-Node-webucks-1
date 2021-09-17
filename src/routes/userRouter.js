import express from 'express';
import userController from '../controllers/userController';
const router = express.Router();

router.get('/', userController.getUser);
router.post('/new-user', userController.setUsers);

export default router;
