const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Ruta principal - Listar usuarios
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users ORDER BY registration_date DESC');
    res.render('index', { users: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los usuarios');
  }
});

// Ruta para agregar un nuevo usuario
router.post('/add', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).send('Nombre y correo son requeridos');
  }
  try {
    await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al agregar el usuario');
  }
});

// Ruta para eliminar un usuario
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar el usuario');
  }
});

module.exports = router;
