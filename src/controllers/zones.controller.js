import { getZonas, newZona, validarNumero, validarNombre, activeZona, updateZona, deleteZona } from '../services/zones.service.js';

export const getZones = async (req, res) => {
  const empresa_id = req.user.empresa_id;

  try {
    if (!empresa_id) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Listar zonas.');
    console.log('----------------------------------------');

    const zonas = await getZonas(empresa_id);

    if (!zonas) {
      return res.json({
        message: 'Zonas no cargadas.',
      });
    }

    console.log('Zonas Listadas.');
    console.log('----------------------------------------');
    return res.json(
      zonas.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const newZone = async (req, res) => {
  const { dataZona } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  console.log('Ejecutando Crear Zona.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !idUsuario || !dataZona) {
      return res.json({
        message: 'Parámetros incompletos',
      });
    }

    const data = await newZona(empresa_id, idUsuario, dataZona);

    if (!data) {
      return res.json({
        message: 'Error al crear la Zona.',
      });
    }
    
    console.log('Zona registrada con exito.')
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
  const { empresa_id, zoneNumber } = req.body;

  try {
    if (!empresa_id || zoneNumber == null || zoneNumber == '') {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Validar Número Zona.');
    console.log('----------------------------------------');

    const validado = await validarNumero(empresa_id, zoneNumber);

    if (!validado) {
      return res.status(401).json({
        message: 'Número de Zona no disponible.',
      });
    }

    console.log('Número de zona disponible: '+validado['data']);
    console.log('----------------------------------------');
    return res.json(
      validado.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const validateName = async (req, res) => {
  const { empresa_id, ZoneName } = req.body;

  try {
    if (!empresa_id || ZoneName == null || ZoneName == '') {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Validar Nombre Zona.');
    console.log('----------------------------------------');

    const validado = await validarNombre(empresa_id, ZoneName);

    if (!validado) {
      return res.json({
        message: 'Nombre de zona no disponible.',
      });
    }

    console.log('Nombre de zona disponible: '+validado['data']);
    console.log('----------------------------------------');
    return res.json(
      validado.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const ZonaActivo = async (req, res) => {
  const { zona_id, activo } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  console.log('Ejecutando (In)activar zona.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !idUsuario || !zona_id || activo === undefined) {
      return res.json({
        message: 'Parámetros incompletos',
      });
    }

    const zona = await activeZona(empresa_id, idUsuario, zona_id, activo);

    if (!zona) {
      return res.json({
        message: 'Error al (In)activar la zona.',
      });
    }

    console.log('Zona (In)activada con exito.');
    console.log('----------------------------------------');
    return res.json(
      zona.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const uploadZone = async (req, res) => {
  const { idZona, dataZona } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  try {
    if (!empresa_id || !idUsuario || !idZona || !dataZona) {
      return res.json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Actualizar Zona.');
    console.log('----------------------------------------');

    const zona = await updateZona(empresa_id, idUsuario, idZona, dataZona);

    if (!zona) {
      return res.json({
        message: 'Error al actualizar los datos de la zona.',
      });
    }

    console.log('Zona actualizada con exito.')
    console.log('----------------------------------------');
    return res.json(
      zona.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const deleteZone = async (req, res) => {
  const { zona_id, motivo } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  try {
    if (!empresa_id || !idUsuario || !zona_id || !motivo) {
      return res.json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Eliminar Zona.');
    console.log('----------------------------------------');

    const zona = await deleteZona(empresa_id, idUsuario, zona_id, motivo);

    if (!zona) {
      return res.json({
        message: 'Error al eliminar la zona.',
      });
    }

    console.log('Zona Eliminada.');
    console.log('----------------------------------------');
    return res.json(
      zona.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

