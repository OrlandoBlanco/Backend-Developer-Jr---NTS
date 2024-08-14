const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  nombre: { type: String, required: true }, 
  ciudad: { type: String, required: true },
  direccion: { type: String, required: true }, // Dirección del hotel
  precio: { type: Number, required: true }, // Precio por noche
  rating: { type: Number, min: 0, max: 5, default: 0 }, // Rating del hotel
  imagenUrl: { type: String }, // URL de la imagen del hotel
  descripcion: { type: String }, // Descripción del hotel
  servicios: [String], // Lista de servicios ofrecidos por el hotel
  fechaCreacion: { type: Date, default: Date.now } // Fecha de creación del registro
});

// Creación del modelo 'Hotel' basado en el esquema definido
const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;

