import express from 'express';
import {
  getAllJokes,
  getDevJoke,
  getRandomJoke,
} from '../controllers/jokesController.js';

const router = express.Router();

/**
 * @swagger
 * /api/jokes:
 *   get:
 *     summary: Get all jokes with filtering and pagination
 *     description: Retrieve a list of jokes
 *     tags: [Jokes]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [dev, general, science]
 *         description: Filter by joke type/category
 *         example: dev
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in joke text
 *         example: bug
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of results per page
 *         example: 10
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *         example: 1
 *     responses:
 *       200:
 *         description: List of jokes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Joke'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 7
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *                     hasNext:
 *                       type: boolean
 *                       example: false
 *                     hasPrev:
 *                       type: boolean
 *                       example: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getAllJokes);

/**
 * @swagger
 * /api/jokes/random:
 *   get:
 *     summary: Get random joke
 *     description: Retrieve a random joke, optionally filtered by type
 *     tags: [Jokes]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [dev, general]
 *         description: Filter random joke by type
 *         example: dev
 *     responses:
 *       200:
 *         description: Random joke retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Joke'
 *       404:
 *         description: No jokes found for the specified type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/random', getRandomJoke);

/**
 * @swagger
 * /api/jokes/dev:
 *   get:
 *     summary: Get programming joke
 *     description: Retrieve a random programming-related joke
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Programming joke retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Joke'
 *       404:
 *         description: No programming jokes found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/dev', getDevJoke);

export default router;
