import express from 'express';
import {
  hardDeleteController,
  join,
  login,
  softDeleteController,
} from '../controllers/userController';
import { onlyForManager } from '../middleWares/authMiddleWare';
import { errorCatcher } from '../middleWares/errorMiddleWare';

const router = express();
router.post('/join', errorCatcher(join));
router.post('/login', errorCatcher(login));
router.put('/:id', onlyForManager, softDeleteController);
router.delete('/:id', onlyForManager, hardDeleteController);

export default router;
