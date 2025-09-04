const { productos } = require('../models/data.js');

//obtener todos los productos (con paginación y filtrado)
const getAllProductos = (req, res) => {
    const { marca, page = 1, limit = 10 } = req.query;
    let productosFiltrados = productos;

    if (marca) {
        productosFiltrados = productosFiltrados.filter(p => p.marca.toLowerCase() === marca.toLowerCase());
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = productosFiltrados.slice(startIndex, endIndex);

    res.json({
        total: results.length,
        page: parseInt(page),
        limit: parseInt(limit),
        data: results
    });
};

//obtener un producto por ID
const getProductoById = (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(producto);
};

//crear un nuevo producto
const createProducto = (req, res) => {
    const { nombre, descripcion, marca, stock } = req.body;
    if (!nombre || !descripcion || !marca || stock === undefined) {
        return res.status(400).json({ message: 'Todos los campos son requeridos: nombre, descripcion, marca, stock' });
    }

    const newProducto = {
        id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
        nombre,
        descripcion,
        marca,
        stock
    };

    productos.push(newProducto);
    res.status(201).json(newProducto);
};

//actualizar un producto
const updateProducto = (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const { nombre, descripcion, marca, stock } = req.body;
    producto.nombre = nombre || producto.nombre;
    producto.descripcion = descripcion || producto.descripcion;
    producto.marca = marca || producto.marca;
    producto.stock = stock !== undefined ? stock : producto.stock;

    res.json(producto);
};

//eliminar un producto
const deleteProducto = (req, res) => {
    const productoIndex = productos.findIndex(p => p.id === parseInt(req.params.id));
    if (productoIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    productos.splice(productoIndex, 1);
    res.status(204).send();
};

module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};