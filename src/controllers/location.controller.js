import { getCountries, getDepartments } from '../services/location.service.js';


export const getPaises = async (req, res) => {
  const { accion } = req.body;
  
  try {
    if (!accion) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Listar países.');
    // console.log('----------------------------------------');

    const data = await getCountries(accion);

    // console.log('Respuesta API CountriesNow:', data.data);
    // console.log('----------------------------------------');

    if (!data) {
      throw new Error("Respuesta inválida API CountriesNow");
    }

    console.log('Paises Listados.');
    // console.log(data.data.map(p => p.country));
    console.log('----------------------------------------');
    return res.json({
      // paises: data.data.map(p => p.country),
      paises: data.data,
    });

  } catch (err) {
    console.error("API Paises error:", err);

    return res.status(500).json({
      success: false,
      message: "No se pudo obtener países",
    });
  }
};

export const getDepartamentos = async (req, res) => {
  const { accion, filtro } = req.body;

  try {
    
    if (!accion || !filtro) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }
    console.log('Ejecutando Listar departamentos.');
    // console.log('----------------------------------------');

    const data = await getDepartments(accion, filtro);

    if (!data) {
      return res.status(400).json({ message: "País requerido" });
    }

    if (!data?.data) {
      throw new Error("No se encontraron departamentos");
    }

    console.log('Departamentos Listados.');
    // console.log(data.data);
    console.log('----------------------------------------');

    return res.json({
      departamentos: data.data,
    });

  } catch (error) {
    console.error("Error departamentos:", error.message);

    return res.status(500).json({
      success: false,
      message: "Error consultando departamentos",
    });
  }
};

export const getCiudades = async (req, res) => {
  const { accion, filtro } = req.body;

  try {

    if (!accion || !filtro) {
      return res.status(400).json({
        message: 'Parámetros incompletos',
      });
    }

    console.log('Ejecutando Listar ciudades.');
    // console.log('----------------------------------------');

    const data = await getDepartments(accion, filtro);

    if (!data?.data) {
      throw new Error("No se encontraron ciudades");
    }

    console.log('Ciudades Listadas.');
    // console.log(data.data);
    console.log('----------------------------------------');

    return res.json({
      ciudades: data.data,
    });

  } catch (error) {
    console.error("Error ciudades:", error.message);

    return res.status(500).json({
      success: false,
      message: "Error consultando ciudades",
    });
  }
};
