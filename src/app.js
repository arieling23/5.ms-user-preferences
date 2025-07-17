require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const preferencesRoutes = require('./routes/preferencesRoutes');
const connectDB = require('./config/db');

const app = express();


const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://54.225.75.133:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());


connectDB();


app.use('/api/preferences', preferencesRoutes);


app.get('/', (_, res) => res.send('✅ ms-user-preferences activo'));


app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});


app.use((err, req, res, next) => {
  console.error('❌ Error general:', err);
  res.status(500).json({ message: 'Error interno del servidor' });
});


const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ms-user-preferences corriendo en puerto ${PORT}`);
});
