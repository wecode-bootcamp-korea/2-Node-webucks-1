import express from 'express';
import {
  joinController,
  loginControllser,
} from '../controllers/userControllers';

const router = express();
router.post('/join', joinController);
router.post('/login', loginControllser);

export default router;
