const express = require('express');
const router = express.Router();
const { 
    updateDetalle, 
    deleteDetalle 
} = require('../controllers/detallesFacturas.controller.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     DetalleFactura:
 *       type: object
 *       required:
 *         - factura_id
 *         - producto_id
 *         - cantidad
 *         - precio
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del detalle.
 *         factura_id:
 *           type: integer
 *           description: ID de la factura a la que pertenece el detalle.
 *         producto_id:
 *           type: integer
 *           description: ID del producto.
 *         cantidad:
 *           type: integer
 *           description: Cantidad del producto.
 *         precio:
 *           type: number
 *           format: float
 *           description: Precio unitario del producto en esta factura.
 *       example:
 *         id: 1
 *         factura_id: 1
 *         producto_id: 2
 *         cantidad: 2
 *         precio: 89.99
 */

/**
 * @swagger
 * tags:
 *   name: Detalles de Facturas
 *   description: API para la gestión de los detalles de las facturas.
 */

/**
 * @swagger
 * /detalles-facturas/{id}:
 *   put:
 *     summary: Actualiza un item de detalle de una factura por su ID
 *     tags: [Detalles de Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del detalle de la factura.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalleFactura'
 *     responses:
 *       200:
 *         description: El detalle fue actualizado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetalleFactura'
 *       404:
 *         description: El detalle o el producto no fueron encontrados.
 */
router.put('/:id', updateDetalle);

/**
 * @swagger
 * /detalles-facturas/{id}:
 *   delete:
 *     summary: Elimina un item de detalle de una factura por su ID
 *     tags: [Detalles de Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del detalle de la factura.
 *     responses:
 *       204:
 *         description: El detalle fue eliminado.
 *       404:
 *         description: El detalle no fue encontrado.
 */
router.delete('/:id', deleteDetalle);

module.exports = router;