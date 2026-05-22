import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getCategories, newCategory, validateName, categoryActivo, uploadCategory, deleteCategory } from '../controllers/categories.controller.js';

const router = Router();

router.post('/listar_categorias', authMiddleware, getCategories);
router.post('/nueva_categoria', authMiddleware, newCategory);
router.post('/validar_nombre_categoria', authMiddleware, validateName);
router.put('/categoria_activa', authMiddleware, categoryActivo);
router.put('/actualizar_categoria', authMiddleware, uploadCategory);
router.delete('/eliminar_categoria', authMiddleware, deleteCategory);

export default router;
