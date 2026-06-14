import pool from '../config/database.js';

export const getMesas = async (idEmpresa) => {

  if (!idEmpresa) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT fn_mesa_listar($1) AS response',
      [idEmpresa]
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

export const newMesa = async (idEmpresa, idUsuario, dataMesa) => {

  if (!idEmpresa || !idUsuario || !dataMesa) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT fn_mesa_guardar($1, $2, $3) AS response',
      [idEmpresa, idUsuario, dataMesa]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return rows[0] || null;
  } catch (error) {
    console.log('Error al crear mesa:', error);
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

export const validarNumero = async (idEmpresa, tableNumber) => {

  if (!idEmpresa || tableNumber == null) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT * FROM sp_validate_table_number($1, $2) AS data',
      [idEmpresa, tableNumber]
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

export const validarNombre = async (idEmpresa, tableName) => {

  if (!idEmpresa || tableName == null) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT * FROM sp_validate_table_name($1, $2) AS data',
      [idEmpresa, tableName]
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

export const activeMesa = async (idEmpresa, idUsuario, mesa_id, activo) => {

  if (!idEmpresa || !idUsuario || !mesa_id || activo === undefined) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT sp_mesa_activo($1, $2, $3, $4) AS response',
      [idEmpresa, idUsuario, mesa_id, activo]
    );

    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }
    return rows[0] || null;

  } catch (error) {
    console.log('Error al (In)activar mesa:', error);
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

export const updateMesa = async (idEmpresa, idUsuario, dataMesa) => {

  if (!idEmpresa || !idUsuario || !dataMesa) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT fn_mesa_actualizar($1, $2, $3) AS response',
      [idEmpresa, idUsuario, dataMesa]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return rows[0] || null;
  } catch (error) {
    console.log('Error al actualizar mesa:', error);
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

export const deleteMesa = async (idEmpresa, idUsuario, mesa_id, motivo) => {

  if (!idEmpresa || !idUsuario || !mesa_id || !motivo) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT fn_mesa_eliminar($1, $2, $3, $4) AS response',
      [idEmpresa, idUsuario, mesa_id, motivo]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return rows[0] || null;
  } catch (error) {
    console.log('Error al eliminar mesa:', error);
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

