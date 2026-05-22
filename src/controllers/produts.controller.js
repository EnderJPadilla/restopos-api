import { getProducts, newProducts, updateProduct, ProductDisponible, deleteProduct } from '../services/produts.service.js';

export const getProductos = async (req, res) => {
  const { empresa_id } = req.body;

  console.log('Ejecutando Listar productos.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const products = await getProducts(empresa_id);

    if (!products) {
      return res.status(401).json({
        message: 'Productos no encontrados.',
      });
    }

    console.log('Productos Listados.');
    console.log('----------------------------------------');
    return res.json({
      productos: products
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const newProductos = async (req, res) => {
  const { empresa_id, dataProducto } = req.body;

  console.log('Ejecutando Crear producto.');
  console.log('----------------------------------------');
  console.log('Data Producto:', dataProducto);
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !dataProducto) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const products = await newProducts(empresa_id, dataProducto);

    if (!products) {
      return res.status(401).json({
        message: 'Error al crear el producto.',
      });
    }
    
    console.log('Producto registrado con exito.')
    console.log('----------------------------------------');
    return res.json({
      products: products
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const productoDisponible = async (req, res) => {
  const { empresa_id, producto_id, disponible } = req.body;

  console.log('Ejecutando Disponibilidad de producto.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !producto_id || disponible === undefined) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const producto = await ProductDisponible(empresa_id, producto_id, disponible);

    if (!producto) {
      return res.status(401).json({
        message: 'Error al actualizar la disponibilidad del producto.',
      });
    }

    console.log('Producto actualizado disponibilidad.');
    console.log('----------------------------------------');
    return res.json({
      producto: producto
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const uploadProductos = async (req, res) => {
  const { empresa_id, dataProducto } = req.body;

  console.log('Ejecutando Actualizar Producto.');
  console.log('----------------------------------------');
  // console.log('Empresa: '+empresa_id);
  // console.log('DataProducto: '+dataProducto['producto']);
  // console.log('----------------------------------------');

  try {
    if (!empresa_id || !dataProducto) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const producto = await updateProduct(empresa_id, dataProducto);

    if (!producto) {
      return res.status(401).json({
        message: 'Error al actualizar los datos del producto.',
      });
    }

    console.log('Producto actualizado con exito.')
    console.log('----------------------------------------');
    return res.json({
      producto: producto
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const deleteProductos = async (req, res) => {
  const { empresa_id, producto_id } = req.body;

  console.log('Ejecutando Disponibilidad de producto.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !producto_id) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const producto = await deleteProduct(empresa_id, producto_id);

    if (!producto) {
      return res.status(401).json({
        message: 'Error al actualizar la disponibilidad del producto.',
      });
    }

    console.log('Producto Eliminado.');
    console.log('----------------------------------------');
    return res.json({
      producto: producto
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

