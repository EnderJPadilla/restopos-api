export const subirImagenProducto = async (req, res ) => {
  const empresaId = req.user.empresa_id;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No se recibió ninguna imagen."
      });
    }

    const imageUrl = `/storage/productos/${empresaId}/${req.file.filename}`;

    return res.json({
      success: true,
      message: "Imagen subida correctamente",
      data: {
        url: imageUrl,
        fileName: req.file.filename
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }

};

export const subirImagenUsuario = async (req, res ) => {
  const empresaId = req.user.empresa_id;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No se recibió ninguna imagen."
      });
    }

    const imageUrl = `/storage/usuarios/${empresaId}/${req.file.filename}`;

    return res.json({
      success: true,
      message: "Imagen subida correctamente",
      data: {
        url: imageUrl,
        fileName: req.file.filename
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }

};