import { getCategorias, newCategoria, validarNombre, activeCategoria, updateCategoria, deleteCategoria } from '../services/categories.service.js';

export const getCategories = async (req, res) => {
  const empresa_id = req.user.empresa_id;

  try {
    if (!empresa_id) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Listar categorias.');
    console.log('----------------------------------------');

    const categorias = await getCategorias(empresa_id);

    if (!categorias) {
      return res.json({
        message: 'Categorias no encontradas.',
      });
    }

    console.log('Categorias Listadas.');
    // console.log('Categorias:', categorias['data']);
    console.log('----------------------------------------');
    return res.json(
      categorias.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const newCategory = async (req, res) => {
  const { dataCategoria } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  console.log('Ejecutando Crear Categoria.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !idUsuario || !dataCategoria) {
      return res.json({
        message: 'Parámetros incompletos',
      });
    }

    const data = await newCategoria(empresa_id, idUsuario, dataCategoria);
    console.log('Data Categoria:', dataCategoria);
    console.log('----------------------------------------');

    if (!data) {
      return res.json({
        message: 'Error al crear la Categoria.',
      });
    }
    
    console.log('Categoria registrada con exito.')
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

export const validateName = async (req, res) => {
  const { empresa_id, categoryName } = req.body;

  try {
    if (!empresa_id || categoryName == null || categoryName == '') {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Validar Nombre Categoria.');
    console.log('----------------------------------------');

    const validado = await validarNombre(empresa_id, categoryName);

    if (!validado) {
      return res.status(401).json({
        message: 'Nombre de Categoria no disponible.',
      });
    }

    console.log('Nombre de categoria disponible: '+validado['data']);
    // console.log('Categorias:', categorias['data']);
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

export const categoryActivo = async (req, res) => {
  const { categoria_id, activo } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  console.log('Ejecutando (In)activar categoria.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !idUsuario || !categoria_id || activo === undefined) {
      return res.json({
        message: 'Parámetros incompletos',
      });
    }

    const categoria = await activeCategoria(empresa_id, idUsuario, categoria_id, activo);

    if (!categoria) {
      return res.json({
        message: 'Error al (In)activar la categoria.',
      });
    }

    console.log('Categoria (In)activado con exito.');
    console.log('----------------------------------------');
    return res.json(
      categoria.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const uploadCategory = async (req, res) => {
  const { dataCategoria } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  try {
    if (!empresa_id || !idUsuario || !dataCategoria) {
      return res.json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Actualizar Categoria.');
    console.log('----------------------------------------');

    const categoria = await updateCategoria(empresa_id, idUsuario, dataCategoria);

    if (!categoria) {
      return res.json({
        message: 'Error al actualizar los datos de la categoria.',
      });
    }

    console.log('Categoria actualizada con exito.')
    console.log('----------------------------------------');
    return res.json(
      categoria.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const deleteCategory = async (req, res) => {
  const { categoria_id } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  try {
    if (!empresa_id || !idUsuario || !categoria_id) {
      return res.json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Eliminar Categoria.');
    console.log('----------------------------------------');

    const categoria = await deleteCategoria(empresa_id, idUsuario, categoria_id);

    if (!categoria) {
      return res.json({
        message: 'Error al eliminar la categoria.',
      });
    }

    console.log('Categoria Eliminada.');
    console.log('----------------------------------------');
    return res.json(
      categoria.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

