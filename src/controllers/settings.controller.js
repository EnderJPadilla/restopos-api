import { getConfiguraciones, updateConfiguraciones } from '../services/settings.service.js';

export const getSettings = async (req, res) => {
  const empresa_id = req.user.empresa_id;

  try {
    if (!empresa_id) {
      return res.json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Listar configuraciones.');
    console.log('----------------------------------------');

    const configuraciones = await getConfiguraciones(empresa_id);

    if (!configuraciones) {
      return res.json({
        message: 'Configuraciones no encontradas.',
      });
    }

    console.log('Configuraciones Listadas.');
    // console.log('Categorias:', categorias['data']);
    console.log('----------------------------------------');
    return res.json(
      configuraciones.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const uploadSettings = async (req, res) => {
  const { dataConfiguraciones } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  try {
    if (!empresa_id ||!idUsuario || !dataConfiguraciones) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Actualizar Configuraciones.');
    console.log('Datos: '+dataConfiguraciones);
    dataConfiguraciones.activo = true;
    console.log('Datos: '+dataConfiguraciones);
    console.log('----------------------------------------');

    const configuraciones = await updateConfiguraciones(empresa_id, idUsuario, dataConfiguraciones);

    if (!configuraciones) {
      return res.json({
        message: 'Error al actualizar los datos de la configuracion.',
      });
    }

    console.log('Configuracion actualizada con exito.')
    console.log('----------------------------------------');
    return res.json(
      configuraciones.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

