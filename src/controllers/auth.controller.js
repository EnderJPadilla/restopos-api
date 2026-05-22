import bcrypt from 'bcrypt';
import { getValidateUserForAuth, getUserForAuth, logoutUser } from '../services/auth.service.js';
import {
  generateAccessToken,
  generateRefreshToken,
  storeRefreshToken,
  validateRefreshTokenBD
} from '../auth/token.service.js';

export const validateUser = async (req, res) => {
  const { usuario } = req.body;

  console.log('Ejecutando Validación de usuario.');
  console.log('----------------------------------------');

  try {
    if (!usuario) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const user = await getValidateUserForAuth(usuario);

    if (!user) {
      return res.status(401).json({
        authenticated: false,
        message: 'Usuario invalido.',
      });
    }

    return res.json({
      authenticated: true,
      usuario: {
        usuario_id: user.usuario_id,
        nombre_usuario: user.nombre_usuario,
        empresa_id: user.empresa_id,
        empresa: user.empresa
      },
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const login = async (req, res) => {
  const { usuario, password, empresa_id } = req.body;

  console.log('Ejecutando login.');
  console.log('----------------------------------------');
  // console.log(`Usuario: ${usuario} - Password: ${password} - empresa_id: ${empresa_id}`);
  try {
    if (!usuario || !password || !empresa_id) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const user = await getUserForAuth(usuario, empresa_id);

    if (!user) {
      return res.status(401).json({
        message: 'Credenciales inválidas',
      });
    }

    const isValid = await bcrypt.compare(
      password,
      user.contrasena
    );

    if (!isValid) {
      return res.status(401).json({
        message: 'Credenciales inválidas',
      });
    }

    // Aquí generar JWT
    const payload = {
      user_id: user.usuario_id,
      empresa_id: user.empresa_id,
      estado: user.estado,
      rol: user.rol,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await storeRefreshToken(
      user.usuario_id,
      user.empresa_id,
      accessToken,
      refreshToken
    );

    return res.json({
      authenticated: true,
      accessToken,
      refreshToken,
      usuario: {
        usuario_id: user.usuario_id,
        empresa_id: user.empresa_id,
        nombre_usuario: user.nombre_usuario,
        nombres: user.nombres,
        apellidos: user.apellidos,
        nombre_completo: user.nombre_completo,
        rol: user.rol
      },
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const refreshToken = async (req, res) => {
  const { refresh_token } = req.body;

  console.log('Ejecutando refresh token.');
  console.log('----------------------------------------');

  const data = await validateRefreshTokenBD(refresh_token);

  if (!data || data === null) {
    return res.status(401).json({ message: 'Refresh inválido' });
  }

  const newAccessToken = generateAccessToken({
    user_id: data.usuario_id,
    empresa_id: data.empresa_id,
    estado: data.estado,
    rol: data.rol,
  });

  res.json({ accessToken: newAccessToken });
};


export const logout = async (req, res) => {
  const { usuario, empresa_id, accessToken, refreshToken } = req.body;

  console.log('Ejecutando Logout de usuario.');
  console.log('----------------------------------------');
  // console.log(`Usuario: ${usuario} - empresa_id: ${empresa_id} - accessToken: ${accessToken} - refreshToken: ${refreshToken}`);
  // console.log('----------------------------------------');

  try {
    if (!usuario || !empresa_id || !refreshToken) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const validate = await logoutUser(usuario, empresa_id, refreshToken);

    if (!validate) {
      return res.status(401).json({
        logoutSession: false,
        message: 'Error al cerrar sesión.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Sesión cerrada correctamente',
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};