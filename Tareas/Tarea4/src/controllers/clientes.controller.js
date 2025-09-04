const { clientes } = require('../models/data.js');

//obtener todos los clientes
const getAllClientes = (req, res) => {
    res.json(clientes);
};

//obtener un cliente por ID
const getClienteById = (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(cliente);
};

//crear un nuevo cliente
const createCliente = (req, res) => {
    const { ci, nombres, apellidos, sexo } = req.body;
    if (!ci || !nombres || !apellidos || !sexo) {
        return res.status(400).json({ message: 'Todos los campos son requeridos: ci, nombres, apellidos, sexo' });
    }

    const newCliente = {
        id: clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1,
        ci,
        nombres,
        apellidos,
        sexo
    };

    clientes.push(newCliente);
    res.status(201).json(newCliente);
};

//actualizar un cliente
const updateCliente = (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    const { ci, nombres, apellidos, sexo } = req.body;
    cliente.ci = ci || cliente.ci;
    cliente.nombres = nombres || cliente.nombres;
    cliente.apellidos = apellidos || cliente.apellidos;
    cliente.sexo = sexo || cliente.sexo;

    res.json(cliente);
};

//eliminar un cliente
const deleteCliente = (req, res) => {
    const clienteIndex = clientes.findIndex(c => c.id === parseInt(req.params.id));
    if (clienteIndex === -1) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    clientes.splice(clienteIndex, 1);
    res.status(204).send();
};

module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};