const express = require('express');
const router = express.Router();
const {
    getAllFacturas,
    getFacturaById,
    createFactura,
    updateFactura,
    deleteFactura
} = require('../controllers/facturas.controller.js');
const {
    getDetallesByFacturaId,
    addDetalleToFactura
} = require('../controllers/detallesFacturas.controller.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Factura:
 *       type: object
 *       required:
 *         - fecha
 *         - cliente_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado de la factura.
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de emisión de la factura.
 *         cliente_id:
 *           type: integer
 *           description: ID del cliente al que pertenece la factura.
 *       example:
 *         id: 1
 *         fecha: "2025-09-04"
 *         cliente_id: 1
 */

/**
 * @swagger
 * tags:
 *   name: Facturas
 *   description: API para la gestión de facturas.
 */

/**
 * @swagger
 * /facturas:
 *   get:
 *     summary: Retorna la lista de todas las facturas
 *     tags: [Facturas]
 *     responses:
 *       200:
 *         description: La lista de facturas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 */
router.get('/', getAllFacturas);

/**
 * @swagger
 * /facturas/{id}:
 *   get:
 *     summary: Retorna una factura por su ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la factura.
 *     responses:
 *       200:
 *         description: La descripción de la factura por ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       404:
 *         description: La factura no fue encontrada.
 */
router.get('/:id', getFacturaById);

/**
 * @swagger
 * /facturas:
 *   post:
 *     summary: Crea una nueva factura
 *     tags: [Facturas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       201:
 *         description: La factura fue creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       400:
 *         description: Datos de entrada inválidos.
 *       404:
 *         description: El cliente asociado no fue encontrado.
 */
router.post('/', createFactura);

/**
 * @swagger
 * /facturas/{id}:
 *   put:
 *     summary: Actualiza una factura por su ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la factura.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       200:
 *         description: La factura fue actualizada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       404:
 *         description: La factura o el cliente no fueron encontrados.
 */
router.put('/:id', updateFactura);

/**
 * @swagger
 * /facturas/{id}:
 *   delete:
 *     summary: Elimina una factura por su ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la factura.
 *     responses:
 *       204:
 *         description: La factura fue eliminada.
 *       404:
 *         description: La factura no fue encontrada.
 */
router.delete('/:id', deleteFactura);

// Rutas para detalles de factura

/**
 * @swagger
 * /facturas/{factura_id}/detalles:
 *   get:
 *     summary: Retorna todos los detalles de una factura específica
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: factura_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la factura.
 *     responses:
 *       200:
 *         description: Una lista de los detalles de la factura.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalleFactura'
 *       404:
 *         description: La factura no fue encontrada.
 */
router.get('/:factura_id/detalles', getDetallesByFacturaId);

/**
 * @swagger
 * /facturas/{factura_id}/detalles:
 *   post:
 *     summary: Añade un nuevo detalle a una factura
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: factura_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la factura.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalleFactura'
 *     responses:
 *       201:
 *         description: El detalle fue añadido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetalleFactura'
 *       400:
 *         description: Datos de entrada inválidos.
 *       404:
 *         description: La factura o el producto no fueron encontrados.
 */
router.post('/:factura_id/detalles', addDetalleToFactura);

module.exports = router;