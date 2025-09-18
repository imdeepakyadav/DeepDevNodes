import express from "express";
import {
  getAllQuotes,
  getQuotesByCategory,
  getRandomQuote,
} from "../controllers/quotesController.js";

const router = express.Router();

/**
 * @swagger
 * /api/quotes:
 *   get:
 *     summary: Get all quotes with filtering, sorting, and pagination
 *     description: Retrieve a list of quotes with optional filtering, sorting, and pagination
 *     tags: [Quotes]
 *     parameters:
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter by author name
 *         example: Steve Jobs
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category (inspiration, leadership, programming)
 *         example: inspiration
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in quote text or author name
 *         example: success
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by field (prefix with - for descending)
 *         example: author
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
 *         description: List of quotes retrieved successfully
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
 *                     $ref: '#/components/schemas/Quote'
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
router.get("/", getAllQuotes);

/**
 * @swagger
 * /api/quotes/random:
 *   get:
 *     summary: Get random quote
 *     description: Retrieve a random inspirational quote, optionally filtered by category
 *     tags: [Quotes]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter random quote by category
 *         example: inspiration
 *     responses:
 *       200:
 *         description: Random quote retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Quote'
 *       404:
 *         description: No quotes found for the specified category
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
router.get("/random", getRandomQuote);

/**
 * @swagger
 * /api/quotes/{category}:
 *   get:
 *     summary: Get quotes by category
 *     description: Retrieve quotes filtered by category with optional search, sorting, and pagination
 *     tags: [Quotes]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Quote category (inspiration, leadership, programming)
 *         example: inspiration
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search within the category
 *         example: success
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by field (prefix with - for descending)
 *         example: author
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
 *         description: Quotes retrieved successfully
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
 *                     $ref: '#/components/schemas/Quote'
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
 *                       example: 2
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *                     hasNext:
 *                       type: boolean
 *                       example: false
 *                     hasPrev:
 *                       type: boolean
 *                       example: false
 *       404:
 *         description: No quotes found for the category
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
router.get("/:category", getQuotesByCategory);

export default router;
