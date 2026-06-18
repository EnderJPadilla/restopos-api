import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { newBooking, getBookings } from '../controllers/booking.controller.js';

const router = Router();

router.post('/listar_reservas', authMiddleware, getBookings);
router.post('/nueva_reserva', authMiddleware, newBooking);

export default router;
