import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getUsuarios, newUsuario, validateName, usuarioActivo, uploadUsuario, deleteUsuario } from '../controllers/users.controller.js';

const router = Router();

router.post('/listar_usuarios', authMiddleware, getUsuarios);
router.post('/nuevo_usuario', authMiddleware, newUsuario);
router.post('/validar_nombre_usuario', authMiddleware, validateName);
router.put('/usuario_activo', authMiddleware, usuarioActivo);
router.put('/actualizar_usuario', authMiddleware, uploadUsuario);
router.delete('/eliminar_usuario', authMiddleware, deleteUsuario);

export default router;
