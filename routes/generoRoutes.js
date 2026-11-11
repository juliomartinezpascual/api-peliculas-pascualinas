const { Router } = require('express')
const { getGeneros, getGeneroById, crearGenero, actualizarGenero, cambiarEstadoGenero, borrarGenero } = require('../controllers/generoController')

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Generos
 *   description: Endpoints para gestión de géneros
 */

/**
 * @swagger
 * /api/v1/generos:
 *   get:
 *     summary: Listar todos los géneros
 *     tags: [Generos]
 *     responses:
 *       200:
 *         description: Lista de géneros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genero'
 *       500:
 *         description: Error general
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getGeneros)

/**
 * @swagger
 * /api/v1/generos/{id}:
 *   get:
 *     summary: Consultar género por ID
 *     tags: [Generos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del género
 *     responses:
 *       200:
 *         description: Género encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Género no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error general
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getGeneroById)

/**
 * @swagger
 * /api/v1/generos/crear:
 *   post:
 *     summary: Crear un género
 *     tags: [Generos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GeneroInput'
 *     responses:
 *       201:
 *         description: Género creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 *       400:
 *         description: Validación fallida o género duplicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error general
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/crear', crearGenero)

/**
 * @swagger
 * /api/v1/generos/{id}:
 *   put:
 *     summary: Actualizar un género
 *     tags: [Generos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del género
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GeneroInput'
 *     responses:
 *       200:
 *         description: Género actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 *       400:
 *         description: Validación fallida, ID inválido o género duplicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Género no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error general
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', actualizarGenero)

/**
 * @swagger
 * /api/v1/generos/estado/{id}:
 *   patch:
 *     summary: Habilitar o deshabilitar un género
 *     tags: [Generos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del género
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstadoInput'
 *     responses:
 *       200:
 *         description: Estado actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 *       400:
 *         description: Estado inválido o ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Género no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error general
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/estado/:id', cambiarEstadoGenero)

/**
 * @swagger
 * /api/v1/generos/{id}:
 *   delete:
 *     summary: Borrar un género por ID
 *     tags: [Generos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del género
 *     responses:
 *       200:
 *         description: Género eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Género eliminado
 *                 genero:
 *                   $ref: '#/components/schemas/Genero'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Género no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error general
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', borrarGenero)

module.exports = router
