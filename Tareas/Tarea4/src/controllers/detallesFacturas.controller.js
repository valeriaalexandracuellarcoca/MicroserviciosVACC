const { detallesFacturas, facturas, productos } = require('../models/data.js');

// Obtener todos los detalles de una factura específica
const getDetallesByFacturaId = (req, res) => {
    const facturaId = parseInt(req.params.factura_id);
    const factura = facturas.find(f => f.id === facturaId);
    if (!factura) {
        return res.status(404).json({ message: 'Factura no encontrada' });
    }

    const detalles = detallesFacturas.filter(d => d.factura_id === facturaId);
    res.json(detalles);
};

// Añadir un detalle a una factura
const addDetalleToFactura = (req, res) => {
    const facturaId = parseInt(req.params.factura_id);
    const { producto_id, cantidad, precio } = req.body;

    const factura = facturas.find(f => f.id === facturaId);
    if (!factura) {
        return res.status(404).json({ message: 'Factura no encontrada' });
    }

    const producto = productos.find(p => p.id === parseInt(producto_id));
    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (!cantidad || !precio) {
        return res.status(400).json({ message: 'Los campos cantidad y precio son requeridos' });
    }

    const newDetalle = {
        id: detallesFacturas.length > 0 ? detallesFacturas[detallesFacturas.length - 1].id + 1 : 1,
        factura_id: facturaId,
        producto_id,
        cantidad,
        precio
    };

    detallesFacturas.push(newDetalle);
    res.status(201).json(newDetalle);
};

// Actualizar un detalle de factura
const updateDetalle = (req, res) => {
    const detalleId = parseInt(req.params.id);
    const detalle = detallesFacturas.find(d => d.id === detalleId);

    if (!detalle) {
        return res.status(404).json({ message: 'Detalle de factura no encontrado' });
    }

    const { producto_id, cantidad, precio } = req.body;

    if (producto_id) {
        const producto = productos.find(p => p.id === parseInt(producto_id));
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
        }
        detalle.producto_id = producto_id;
    }

    detalle.cantidad = cantidad || detalle.cantidad;
    detalle.precio = precio || detalle.precio;

    res.json(detalle);
};

// Eliminar un detalle de factura
const deleteDetalle = (req, res) => {
    const detalleId = parseInt(req.params.id);
    const detalleIndex = detallesFacturas.findIndex(d => d.id === detalleId);

    if (detalleIndex === -1) {
        return res.status(404).json({ message: 'Detalle de factura no encontrado' });
    }

    detallesFacturas.splice(detalleIndex, 1);
    res.status(204).send();
};

module.exports = {
    getDetallesByFacturaId,
    addDetalleToFactura,
    updateDetalle,
    deleteDetalle
};