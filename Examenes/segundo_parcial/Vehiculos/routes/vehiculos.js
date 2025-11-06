const express = require('express');
const router = express.Router();
const Vehiculo = require('../models/vehiculo');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    try {
        const vehiculo = new Vehiculo(req.body);
        await vehiculo.save();
        res.status(201).send(vehiculo);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const vehiculos = await Vehiculo.find({});
        res.send(vehiculos);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findById(req.params.id);
        if (!vehiculo) {
            return res.status(404).send();
        }
        res.send(vehiculo);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['placa', 'tipo', 'capacidad', 'estado'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const vehiculo = await Vehiculo.findById(req.params.id);
        if (!vehiculo) {
            return res.status(404).send();
        }

        updates.forEach(update => vehiculo[update] = req.body[update]);
        await vehiculo.save();

        res.send(vehiculo);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findByIdAndDelete(req.params.id);

        if (!vehiculo) {
            return res.status(404).send();
        }

        res.send(vehiculo);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;