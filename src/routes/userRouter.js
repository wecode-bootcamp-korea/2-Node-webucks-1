import express from 'express';
import {
  hardDeleteController,
  joinUser,
  loginUser,
  softDeleteController,
} from '../controllers/userController';
import { onlyForManager } from '../middleWares/authMiddleWare';

const router = express();
router.delete('/hard-delete', onlyForManager, hardDeleteController);
router.put('/soft-delete', onlyForManager, softDeleteController);
router.post('/join', joinUser);
router.post('/login', loginUser);

export default router;
