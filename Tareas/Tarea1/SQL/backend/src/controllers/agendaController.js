const agendaService = require('../services/agendaService');

// Controlador para manejar las solicitudes HTTP relacionadas con la Agenda
const agendaController = {
    // Obtener todos los contactos
    getAllContacts: async (req, res) => {
        try {
            const contacts = await agendaService.getAllContacts();
            res.json(contacts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtener un contacto por ID
    getContactById: async (req, res) => {
        try {
            const contact = await agendaService.getContactById(req.params.id);
            if (contact) {
                res.json(contact);
            } else {
                res.status(404).json({ message: 'Contacto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Crear un nuevo contacto
    createContact: async (req, res) => {
        try {
            const newContact = await agendaService.createContact(req.body);
            res.status(201).json(newContact);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Actualizar un contacto
    updateContact: async (req, res) => {
        try {
            const updated = await agendaService.updateContact(req.params.id, req.body);
            if (updated) {
                res.json({ message: 'Contacto actualizado exitosamente' });
            } else {
                res.status(404).json({ message: 'Contacto no encontrado' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Eliminar un contacto
    deleteContact: async (req, res) => {
        try {
            const deleted = await agendaService.deleteContact(req.params.id);
            if (deleted) {
                res.json({ message: 'Contacto eliminado exitosamente' });
            } else {
                res.status(404).json({ message: 'Contacto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = agendaController;
