require('dotenv').config(); // Cargar variables de entorno desde .env

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Usa las variables de entorno
const PORT = process.env.PORT || 3000; 
const JWT_SECRET = process.env.JWT_SECRET;

const hotelRoutes = require('./routes/hotel');

app.use(express.json());

app.use('/api/hoteles', hotelRoutes);

const hotels = [
  {
    id: "1",
    name: "Hotel Paradise",
    location: "Cancún, México",
    price: 150,
    rating: 4.5,
    imageUrl: "https://www.paradisuscancun.com/images/slides/slide-99.jpg"
  },
  {
    id: "2",
    name: "The Grand Hotel",
    location: "Paris, Francia",
    price: 250,
    rating: 4.7,
    imageUrl: "https://www.theluxevoyager.com/wp-content/uploads/2018/05/Intercontinental-paris-le-grand-hotel.jpg"
  },
  {
    id: "3",
    name: "Beachside Resort",
    location: "Miami, USA",
    price: 180,
    rating: 4.3,
    imageUrl: "https://s3-media0.fl.yelpcdn.com/bphoto/IWhs2hyjkHY6cKCIafr-fw/348s.jpg"
  },
  {
    id: "4",
    name: "Mountain Retreat",
    location: "Aspen, USA",
    price: 300,
    rating: 4.8,
    imageUrl: "https://cdn.homedit.com/wp-content/uploads/2013/12/aspen-bavarian-style-luxury-mountain.jpg"
  }
];

app.get('/hoteles', (req, res) => {
  res.json(hotels);
});

// Middleware de autenticación
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET); // Ahora usamos la clave secreta del .env
      req.user = decoded;
    } catch (error) {
      // Manejo de errores (token inválido, expirado, etc.)
      return res.status(401).json({ error: 'Token inválido' });
    }
  }
  next();
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
