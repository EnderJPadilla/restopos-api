import pool from '../config/database.js';

export const getValidateUserForAuth = async (usuario) => {

  if (!usuario) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT * FROM sp_validate_user_name($1)',
      [usuario]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return rows[0] || null;
  } catch (error) {
    // Error lanzado explícitamente desde PostgreSQL
    if (error.code === 'P0001') {
      // Ej: EMPRESA_NO_EXISTE_O_INACTIVA
      throw new Error(error.message);
    }

    // Error de conexión o sintaxis
    if (error.code?.startsWith('08')) {
      throw new Error('ERROR_CONEXION_BD');
    }

    // Error genérico
    throw new Error(error);
  }
};


export const getUserForAuth = async (usuario) => {

  // if (!usuario || !empresaId) {
  if (!usuario) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      // 'SELECT * FROM sp_outh($1, $2)',
      'SELECT fn_auth_login($1) AS response',
      [usuario]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return rows[0] || null;
  } catch (error) {
    // Error lanzado explícitamente desde PostgreSQL
    if (error.code === 'P0001') {
      // Ej: EMPRESA_NO_EXISTE_O_INACTIVA
      throw new Error(error.message);
    }

    // Error de conexión o sintaxis
    if (error.code?.startsWith('08')) {
      throw new Error('ERROR_CONEXION_BD');
    }

    // Error genérico
    throw new Error(error);
  }
};


export const getPasswordForUser = async (empresa_id, idUsuario, password) => {

  if (!idUsuario || !empresa_id || !password) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      // 'SELECT * FROM sp_outh($1, $2)',
      'SELECT fn_cambiar_password_usuario($1, $2, $3) AS response',
      [empresa_id, idUsuario, password]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return rows[0] || null;
  } catch (error) {
    // Error lanzado explícitamente desde PostgreSQL
    if (error.code === 'P0001') {
      // Ej: EMPRESA_NO_EXISTE_O_INACTIVA
      throw new Error(error.message);
    }

    // Error de conexión o sintaxis
    if (error.code?.startsWith('08')) {
      throw new Error('ERROR_CONEXION_BD');
    }

    // Error genérico
    throw new Error(error);
  }
};

export const logoutUser = async (usuario, empresaId, refreshToken) => {

  if (!usuario || !empresaId || !refreshToken) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'CALL sp_logout_usuario($1, $2, $3, NULL);',
      [usuario, empresaId, refreshToken]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return true;
    
  } catch (error) {
    // Error lanzado explícitamente desde PostgreSQL
    if (error.code === 'P0001') {
      // Ej: EMPRESA_NO_EXISTE_O_INACTIVA
      throw new Error(error.message);
    }

    // Error de conexión o sintaxis
    if (error.code?.startsWith('08')) {
      throw new Error('ERROR_CONEXION_BD');
    }

    // Error genérico
    throw new Error(error);
  }
};


export const registrarLoginFallido = async (empresaId, usuario) => {

  if (!usuario || !empresaId) {
    throw new Error('PARÁMETROS_INVALIDOS en registrarLoginFallido()');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT fn_auth_login_fallido($1, $2) AS response;',
      [empresaId, usuario]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return rows[0] || null;
    
  } catch (error) {
    // Error lanzado explícitamente desde PostgreSQL
    if (error.code === 'P0001') {
      // Ej: EMPRESA_NO_EXISTE_O_INACTIVA
      throw new Error('P0001', error.message);
    }

    // Error de conexión o sintaxis
    if (error.code?.startsWith('08')) {
      throw new Error('08', 'ERROR_CONEXION_BD');
    }

    // Error genérico
    throw new Error('Error generico', error);
  }
}


export const registrarLoginExitoso = async (empresaId, usuario) => {

  if (!usuario || !empresaId) {
    throw new Error('PARÁMETROS_INVALIDOS en registrarLoginExitoso()');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT fn_auth_login_exitoso($1, $2) AS response;',
      [empresaId, usuario]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return rows[0] || null;
    
  } catch (error) {
    // Error lanzado explícitamente desde PostgreSQL
    if (error.code === 'P0001') {
      // Ej: EMPRESA_NO_EXISTE_O_INACTIVA
      throw new Error(error.message);
    }

    // Error de conexión o sintaxis
    if (error.code?.startsWith('08')) {
      throw new Error('ERROR_CONEXION_BD');
    }

    // Error genérico
    throw new Error(error);
  }
}


export const registrarIntento = async (
  usuario, empresaId, username, exitoso, motivo, ip, userAgent
) => {

  if (!usuario || !empresaId || !username || !motivo || !ip || !userAgent) {
    throw new Error('PARÁMETROS_INVALIDOS en registrarIntento()');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT fn_auth_registrar_intento($1, $2, $3, $4, $5, $6, $7) AS response;',
      [usuario, empresaId, username, ip, userAgent, exitoso, motivo]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return rows[0] || null;
    
  } catch (error) {
    // Error lanzado explícitamente desde PostgreSQL
    if (error.code === 'P0001') {
      // Ej: EMPRESA_NO_EXISTE_O_INACTIVA
      throw new Error(error.message);
    }

    // Error de conexión o sintaxis
    if (error.code?.startsWith('08')) {
      throw new Error('ERROR_CONEXION_BD');
    }

    // Error genérico
    throw new Error(error);
  }
}
