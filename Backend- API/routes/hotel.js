const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Dónde se guardan las imágenes

// Importar los controladores
const { 
  listarHoteles, 
  filtrarHoteles, 
  crearHotel, 
  actualizarHotel, 
  eliminarHotel, 
  obtenerEstadisticas, 
  buscarHoteles,  
} = require('../controllers/hotelcontroller');

// Ruta para cargar una imagen
router.post('/imagen', upload.single('imagen'), (req, res) => {
  // Guardar la referencia a la imagen en la base de datos
  // req.file contiene la información de la imagen subida
  res.json({ mensaje: 'Imagen cargada correctamente' });
});

// Ruta para obtener estadísticas
router.get('/estadistica', obtenerEstadisticas);

// Ruta para listar todos los hoteles
router.get('/', listarHoteles);

// Ruta para filtrar hoteles según criterios
router.get('/filtrar', filtrarHoteles);

// Ruta para crear un nuevo hotel (requiere autenticación)
router.post('/', crearHotel);

// Ruta para actualizar un hotel existente
router.put('/:id',  actualizarHotel);

// Ruta para eliminar un hotel
router.delete('/:id',  eliminarHotel);

// Ruta para buscar hoteles por nombre
router.get('/buscar', buscarHoteles);

module.exports = router;

