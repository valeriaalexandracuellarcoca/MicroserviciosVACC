const { facturas, clientes } = require('../models/data.js');

//obtener todas las facturas
const getAllFacturas = (req, res) => {
    res.json(facturas);
};

//obtener una factura por ID
const getFacturaById = (req, res) => {
    const factura = facturas.find(f => f.id === parseInt(req.params.id));
    if (!factura) {
        return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.json(factura);
};

//crear una nueva factura
const createFactura = (req, res) => {
    const { fecha, cliente_id } = req.body;
    if (!fecha || !cliente_id) {
        return res.status(400).json({ message: 'Todos los campos son requeridos: fecha, cliente_id' });
    }

    //validar que el cliente exista
    const cliente = clientes.find(c => c.id === parseInt(cliente_id));
    if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    const newFactura = {
        id: facturas.length > 0 ? facturas[facturas.length - 1].id + 1 : 1,
        fecha,
        cliente_id
    };

    facturas.push(newFactura);
    res.status(201).json(newFactura);
};

//actualizar una factura
const updateFactura = (req, res) => {
    const factura = facturas.find(f => f.id === parseInt(req.params.id));
    if (!factura) {
        return res.status(404).json({ message: 'Factura no encontrada' });
    }

    const { fecha, cliente_id } = req.body;

    if (cliente_id) {
        const cliente = clientes.find(c => c.id === parseInt(cliente_id));
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado para actualizar' });
        }
        factura.cliente_id = cliente_id;
    }

    factura.fecha = fecha || factura.fecha;

    res.json(factura);
};

//eliminar una factura
const deleteFactura = (req, res) => {
    const facturaIndex = facturas.findIndex(f => f.id === parseInt(req.params.id));
    if (facturaIndex === -1) {
        return res.status(404).json({ message: 'Factura no encontrada' });
    }

    facturas.splice(facturaIndex, 1);
    res.status(204).send();
};

//obtener todas las facturas de un cliente específico
const getFacturasByCliente = (req, res) => {
    const clienteId = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    const facturasCliente = facturas.filter(f => f.cliente_id === clienteId);
    res.json(facturasCliente);
};


module.exports = {
    getAllFacturas,
    getFacturaById,
    createFactura,
    updateFactura,
    deleteFactura,
    getFacturasByCliente
};