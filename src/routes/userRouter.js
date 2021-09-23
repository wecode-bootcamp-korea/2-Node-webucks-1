import express from 'express';
const router = express.Router();

import { userController } from '../controllers';

router.get('/', userController.getUser);
router.post('/new-user', userController.createUser);

export default router;
