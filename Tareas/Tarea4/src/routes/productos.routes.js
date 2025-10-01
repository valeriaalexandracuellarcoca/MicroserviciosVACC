const express = require('express');
const router = express.Router();
const { 
    getAllProductos, 
    getProductoById, 
    createProducto, 
    updateProducto, 
    deleteProducto 
} = require('../controllers/productos.controller.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       required:
 *         - nombre
 *         - descripcion
 *         - marca
 *         - stock
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del producto.
 *         nombre:
 *           type: string
 *           description: Nombre del producto.
 *         descripcion:
 *           type: string
 *           description: Descripción detallada del producto.
 *         marca:
 *           type: string
 *           description: Marca del producto.
 *         stock:
 *           type: integer
 *           description: Cantidad disponible en inventario.
 *       example:
 *         id: 1
 *         nombre: "Laptop Pro"
 *         descripcion: "Laptop de alto rendimiento para profesionales"
 *         marca: "TechCo"
 *         stock: 150
 */

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: API para la gestión de productos.
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Retorna la lista de todos los productos
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: marca
 *         schema:
 *           type: string
 *         description: Filtra los productos por marca.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página para paginación.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de resultados por página.
 *     responses:
 *       200:
 *         description: La lista de productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */
router.get('/', getAllProductos);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Retorna un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del producto.
 *     responses:
 *       200:
 *         description: La descripción del producto por ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: El producto no fue encontrado.
 */
router.get('/:id', getProductoById);

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: El producto fue creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       400:
 *         description: Datos de entrada inválidos.
 */
router.post('/', createProducto);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualiza un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del producto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: El producto fue actualizado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: El producto no fue encontrado.
 */
router.put('/:id', updateProducto);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Elimina un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del producto.
 *     responses:
 *       204:
 *         description: El producto fue eliminado.
 *       404:
 *         description: El producto no fue encontrado.
 */
router.delete('/:id', deleteProducto);

module.exports = router;