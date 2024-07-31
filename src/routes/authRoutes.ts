import express from 'express';
import { register, login } from '../controllers/authController';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;