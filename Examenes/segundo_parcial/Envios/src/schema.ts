
import { buildSchema } from 'graphql';
import { pool } from './db';
import { RowDataPacket, OkPacket } from 'mysql2';
import { ServiceError } from '@grpc/grpc-js';
import { grpcClient } from './grpc-client';


interface EnvioIdArgs {
  id: number;
}

interface EnviosPorEstadoArgs {
  estado: string;
}

interface CrearEnvioArgs {
  usuario_id: number;
  vehiculo_id: string;
  origen: string;
  destino: string;
  fecha_envio: string;
}

interface AsignarVehiculoArgs {
  id: number;
  vehiculo_id: string;
}

interface ActualizarEstadoArgs {
  id: number;
  estado: string;
}

interface Envio {
  id: number;
  usuario_id: number;
  vehiculo_id?: string;
  origen: string;
  destino: string;
  fecha_envio: string;
  estado: string;
}

interface VerificarResponse {
  disponible: boolean;
}

export const schema = buildSchema(`
    type Envio {
        id: ID!
        usuario_id: Int!
        vehiculo_id: String
        origen: String!
        destino: String!
        fecha_envio: String!
        estado: String!
    }

    type Query {
        envio(id: ID!): Envio
        envios: [Envio]
        enviosPorEstado(estado: String!): [Envio]
    }

    type Mutation {
        crearEnvio(usuario_id: Int!, vehiculo_id: String!, origen: String!, destino: String!, fecha_envio: String!): Envio
        asignarVehiculo(id: ID!, vehiculo_id: String!): Envio
        actualizarEstado(id: ID!, estado: String!): Envio
    }
`);
export const root = {

  asignarVehiculo: ({ id, vehiculo_id }: AsignarVehiculoArgs): Promise<Envio | undefined> => {
    console.log(`[Envios] Iniciando asignación para envio ID: ${id} con vehiculo ID: ${vehiculo_id}`);

    return new Promise((resolve, reject) => {
      grpcClient.verificarDisponibilidad({ vehiculo_id }, async (err: ServiceError | null, response: VerificarResponse) => {
        if (err) {
          console.error('[Envios] gRPC Error:', err.details);
          return reject(new Error(`gRPC Error: ${err.details}`));
        }

        console.log('[Envios] gRPC Response:', response);

        if (!response || !response.disponible) {
          console.log(`[Envios] Vehículo ${vehiculo_id} no está disponible o la respuesta fue inválida.`);
          return reject(new Error(`Vehículo con placa ${vehiculo_id} no está disponible.`));
        }

        console.log(`[Envios] Vehículo ${vehiculo_id} está disponible. Actualizando base de datos.`);
        try {
          await pool.query<OkPacket>('UPDATE envios SET vehiculo_id = ? WHERE id = ?', [vehiculo_id, id]);
          const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM envios WHERE id = ?', [id]);
          console.log(`[Envios] Asignación completada para envio ID: ${id}`);
          resolve(rows[0] as Envio | undefined);
        } catch (dbError) {
          console.error('[Envios] Database Error after gRPC call:', dbError);
          reject(dbError);
        }
      });
    });
  },

  envio: async ({ id }: EnvioIdArgs): Promise<Envio | undefined> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM envios WHERE id = ?', [id]);
    return rows[0] as Envio | undefined;
  },
  envios: async (): Promise<Envio[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM envios');
    return rows as Envio[];
  },
  enviosPorEstado: async ({ estado }: EnviosPorEstadoArgs): Promise<Envio[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM envios WHERE estado = ?', [estado]);
    return rows as Envio[];
  },
  crearEnvio: async ({ usuario_id, vehiculo_id, origen, destino, fecha_envio }: CrearEnvioArgs): Promise<Envio | undefined> => {
    const [result] = await pool.query<OkPacket>(
        'INSERT INTO envios (usuario_id, vehiculo_id, origen, destino, fecha_envio) VALUES (?, ?, ?, ?, ?)',
        [usuario_id, vehiculo_id, origen, destino, fecha_envio]
    );
    const insertId = result.insertId;
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM envios WHERE id = ?', [insertId]);
    return rows[0] as Envio | undefined;
  },
  actualizarEstado: async ({ id, estado }: ActualizarEstadoArgs): Promise<Envio | undefined> => {
    await pool.query<OkPacket>('UPDATE envios SET estado = ? WHERE id = ?', [estado, id]);
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM envios WHERE id = ?', [id]);
    return rows[0] as Envio | undefined;
  }
};