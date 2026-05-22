import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getSettings, uploadSettings } from '../controllers/settings.controller.js';

const router = Router();

router.post('/listar_configuraciones', authMiddleware, getSettings);
router.put('/actualizar_configuraciones', authMiddleware, uploadSettings);

export default router;
