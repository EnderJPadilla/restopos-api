import pool from '../config/database.js';

// export const getMesas = async (idEmpresa) => {

//   if (!idEmpresa) {
//     throw new Error('PARÁMETROS_INVALIDOS');
//   }

//   try {
//     const { rows, rowCount } = await pool.query(
//       'SELECT * FROM fn_listar_mesas($1) AS data',
//       [idEmpresa]
//     );

//     // El SP debería retornar máximo 1 registro
//     if (rowCount > 1) {
//       throw new Error('RESPUESTA_INCONSISTENTE_SP');
//     }

//     return rows[0] || null;
    
//   } catch (error) {
//     // Error lanzado explícitamente desde PostgreSQL
//     if (error.code === 'P0001') {
//       // Ej: EMPRESA_NO_EXISTE_O_INACTIVA
//       throw new Error(error.message);
//     }

//     // Error de conexión o sintaxis
//     if (error.code?.startsWith('08')) {
//       throw new Error('ERROR_CONEXION_BD');
//     }

//     // Error genérico
//     throw new Error(error);
//   }
// };

export const newPedido = async (idEmpresa, dataPedido) => {

  if (!idEmpresa || !dataPedido) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'CALL sp_crear_pedido($1, $2, NULL)',
      [idEmpresa, dataPedido]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return rows[0] || null;
  } catch (error) {
    console.log('Error al crear pedido:', error);
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

export const activeMesa = async (idEmpresa, mesa_id, activo) => {

  if (!idEmpresa || !mesa_id || activo === undefined) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'CALL sp_mesa_activo($1, $2, $3, NULL)',
      [idEmpresa, mesa_id, activo]
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

export const updateMesa = async (idEmpresa, dataMesa) => {

  if (!idEmpresa || !dataMesa) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'CALL sp_actualizar_mesa($1, $2, NULL)',
      [idEmpresa, dataMesa]
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

export const deleteMesa = async (idEmpresa, mesa_id) => {

  if (!idEmpresa || !mesa_id) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'CALL sp_eliminar_mesa($1, $2, NULL)',
      [idEmpresa, mesa_id]
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

