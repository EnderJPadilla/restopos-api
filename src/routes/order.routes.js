import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { newOrder,
  // getTables, newTable, validateNumber, validateName, tableActivo, uploadTable, deleteTable 
} from '../controllers/order.controller.js';

const router = Router();

// router.post('/listar_mesas', authMiddleware, getTables);
router.post('/guardar_pedidos', authMiddleware, newOrder);
// router.post('/validar_numero_mesa', authMiddleware, validateNumber);
// router.post('/validar_nombre_mesa', authMiddleware, validateName);
// router.put('/mesa_activa', authMiddleware, tableActivo);
// router.put('/actualizar_mesa', authMiddleware, uploadTable);
// router.delete('/eliminar_mesa', authMiddleware, deleteTable);

export default router;
