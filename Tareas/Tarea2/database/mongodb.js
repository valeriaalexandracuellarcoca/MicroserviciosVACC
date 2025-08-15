const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectDB() {
    if (db) return db;
    try {
        await client.connect();
        console.log("Conectado a MongoDB.");
        db = client.db(); // Si no especificas un nombre, usa el de la URI
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
