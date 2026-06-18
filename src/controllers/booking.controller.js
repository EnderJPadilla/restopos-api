import { getReservas, newReserva } from '../services/booking.service.js';

export const getBookings = async (req, res) => {
  const empresa_id = req.user.empresa_id;

  try {
    if (!empresa_id) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Listar Reservas.');
    console.log('----------------------------------------');

    const reservas = await getReservas(empresa_id);

    if (!reservas) {
      return res.json({
        message: 'Rservas no cargadas.',
      });
    }

    console.log('Reservas Listadas.');
    console.log('----------------------------------------');
    return res.json(
      reservas.response
    );

  } catch (error) {
    console.error(error.message);
    console.log('----------------------------------------');
    return res.status(401).json({
      message: error.message
    });
  }
};

export const newBooking = async (req, res) => {
  const { dataReserva } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  console.log('Ejecutando Crear Reserva.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !idUsuario || !dataReserva) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const data = await newReserva(empresa_id, idUsuario, dataReserva);

    if (!data) {
      return res.json({
        message: 'Error al crear la Reserva.',
      });
    }

    console.log('Reserva registrada con exito.')
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


export const uploadOrderItems = async (req, res) => {
  const { dataPedido, newItems, updateItems, removeItems } = req.body;
  const idUsuario = req.user.id;
  const empresa_id = req.user.empresa_id;

  console.log('Ejecutando Actualizar Detalles del Pedido.');
  console.log('----------------------------------------');

  try {
    if (!empresa_id || !idUsuario || !dataPedido || !newItems || !updateItems || !removeItems) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    const data = await actualizarDetallePedido(empresa_id, idUsuario, dataPedido, newItems, updateItems, removeItems);

    if (!data) {
      return res.json({
        message: 'Error al actualizar los detalles del Pedido.',
      });
    }

    console.log('Detalles de Pedido Actualizados con exito.')
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
