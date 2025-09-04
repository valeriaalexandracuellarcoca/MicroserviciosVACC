const agendaModel = require('../models/agendaModel');

// Servicio para la lógica de negocio de la Agenda
const agendaService = {
    // Obtener todos los contactos
    getAllContacts: async () => {
        return await agendaModel.getAll();
    },

    // Obtener un contacto por ID
    getContactById: async (id) => {
        return await agendaModel.getById(id);
    },

    // Crear un nuevo contacto
    createContact: async (contacto) => {
        return await agendaModel.create(contacto);
    },

    // Actualizar un contacto
    updateContact: async (id, contacto) => {
        return await agendaModel.update(id, contacto);
    },

    // Eliminar un contacto
    deleteContact: async (id) => {
        return await agendaModel.remove(id);
    }
};

module.exports = agendaService;
