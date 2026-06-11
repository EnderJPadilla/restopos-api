import pool from '../config/database.js';

export const getProducts = async (idEmpresa) => {

  if (!idEmpresa) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    // const { rows, rowCount } = await pool.query(
    //   'SELECT * FROM sp_listar_productos($1) AS data',
    //   [idEmpresa]
    // );
    const { rows, rowCount } = await pool.query(
      'SELECT fn_productos_listar($1) AS response',
      [idEmpresa]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }
    
    return rows[0].response || null;
    
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

export const newProducts = async (idEmpresa, idUsuario, dataProduct) => {

  if (!idEmpresa || !idUsuario || !dataProduct) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT fn_producto_guardar($1, $2, $3) AS response',
      [idEmpresa, idUsuario, dataProduct]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return rows[0] || null;
  } catch (error) {
    console.log('Error al crear producto:', error);
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

export const ProductDisponible = async (idEmpresa, idUsuario, producto_id, disponible) => {

  if (!idEmpresa || !idUsuario || !producto_id || disponible === undefined) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT fn_producto_disponibilidad($1, $2, $3, $4) AS response',
      [idEmpresa, idUsuario, producto_id, disponible]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return rows[0] || null;
  } catch (error) {
    console.log('Error al actualizar disponibilidad de producto:', error);
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

export const updateProduct = async (idEmpresa, idUsuario, dataProduct) => {

  if (!idEmpresa || !idUsuario || !dataProduct) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT fn_producto_actualizar($1, $2, $3) AS response',
      [idEmpresa, idUsuario, dataProduct]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return rows[0] || null;
  } catch (error) {
    console.log('Error al crear producto:', error);
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

export const deleteProduct = async (idEmpresa, idUsuario, producto_id) => {

  if (!idEmpresa || !idUsuario || !producto_id) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT fn_producto_eliminar($1, $2, $3) AS response',
      [idEmpresa, producto_id, idUsuario]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return rows[0] || null;
  } catch (error) {
    console.log('Error al eliminar producto:', error);
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

