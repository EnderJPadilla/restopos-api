import { Router } from 'express';
import { validateUser, login, refreshToken, logout } from '../controllers/auth.controller.js';

const router = Router();

router.post('/validate_user', validateUser);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);

export default router;
