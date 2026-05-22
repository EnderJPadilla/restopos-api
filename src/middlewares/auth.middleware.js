import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

export const authMiddleware = async (req, res, next) => {
  try {
    console.log('Ejecutando Middleware de autenticación.');
    console.log('----------------------------------------');

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ message: 'Token no enviado' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Verificar JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log('Token verificado. Usuario ID:', decoded.user_id, 'Empresa ID:', decoded.empresa_id);
    console.log('Validando token en base de datos.');
    console.log('----------------------------------------');


    // (Opcional fuerte) validar refresh token activo en BD
    const { rows } = await pool.query(
      'SELECT sp_validate_access_token($1, $2, $3) AS valido',
      [decoded.user_id, decoded.empresa_id, token]
    );

    // console.log('Resultado validación en BD:', rows[0].valido);
    console.log('Resultado validación en BD:', rows[0]);
    console.log('----------------------------------------');

    if (!rows[0].valido) {
      return res.status(401).json({ message: 'Sesión no válida' });
    }

    // Inyectar usuario al request
    req.user = {
      id: decoded.user_id,
      empresa_id: decoded.empresa_id,
      estado: decoded.estado,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error('Auth error:', error.message);

    return res.status(401).json({
      message: 'Token inválido o expirado',
    });
  }
};

