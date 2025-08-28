const { getDB } = require('../database/mongodb');
const { ObjectId } = require('mongodb');

const collectionName = 'agenda';

// Obtener todos los contactos
const getContactos = async (req, res) => {
    try {
        const db = getDB();
        const contactos = await db.collection(collectionName).find({}).toArray();
        res.status(200).json(contactos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un solo contacto por ID
const getContactoById = async (req, res) => {
    try {
        const db = getDB();
        const contacto = await db.collection(collectionName).findOne({ _id: new ObjectId(req.params.id) });
        if (!contacto) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }
        res.status(200).json(contacto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo contacto
const createContacto = async (req, res) => {
    try {
        const db = getDB();
        const nuevoContacto = req.body;
        const result = await db.collection(collectionName).insertOne(nuevoContacto);
        
        // La propiedad `ops` está obsoleta. 
        // Construimos la respuesta con el ID insertado y los datos originales.
        const createdContact = { ...nuevoContacto, _id: result.insertedId };

        res.status(201).json(createdContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un contacto
const updateContacto = async (req, res) => {
    try {
        const db = getDB();
        const { id } = req.params;
        const updatedData = req.body;
        const result = await db.collection(collectionName).updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }

        res.status(200).json({ message: 'Contacto actualizado exitosamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un contacto
const deleteContacto = async (req, res) => {
    try {
        const db = getDB();
        const { id } = req.params;
        const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }

        res.status(200).json({ message: 'Contacto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getContactos,
    getContactoById,
    createContacto,
    updateContacto,
    deleteContacto
};
