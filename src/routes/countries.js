import express from "express";
import {
  getAllCountries,
  getCountryByCode,
} from "../controllers/countriesController.js";

const router = express.Router();

/**
 * @swagger
 * /api/countries:
 *   get:
 *     summary: Get all countries with filtering, sorting, and pagination
 *     description: Retrieve a list of countries with optional filtering, sorting, and pagination
 *     tags: [Countries]
 *     parameters:
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Filter by region (e.g., Asia, Europe, North America)
 *         example: Asia
 *       - in: query
 *         name: currency
 *         schema:
 *           type: string
 *         description: Filter by currency code (e.g., USD, EUR, INR)
 *         example: USD
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Filter by language (e.g., English, French, German)
 *         example: English
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in country name, capital, or language
 *         example: India
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by field (prefix with - for descending)
 *         example: name
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
 *         description: List of countries retrieved successfully
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
 *                     $ref: '#/components/schemas/Country'
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
 *                       example: 10
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
router.get("/", getAllCountries);

/**
 * @swagger
 * /api/countries/{code}:
 *   get:
 *     summary: Get country by code
 *     description: Retrieve details of a specific country by its ISO code
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: ISO country code (e.g., US, IN, GB)
 *         example: IN
 *     responses:
 *       200:
 *         description: Country details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Country'
 *       404:
 *         description: Country not found
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
router.get("/:code", getCountryByCode);

export default router;
