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


// export const getUserForAuth = async (usuario, empresaId) => {
export const getUserForAuth = async (usuario) => {

  // if (!usuario || !empresaId) {
  if (!usuario) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      // 'SELECT * FROM sp_outh($1, $2)',
      'SELECT * FROM sp_outh($1)',
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
