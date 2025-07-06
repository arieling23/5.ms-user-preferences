// app.js
require('dotenv').config(); // Carga variables de entorno

const express = require('express');
const cors = require('cors');
const preferencesRoutes = require('./routes/preferencesRoutes');
const connectDB = require('./config/db');

const app = express();

// Configuración CORS desde variable de entorno
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Conexión a MongoDB
connectDB();

// Rutas protegidas
app.use('/', preferencesRoutes);

// Ruta raíz de prueba
app.get('/', (_, res) => res.send('✅ ms-user-preferences activo'));


app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejador global de errores
app.use((err, req, res, next) => {
  console.error('❌ Error general:', err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 4004;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ms-user-preferences corriendo en puerto ${PORT}`);
});
