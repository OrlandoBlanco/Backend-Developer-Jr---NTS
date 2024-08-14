const Hotel = require('../models/hotel');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Crear Hotel
exports.crearHotel = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('ciudad').notEmpty().withMessage('La ciudad es obligatoria'),
  // Agregar más validaciones según tus necesidades

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nombre, ciudad } = req.body;
      const nuevoHotel = new Hotel({ nombre, ciudad });
      const hotelGuardado = await nuevoHotel.save();
      res.status(201).json(hotelGuardado);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el hotel' });
    }
  },
];

// Listar Hoteles con paginación
exports.listarHoteles = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'nombre' } = req.query;
    const skip = (page - 1) * limit;

    const hoteles = await Hotel.find()
      .sort({ [sortBy]: 1 }) // Orden ascendente por defecto (cambia a -1 para descendente)
      .skip(skip)
      .limit(parseInt(limit));

    res.json(hoteles); 
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de hoteles' });
  }
};

// Obtener estadísticas de los hoteles
exports.obtenerEstadisticas = async (req, res) => {
  // Implementar lógica para obtener estadísticas
  try {
    // Ejemplo: contar la cantidad de hoteles
    const totalHoteles = await Hotel.countDocuments();
    res.json({ totalHoteles });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las estadísticas' });
  }
};

// Filtrar Hoteles
exports.filtrarHoteles = async (req, res) => {
  const { location, priceMin, priceMax, rating } = req.query;
  const query = {};

  if (location) query.location = location;
  if (priceMin) query.price = { $gte: priceMin };
  if (priceMax) query.price = { ...query.price, $lte: priceMax };
  if (rating) query.rating = { $gte: rating };

  try {
    const hoteles = await Hotel.find(query);
    res.json(hoteles);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar hoteles' });
  }
};

// Actualizar Hotel
exports.actualizarHotel = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const hotelActualizado = await Hotel.findByIdAndUpdate(id, updates, { new: true });
    if (!hotelActualizado) {
      return res.status(404).json({ error: 'Hotel no encontrado' });
    }
    res.json(hotelActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el hotel' });
  }
};

// Eliminar Hotel
exports.eliminarHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const hotelEliminado = await Hotel.findByIdAndDelete(id);
    if (!hotelEliminado) {
      return res.status(404).json({ error: 'Hotel no encontrado' });
    }
    res.json({ message: 'Hotel eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el hotel' });
  }
};

// Buscar Hoteles por nombre
exports.buscarHoteles = async (req, res) => {
  const { search } = req.query;
  const regex = new RegExp(search, 'i'); // 'i' para case-insensitive

  try {
    const hoteles = await Hotel.find({ nombre: regex });
    res.json(hoteles);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar hoteles' });
  }
};

// Middleware para verificar autenticación
exports.verificarAutenticacion = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
