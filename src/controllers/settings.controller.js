import { getConfiguraciones, updateConfiguraciones } from '../services/settings.service.js';

export const getSettings = async (req, res) => {
  const { empresa_id } = req.body;

  try {
    if (!empresa_id) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Listar configuraciones.');
    console.log('----------------------------------------');

    const configuraciones = await getConfiguraciones(empresa_id);

    if (!configuraciones) {
      return res.status(401).json({
        message: 'Configuraciones no encontradas.',
      });
    }

    console.log('Configuraciones Listadas.');
    // console.log('Categorias:', categorias['data']);
    console.log('----------------------------------------');
    return res.json({
      configuraciones: configuraciones['data']
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const uploadSettings = async (req, res) => {
  const { empresa_id, dataConfiguraciones } = req.body;

  try {
    if (!empresa_id || !dataConfiguraciones) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Actualizar Configuraciones.');
    console.log('Datos: '+dataConfiguraciones);
    console.log('----------------------------------------');

    const configuraciones = await updateConfiguraciones(empresa_id, dataConfiguraciones);

    if (!configuraciones) {
      return res.status(401).json({
        message: 'Error al actualizar los datos de la configuracion.',
      });
    }

    console.log('Configuracion actualizada con exito.')
    console.log('----------------------------------------');
    return res.json({
      configuraciones: configuraciones
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

