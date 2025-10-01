const express = require('express');
const router = express.Router();
const { 
    getAllClientes, 
    getClienteById, 
    createCliente, 
    updateCliente, 
    deleteCliente 
} = require('../controllers/clientes.controller.js');
const { getFacturasByCliente } = require('../controllers/facturas.controller.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       required:
 *         - ci
 *         - nombres
 *         - apellidos
 *         - sexo
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del cliente.
 *         ci:
 *           type: string
 *           description: Cédula de identidad del cliente.
 *         nombres:
 *           type: string
 *           description: Nombres del cliente.
 *         apellidos:
 *           type: string
 *           description: Apellidos del cliente.
 *         sexo:
 *           type: string
 *           description: Sexo del cliente (M/F).
 *       example:
 *         id: 1
 *         ci: "12345678"
 *         nombres: "Juan"
 *         apellidos: "Pérez"
 *         sexo: "M"
 */

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: API para la gestión de clientes.
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Retorna la lista de todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: La lista de clientes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 */
router.get('/', getAllClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Retorna un cliente por su ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del cliente.
 *     responses:
 *       200:
 *         description: La descripción del cliente por ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: El cliente no fue encontrado.
 */
router.get('/:id', getClienteById);

/**
 * @swagger
 * /clientes/{id}/facturas:
 *   get:
 *     summary: Retorna todas las facturas de un cliente específico
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del cliente.
 *     responses:
 *       200:
 *         description: Una lista de facturas del cliente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 *       404:
 *         description: El cliente no fue encontrado.
 */
router.get('/:id/facturas', getFacturasByCliente);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: El cliente fue creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Datos de entrada inválidos.
 */
router.post('/', createCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Actualiza un cliente por su ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del cliente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: El cliente fue actualizado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: El cliente no fue encontrado.
 */
router.put('/:id', updateCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Elimina un cliente por su ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del cliente.
 *     responses:
 *       204:
 *         description: El cliente fue eliminado.
 *       404:
 *         description: El cliente no fue encontrado.
 */
router.delete('/:id', deleteCliente);

module.exports = router;