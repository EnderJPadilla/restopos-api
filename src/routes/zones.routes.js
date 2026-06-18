import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getZones, newZone, validateNumber, validateName, ZonaActivo, uploadZone, deleteZone } from '../controllers/zones.controller.js';

const router = Router();

router.post('/listar_zonas', authMiddleware, getZones);
router.post('/nueva_zona', authMiddleware, newZone);
router.post('/validar_numero_zona', authMiddleware, validateNumber);
router.post('/validar_nombre_zona', authMiddleware, validateName);
router.put('/zona_activa', authMiddleware, ZonaActivo);
router.put('/actualizar_zona', authMiddleware, uploadZone);
router.delete('/eliminar_zona', authMiddleware, deleteZone);

export default router;
