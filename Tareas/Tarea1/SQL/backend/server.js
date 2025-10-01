require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./src/config/db');
const agendaRoutes = require('./src/routes/agendaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Habilitar CORS para permitir solicitudes desde el frontend
app.use(express.json()); // Para parsear el cuerpo de las solicitudes en formato JSON

// Servir archivos estáticos del frontend
app.use(express.static('../frontend'));

// Rutas de la API
app.use('/api/agenda', agendaRoutes);

// Ruta de prueba (ahora el index.html del frontend será la ruta raíz)
// app.get('/', (req, res) => {
//     res.send('API de Agenda funcionando!');
// });

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
    testConnection(); // Probar la conexión a la base de datos al iniciar el servidor
});
