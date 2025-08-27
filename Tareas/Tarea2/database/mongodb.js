const { MongoClient } = require('mongodb');
require('dotenv').config();

// Fallback to localhost for local development without Docker
const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || 27017;
const dbName = process.env.MONGO_DB || 'agenda';

const uri = `mongodb://${host}:${port}/${dbName}`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectDB() {
    if (db) return db;
    try {
        await client.connect();
        console.log(`Conectado a MongoDB en ${host}.`);
        db = client.db(); // The database name is taken from the URI
        return db;
    } catch (error) {
        console.error("No se pudo conectar a MongoDB.", error);
        process.exit(1);
    }
}

function getDB() {
    if (!db) {
        throw new Error("La base de datos no está inicializada. Llama a connectDB primero.");
    }
    return db;
}

module.exports = { connectDB, getDB };