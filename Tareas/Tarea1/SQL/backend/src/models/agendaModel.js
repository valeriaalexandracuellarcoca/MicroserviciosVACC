const { pool } = require('../config/db');

// Modelo para interactuar con la tabla Agenda
const agendaModel = {
    // Obtener todos los contactos
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM Agenda');
        return rows;
    },

    // Obtener un contacto por ID
    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM Agenda WHERE id = ?', [id]);
        return rows[0];
    },

    // Crear un nuevo contacto
    create: async (contacto) => {
        const { nombres, apellidos, fecha_nacimiento, direccion, celular, correo } = contacto;
        const [result] = await pool.query(
            'INSERT INTO Agenda (nombres, apellidos, fecha_nacimiento, direccion, celular, correo) VALUES (?, ?, ?, ?, ?, ?)',
            [nombres, apellidos, fecha_nacimiento, direccion, celular, correo]
        );
        return { id: result.insertId, ...contacto };
    },

    // Actualizar un contacto existente
    update: async (id, contacto) => {
        const { nombres, apellidos, fecha_nacimiento, direccion, celular, correo } = contacto;
        const [result] = await pool.query(
            'UPDATE Agenda SET nombres = ?, apellidos = ?, fecha_nacimiento = ?, direccion = ?, celular = ?, correo = ? WHERE id = ?',
            [nombres, apellidos, fecha_nacimiento, direccion, celular, correo, id]
        );
        return result.affectedRows > 0;
    },

    // Eliminar un contacto
    remove: async (id) => {
        const [result] = await pool.query('DELETE FROM Agenda WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = agendaModel;
