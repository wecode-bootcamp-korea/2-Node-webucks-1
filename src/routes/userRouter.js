import express from 'express';
import {
  joinController,
  loginControllser,
} from '../controllers/userController';

const router = express();
router.post('/join', joinController);
router.post('/login', loginControllser);

export default router;
