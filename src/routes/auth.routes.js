import { Router } from 'express';
import { validateUser, login, cambiarPassword, tokenSesion, refreshToken, logout } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/validate_user', validateUser);
router.post('/validar_token', tokenSesion);
router.post('/login', login);
router.put('/cambiar_password', authMiddleware, cambiarPassword);
router.post('/logout', logout);
router.post('/refresh', refreshToken);

export default router;
