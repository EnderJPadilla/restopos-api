import fs from "fs";
import path from "path";
import { guardarImagenBase64 } from "../utils/image.helper.js";
import { STORAGE_PATHS } from "../config/storage.js";
import { getProducts, newProducts, updateProduct, validateDeleteImagen, ProductDisponible, deleteProduct } from '../services/produts.service.js';

export const getProductos = async (req, res) => {
  // const { empresa_id } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

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
      return res.json({
        message: 'Productos no encontrados.',
      });
    }

    console.log('Productos Listados.');
    // console.log('Productos Listados:', products.data);
    console.log('----------------------------------------');
    // return res.json({
    //   productos: products
    // });
    // return res.json(
    //   products
    // );
    return res.json(
      products
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const newProductos = async (req, res) => {
  const { dataProducto } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  console.log('Ejecutando Crear producto.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !idUsuario || !dataProducto) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const products = await newProducts(empresa_id, idUsuario, dataProducto);

    if (!products) {
      return res.json({
        message: 'Error al crear el producto.',
      });
    }
    
    console.log('Producto registrado con exito.')
    console.log('----------------------------------------');
    return res.json(
      products.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const productoDisponible = async (req, res) => {
  const { producto_id, disponible } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  console.log('Ejecutando Disponibilidad de producto.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !producto_id || disponible === undefined) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const producto = await ProductDisponible(empresa_id, idUsuario, producto_id, disponible);

    if (!producto) {
      return res.json({
        message: 'Error al actualizar la disponibilidad del producto.',
      });
    }

    console.log('Producto actualizado disponibilidad.');
    console.log('----------------------------------------');
    return res.json(
      producto.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const uploadProductos = async (req, res) => {
  const { dataProducto } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  console.log('Ejecutando Actualizar Producto.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !idUsuario || !dataProducto) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const producto = await updateProduct(empresa_id, idUsuario, dataProducto);
    if (!producto) {
      return res.json({
        message: 'Error al actualizar los datos del producto.',
      });
    }
    
    if (
      dataProducto.removeImage &&
      dataProducto.imageAnt
    ) {
      console.log('Ejecutando Validar imagen del Producto.');
      // console.log('----------------------------------------');

      const deleteImage = await validateDeleteImagen(
        empresa_id, dataProducto.imageAnt, dataProducto.id, 'productos' 
      );
      // console.log('Respuesta:====>>>> ', deleteImage.response.success);
      if (!deleteImage.response.success) {
        return res.json({
          message: 'Error al eliminar la imagen del producto.',
        });
      }

      const rutaRelativa = dataProducto.imageAnt.replace(/^\/?storage\/productos[\\/]/, "");

      const rutaCompleta = path.join(
        STORAGE_PATHS["productos"],
        rutaRelativa
      );
      
      // console.log('RUTA:: ', rutaCompleta);
      // console.log('----------------------------------------');
      if (
        fs.existsSync(rutaCompleta)
      ) {
        fs.unlinkSync(rutaCompleta);
      }
      
    }
    
    console.log('Producto actualizado con exito.')
    console.log('----------------------------------------');
    return res.json(
      producto.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const deleteProductos = async (req, res) => {
  const { producto_id } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  console.log('Ejecutando Eliminar Producto.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !idUsuario || !producto_id) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const producto = await deleteProduct(empresa_id, idUsuario, producto_id);

    if (!producto) {
      return res.json({
        message: 'Error al eliminar el producto.',
      });
    }

    console.log('Producto Eliminado.');
    console.log('----------------------------------------');
    return res.json(
      producto.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

