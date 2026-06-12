import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getValidateUserForAuth, getPasswordForUser, getUserForAuth, logoutUser } from '../services/auth.service.js';
import {
  generateAccessToken,
  generateRefreshToken,
  validateTokenBD,
  storeRefreshToken,
  validateRefreshTokenBD
} from '../services/token.service.js';

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
  // const { usuario, password, empresa_id } = req.body;
  const { usuario, password } = req.body;

  console.log('Ejecutando login.');
  console.log('----------------------------------------');
  // console.log(`Usuario: ${usuario} - Password: ${password} - empresa_id: ${empresa_id}`);
  try {
    // if (!usuario || !password || !empresa_id) {
    if (!usuario || !password) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    // const user = await getUserForAuth(usuario, empresa_id);
    const datos = await getUserForAuth(usuario);
    const user = datos.response;

    // console.log('User: ', user);

    if (!user.success) {
      return res.status(401).json(
        user,
      );
    }

    const isValid = await bcrypt.compare(
      password,
      user.data.password_hash
    );

    if (!isValid) {
      return res.status(401).json({
        message: 'Credenciales inválidas',
      });
    }

    // Aquí generar JWT
    const payload = {
      user_id: user.data.id,
      empresa_id: user.data.empresa_id,
      rol: user.data.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await storeRefreshToken(
      user.data.id,
      user.data.empresa_id,
      accessToken,
      refreshToken
    );

    return res.json({
      authenticated: true,
      accessToken,
      refreshToken,
      usuario: {
        id: user.data.id,
        empresa_id: user.data.empresa_id,
        username: user.data.username,
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        name: user.data.name,
        role: user.data.role,
        requirePasswordChange: user.data.requirePasswordChange,
        password: password
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

export const cambiarPassword = async (req, res) => {
  const { password } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  console.log('Ejecutando Cambio de contraseña.');
  console.log('----------------------------------------');
  
  try {
    if (!idUsuario || !password || !empresa_id) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    // Encriptar contraseña
    const saltRounds = 12; // recomendado entre 10-14
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const datos = await getPasswordForUser(empresa_id, idUsuario, passwordHash);

    // console.log('Datos: ', datos);

    if (!datos.response.success) {
      return res.status(401).json(
        datos.response
      );
    }

    console.log('Contraseña actualizada.');
    console.log('----------------------------------------');
    
    return res.json(
      datos.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const tokenSesion = async (req, res) => {

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
    console.log('Validando Token de sesión en base de datos...');
    // console.log('----------------------------------------');
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

    console.log('Token válido. Usuario autenticado.');
    console.log('----------------------------------------');

    //------------------------------------------------
    // USER CONTEXT
    //------------------------------------------------
    req.user = {
      id: decoded.user_id,
      empresa_id: decoded.empresa_id,
      estado: decoded.estado,
      role: decoded.rol
    };

    return res.json({
      success: true,
      message: 'Token válido',
      user: req.user
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
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