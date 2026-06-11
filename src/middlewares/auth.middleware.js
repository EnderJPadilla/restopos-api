import jwt from 'jsonwebtoken';
import { validateTokenBD } from '../services/token.service.js';

export const authMiddleware = async (req, res, next) => {

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Token no enviado'
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }

    //------------------------------------------------
    // VALIDACIÓN LOCAL JWT
    //------------------------------------------------
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //------------------------------------------------
    // VALIDACIÓN BD
    //------------------------------------------------
    const valido = await validateTokenBD(
      decoded.user_id,
      decoded.empresa_id,
      token
    );

    if (!valido) {
      return res.status(401).json({
        success: false,
        message: 'Sesión no válida'
      });
    }

    //------------------------------------------------
    // USER CONTEXT
    //------------------------------------------------
    req.user = {
      id: decoded.user_id,
      empresa_id: decoded.empresa_id,
      estado: decoded.estado,
      role: decoded.role
    };

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }

};