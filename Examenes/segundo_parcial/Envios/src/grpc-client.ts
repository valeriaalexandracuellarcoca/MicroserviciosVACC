
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, '../../proto/vehiculos.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const vehiculosProto = grpc.loadPackageDefinition(packageDefinition).vehiculos as any;

export const grpcClient = new vehiculosProto.VehiculoService(
  'vehiculos:50051',
  grpc.credentials.createInsecure()
);

console.log('gRPC client for Vehiculos service initialized.');
