import express from 'express';
import {
  hardDeleteController,
  joinController,
  loginControllser,
  softDeleteController,
} from '../controllers/userControllers';
import { onlyForManager } from '../middleWares/authMiddleWare';

const router = express();
router.delete('/hard-delete', onlyForManager, hardDeleteController);
router.put('/soft-delete', onlyForManager, softDeleteController);
router.post('/join', joinController);
router.post('/login', loginControllser);

export default router;
