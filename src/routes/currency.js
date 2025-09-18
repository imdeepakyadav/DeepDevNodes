import express from "express";
import { convertCurrency } from "../controllers/currencyController.js";

const router = express.Router();

/**
 * @swagger
 * /api/currency/convert:
 *   get:
 *     summary: Convert currency
 *     description: Convert an amount from one currency to another
 *     tags: [Currency]
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *         description: Source currency code (e.g., USD, EUR, GBP, INR)
 *         example: USD
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *         description: Target currency code (e.g., USD, EUR, GBP, INR)
 *         example: EUR
 *       - in: query
 *         name: amount
 *         required: true
 *         schema:
 *           type: number
 *           minimum: 0.01
 *         description: Amount to convert
 *         example: 100
 *     responses:
 *       200:
 *         description: Currency conversion successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     from:
 *                       type: string
 *                       example: "USD"
 *                     to:
 *                       type: string
 *                       example: "EUR"
 *                     amount:
 *                       type: number
 *                       example: 100
 *                     rate:
 *                       type: number
 *                       example: 0.85
 *                     convertedAmount:
 *                       type: number
 *                       example: 85
 *                     inverseRate:
 *                       type: number
 *                       example: 1.18
 *                     timestamp:
 *                       type: string
 *                       example: "2023-12-01T10:00:00.000Z"
 *                     note:
 *                       type: string
 *                       example: "Exchange rates are for demonstration purposes only"
 *       400:
 *         description: Invalid parameters or unsupported currencies
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
router.get("/convert", convertCurrency);

export default router;
