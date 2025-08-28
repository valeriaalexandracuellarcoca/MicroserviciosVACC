const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./database/mongodb');
const agendaRoutes = require('./routes/agenda.routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Servir archivos estáticos del frontend

// Rutas de la API
app.use('/api/agenda', agendaRoutes);

// Conectar a la base de datos y luego iniciar el servidor
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}).catch(err => {
    console.error("No se pudo iniciar el servidor.", err);
});
