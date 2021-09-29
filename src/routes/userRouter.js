import express from 'express';
import {
  hardDeleteController,
  join,
  login,
  softDeleteController,
} from '../controllers/userController';
import { onlyForManager } from '../middleWares/authMiddleWare';

const router = express();
router.post('/join', join);
router.post('/login', login);
router.put('/:id', onlyForManager, softDeleteController);
router.delete('/:id', onlyForManager, hardDeleteController);

export default router;
