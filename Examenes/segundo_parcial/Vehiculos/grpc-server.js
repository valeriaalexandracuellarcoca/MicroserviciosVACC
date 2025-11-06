
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const Vehiculo = require('./models/vehiculo');

const PROTO_PATH = path.resolve(__dirname, '../proto/vehiculos.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const vehiculosProto = grpc.loadPackageDefinition(packageDefinition).vehiculos;

async function verificarDisponibilidad(call, callback) {
  const { vehiculo_id } = call.request;
  console.log(`[gRPC Vehiculos] Received request for vehiculo_id: ${vehiculo_id}`);

  try {
    const vehiculo = await Vehiculo.findOne({ placa: vehiculo_id });

    if (!vehiculo) {
      console.log(`[gRPC Vehiculos] Vehiculo with placa ${vehiculo_id} not found.`);
      return callback({ code: grpc.status.NOT_FOUND, message: 'Vehículo no encontrado.' });
    }

    const disponible = vehiculo.estado === 'disponible';
    console.log(`[gRPC Vehiculos] Vehiculo found: ${vehiculo.placa}, Estado: ${vehiculo.estado}, Disponible: ${disponible}`);

    callback(null, {
      disponible: disponible,
      id: vehiculo._id.toString(),
      placa: vehiculo.placa,
      tipo: vehiculo.tipo,
      capacidad: vehiculo.capacidad,
      estado: vehiculo.estado,
    });
  } catch (error) {
    console.error('[gRPC Vehiculos] Internal server error:', error);
    callback({ code: grpc.status.INTERNAL, message: 'Error interno del servidor.' });
  }
}

function main() {
  const server = new grpc.Server();
  server.addService(vehiculosProto.VehiculoService.service, { verificarDisponibilidad });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Failed to start gRPC server:', err);
      return;
    }
    server.start();
  });
}

module.exports = { main };
