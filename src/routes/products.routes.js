import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getProductos, newProductos, productoDisponible, uploadProductos, deleteProductos } from '../controllers/produts.controller.js';

const router = Router();

router.post('/listar_productos', authMiddleware, getProductos);
router.post('/nuevo_producto', authMiddleware, newProductos);
router.put('/producto_disponible', authMiddleware, productoDisponible);
router.put('/actualizar_producto', authMiddleware, uploadProductos);
router.delete('/eliminar_producto', authMiddleware, deleteProductos);

export default router;
