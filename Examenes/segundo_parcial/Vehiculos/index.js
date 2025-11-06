const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const vehiculoRoutes = require('./routes/vehiculos');
const grpcServer = require('./grpc-server');

const app = express();
const port = 3001;

app.use(bodyParser.json());

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/vehiculos', vehiculoRoutes);

app.listen(port, () => {
    console.log(`Vehiculos microservice listening on port ${port}`);
});

grpcServer.main();