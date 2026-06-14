import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getValidateUserForAuth, getPasswordForUser, getUserForAuth, logoutUser, registrarLoginExitoso, registrarLoginFallido, registrarIntento } from '../services/auth.service.js';
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
      return res.json({
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
  const { usuario, password } = req.body;

  console.log('Ejecutando login.');
  console.log('----------------------------------------');
  
  try {
    if (!usuario || !password) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const datos = await getUserForAuth(usuario);
    const user = datos.response;
    const userAgent = req.get("User-Agent");
    const ip =req.ip;

    console.log('User: ', user);

    if (!user.success) {
      if (user.message != 'Usuario no existe.') {
        await registrarIntento(
          user.data.id,
          user.data.empresa_id,
          user.data.username,
          false,
          user.message,
          ip,
          userAgent
        );
      }

      return res.json(
        user,
      );
    }

    const isValid = await bcrypt.compare(
      password,
      user.data.password_hash
    );

    if (!isValid) {
      const datos = await registrarLoginFallido(
        user.data.empresa_id,
        user.data.id
      );
      const datosLoginFallido = datos.response;

      await registrarIntento(
        user.data.id,
        user.data.empresa_id,
        user.data.username,
        false,
        "Contraseña incorrecta",
        ip,
        userAgent
      );

      
      
      console.log("----------------------------------------");
      console.log("datosLoginFallido", datosLoginFallido);
      console.log("----------------------------------------");

      if (datosLoginFallido.bloqueado) {
        return res.json({
          message: datosLoginFallido.message,
          bloqueado: 
            datosLoginFallido.bloqueado 
            ? datosLoginFallido.bloqueado
            : false,
          fecha_desbloqueo : 
            datosLoginFallido.fecha_desbloqueo 
              ? datosLoginFallido.fecha_desbloqueo
              : null
        });

      }else {
        return res.json({
          message: 'Credenciales inválidas. ' + datosLoginFallido.message
        });
      }
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

    await registrarLoginExitoso(
      user.data.empresa_id,
      user.data.id
    );
    await registrarIntento(
      user.data.id,
      user.data.empresa_id,
      user.data.username,
      true,
      "OK",
      ip,
      userAgent
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
        avatar: user.data.avatar,
        role: user.data.role,
        requirePasswordChange: user.data.requirePasswordChange,
        password: password
      },
    });

  } catch (error) {
    console.error("error en login principal login(): ", error.message);
    console.log('----------------------------------------');
    return res.json({
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
      return res.json(
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
      return res.json({
        success: false,
        message: 'Token no enviado'
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.json({
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
      return res.json({
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
    return res.json({ message: 'Refresh inválido' });
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
      return res.json({
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