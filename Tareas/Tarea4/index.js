const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const productoRoutes = require('./src/routes/productos.routes');
const clienteRoutes = require('./src/routes/clientes.routes');
const facturaRoutes = require('./src/routes/facturas.routes');
const detalleFacturaRoutes = require('./src/routes/detallesFacturas.routes');
const app = express();
const port = 3000;


app.use(express.json());

//swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Sistema de Ventas',
      version: '1.0.0',
      description: 'Documentación de la API RESTful para gestionar un sistema de ventas.',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/productos', productoRoutes);
app.use('/clientes', clienteRoutes);
app.use('/facturas', facturaRoutes);
app.use('/detalles-facturas', detalleFacturaRoutes);


app.get('/', (req, res) => {
  res.send('API de Sistema de Ventas funcionando. /api-docs para ver la documentación.');
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
