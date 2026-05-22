import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getPaises, getDepartamentos, getCiudades } from '../controllers/location.controller.js';

const router = Router();

router.post('/paises', authMiddleware, getPaises);
router.post('/departamentos', authMiddleware, getDepartamentos);
router.post('/ciudades', authMiddleware, getCiudades);

export default router;