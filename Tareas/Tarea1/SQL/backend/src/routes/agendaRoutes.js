const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

// Rutas para la API de la Agenda

// Obtener todos los contactos
router.get('/', agendaController.getAllContacts);

// Obtener un contacto por ID
router.get('/:id', agendaController.getContactById);

// Crear un nuevo contacto
router.post('/', agendaController.createContact);

// Actualizar un contacto
router.put('/:id', agendaController.updateContact);

// Eliminar un contacto
router.delete('/:id', agendaController.deleteContact);

module.exports = router;
