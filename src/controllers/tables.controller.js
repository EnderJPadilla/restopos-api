import { getMesas, newMesa, validarNumero, validarNombre, activeMesa, updateMesa, deleteMesa } from '../services/tables.service.js';

export const getTables = async (req, res) => {
  const empresa_id = req.user.empresa_id;

  try {
    if (!empresa_id) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Listar mesas.');
    console.log('----------------------------------------');

    const mesas = await getMesas(empresa_id);

    if (!mesas) {
      return res.json({
        message: 'Mesas no cargadas.',
      });
    }

    console.log('Mesas Listadas.');
    // console.log('Mesas:', mesas['data']);
    console.log('----------------------------------------');
    return res.json(
      mesas.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const newTable = async (req, res) => {
  const { dataTable } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  console.log('Ejecutando Crear Mesa.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !idUsuario || !dataTable) {
      return res.json({
        message: 'Parámetros incompletos',
      });
    }

    const data = await newMesa(empresa_id, idUsuario, dataTable);
    // console.log('Data Mesa:', dataTable);
    // console.log('----------------------------------------');

    if (!data) {
      return res.json({
        message: 'Error al crear la Mesa.',
      });
    }
    
    console.log('Mesa registrada con exito.')
    console.log('----------------------------------------');
    return res.json(
      data.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const validateNumber = async (req, res) => {
  const { empresa_id, tableNumber } = req.body;

  try {
    if (!empresa_id || tableNumber == null || tableNumber == '') {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Validar Número Mesa.');
    console.log('----------------------------------------');

    const validado = await validarNumero(empresa_id, tableNumber);

    if (!validado) {
      return res.status(401).json({
        message: 'Número de Mesa no disponible.',
      });
    }

    console.log('Número de mesa disponible: '+validado['data']);
    // console.log('Mesas:', mesas['data']);
    console.log('----------------------------------------');
    return res.json({
      validado: validado['data']
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const validateName = async (req, res) => {
  const { empresa_id, tableName } = req.body;

  try {
    if (!empresa_id || tableName == null || tableName == '') {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Validar Nombre Mesa.');
    console.log('----------------------------------------');

    const validado = await validarNombre(empresa_id, tableName);

    if (!validado) {
      return res.status(401).json({
        message: 'Nombre de Mesa no disponible.',
      });
    }

    console.log('Nombre de mesa disponible: '+validado['data']);
    // console.log('Mesas:', mesas['data']);
    console.log('----------------------------------------');
    return res.json({
      validado: validado['data']
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const tableActivo = async (req, res) => {
  const { mesa_id, activo } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  console.log('Ejecutando (In)activar mesa.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !idUsuario || !mesa_id || activo === undefined) {
      return res.json({
        message: 'Parámetros incompletos',
      });
    }

    const mesa = await activeMesa(empresa_id, idUsuario, mesa_id, activo);

    if (!mesa) {
      return res.json({
        message: 'Error al (In)activar la mesa.',
      });
    }

    console.log('Mesa (In)activada con exito.');
    console.log('----------------------------------------');
    return res.json(
      mesa.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const uploadTable = async (req, res) => {
  const { dataTable } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  try {
    if (!empresa_id || !idUsuario || !dataTable) {
      return res.json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Actualizar Mesa.');
    console.log('----------------------------------------');

    const mesa = await updateMesa(empresa_id, idUsuario, dataTable);

    if (!mesa) {
      return res.json({
        message: 'Error al actualizar los datos de la mesa.',
      });
    }

    console.log('Mesa actualizada con exito.')
    console.log('----------------------------------------');
    return res.json(
      mesa.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const deleteTable = async (req, res) => {
  const { mesa_id, motivo } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  try {
    if (!empresa_id || !idUsuario || !mesa_id || !motivo) {
      return res.json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Eliminar Mesa.');
    console.log('----------------------------------------');

    const mesa = await deleteMesa(empresa_id, idUsuario, mesa_id, motivo);

    if (!mesa) {
      return res.json({
        message: 'Error al eliminar la mesa.',
      });
    }

    console.log('Mesa Eliminada.');
    console.log('----------------------------------------');
    return res.json(
      mesa.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

