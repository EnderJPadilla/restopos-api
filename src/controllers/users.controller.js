import bcrypt from 'bcrypt';
import { getUsers, newUser, validarNombre, updateUser, activeUser, deleteUser } from '../services/users.service.js';

export const getUsuarios = async (req, res) => {
  const { empresa_id } = req.body;

  console.log('Ejecutando Listar usuarios.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const users = await getUsers(empresa_id);

    if (!users) {
      return res.status(401).json({
        message: 'Usuarios no encontrados.',
      });
    }

    console.log('Usuarios Listados.');
    // console.log('users:', users['data']['data']);
    console.log('----------------------------------------');
    return res.json({
      usuarios: users['data']['data']['usuarios']
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const newUsuario = async (req, res) => {
  const { empresa_id, dataUsuario } = req.body;

  console.log('Ejecutando Crear usuario.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !dataUsuario) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    // Encriptar contraseña
    const saltRounds = 12; // recomendado entre 10-14
    const passwordHash = await bcrypt.hash(dataUsuario.acceso.pin_secret, saltRounds);

    // Reemplazar contraseña en payload
    dataUsuario.acceso.pin_secret = passwordHash;

    const data = await newUser(empresa_id, dataUsuario);
    console.log('Data Usuario:', dataUsuario);
    console.log('----------------------------------------');

    if (!data) {
      return res.status(401).json({
        message: 'Error al crear el usuario.',
      });
    }
    
    console.log('Usuario registrado con exito.')
    console.log('----------------------------------------');
    return res.json({
      usuario: data
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
  const { empresa_id, userName } = req.body;

  try {
    if (!empresa_id || userName == null || userName == '') {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Validar Nombre Usuario.');
    console.log('----------------------------------------');

    const validado = await validarNombre(empresa_id, userName);

    if (!validado) {
      return res.status(401).json({
        message: 'Nombre de Usuario no disponible.',
      });
    }

    console.log('Nombre de usuario disponible: '+validado['data']);
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

export const usuarioActivo = async (req, res) => {
  const { empresa_id, empleado_id, usuario_id, activo } = req.body;

  console.log('Ejecutando (In)activar usuario.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !empleado_id || !usuario_id || activo === undefined) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const usuario = await activeUser(empresa_id, empleado_id, usuario_id, activo);

    if (!usuario) {
      return res.status(401).json({
        message: 'Error al (In)activar el usuario.',
      });
    }

    console.log('Usuario (In)activado con exito.');
    console.log('----------------------------------------');
    return res.json({
      usuario: usuario
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const uploadUsuario = async (req, res) => {
  const { empresa_id, dataUsuario } = req.body;

  console.log('Ejecutando Actualizar Usuario.');
  console.log('----------------------------------------');
  // console.log('Empresa: '+empresa_id);
  // console.log('DataProducto: '+dataProducto['producto']);
  // console.log('----------------------------------------');

  try {
    if (!empresa_id || !dataUsuario) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const usuario = await updateUser(empresa_id, dataUsuario);

    if (!usuario) {
      return res.status(401).json({
        message: 'Error al actualizar los datos del usuario.',
      });
    }

    console.log('Usuario actualizado con exito.')
    console.log('----------------------------------------');
    return res.json({
      usuario: usuario
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const deleteUsuario = async (req, res) => {
  const { empresa_id, usuario_id } = req.body;

  console.log('Ejecutando Eliminar Usuario.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !usuario_id) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const usuario = await deleteUser(empresa_id, usuario_id);

    if (!usuario) {
      return res.status(401).json({
        message: 'Error al eliminar el usuario.',
      });
    }

    console.log('Usuario Eliminado.');
    console.log('----------------------------------------');
    return res.json({
      usuario: usuario
    });

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

