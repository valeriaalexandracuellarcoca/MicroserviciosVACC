const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const config = require('./config');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection(config.db);

db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

app.post('/login', (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).send('Correo and password are required');
    }

    const query = 'SELECT * FROM usuarios WHERE correo = ?';

    db.query(query, [correo], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send('Internal server error');
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid credentials');
        }

        const user = results[0];

        // In a real application, you should hash passwords and compare the hash.
        if (password !== user.password) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user.id, correo: user.correo }, config.jwt_secret, { expiresIn: '1h' });

        res.json({ token });
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
