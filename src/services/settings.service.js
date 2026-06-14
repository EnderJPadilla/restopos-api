import pool from '../config/database.js';

export const getConfiguraciones = async (idEmpresa) => {

  if (!idEmpresa) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT fn_configuracion_listar($1) AS response',
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

export const updateConfiguraciones = async (idEmpresa, idUsuario, dataConfiguraciones) => {

  if (!idEmpresa ||!idUsuario || !dataConfiguraciones) {
    throw new Error('PARÁMETROS_INVALIDOS');
  }

  try {
    const { rows, rowCount } = await pool.query(
      'SELECT fn_configuracion_actualizar($1, $2, $3) AS response',
      [idEmpresa, idUsuario, dataConfiguraciones]
    );

    // El SP debería retornar máximo 1 registro
    if (rowCount > 1) {
      throw new Error('RESPUESTA_INCONSISTENTE_SP');
    }

    return rows[0] || null;
  } catch (error) {
    console.log('Error al actualizar las configuraciones:', error);
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

