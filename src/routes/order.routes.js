import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { newOrder, getOrderDetails, getOrders, uploadOrderItems } from '../controllers/order.controller.js';

const router = Router();

router.post('/listar_pedidos', authMiddleware, getOrders);
router.post('/pedido_detalle', authMiddleware, getOrderDetails);
router.post('/nuevo_pedido', authMiddleware, newOrder);
router.put('/actualizar_detalle_pedido', authMiddleware, uploadOrderItems);

export default router;
