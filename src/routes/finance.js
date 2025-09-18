import express from 'express';
import {
  convertCurrency,
  getAllCrypto,
  getAllStocks,
  getCryptoBySymbol,
  getStockBySymbol,
} from '../controllers/financeController.js';

const router = express.Router();

/**
 * @swagger
 * /api/crypto:
 *   get:
 *     summary: Get all cryptocurrencies
 *     tags: [Finance]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of cryptocurrencies to return
 *         example: 5
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [rank, price, market_cap, change_percent]
 *           default: rank
 *         description: Sort cryptocurrencies by field
 *         example: market_cap
 *     responses:
 *       200:
 *         description: Cryptocurrency data retrieved successfully
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
 *                     type: object
 *                     properties:
 *                       symbol:
 *                         type: string
 *                         example: "BTC"
 *                       name:
 *                         type: string
 *                         example: "Bitcoin"
 *                       price:
 *                         type: number
 *                         example: 45123.45
 *                       change_24h:
 *                         type: number
 *                         example: 2.34
 *                       change_percent_24h:
 *                         type: number
 *                         example: 5.47
 *                       market_cap:
 *                         type: number
 *                         example: 887654321098
 *                       rank:
 *                         type: integer
 *                         example: 1
 *                 message:
 *                   type: string
 *                   example: "Cryptocurrency data retrieved successfully"
 */
router.get('/crypto', getAllCrypto);

/**
 * @swagger
 * /api/crypto/{symbol}:
 *   get:
 *     summary: Get cryptocurrency by symbol
 *     tags: [Finance]
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Cryptocurrency symbol (e.g., BTC, ETH)
 *         example: "BTC"
 *     responses:
 *       200:
 *         description: Cryptocurrency data retrieved successfully
 *       404:
 *         description: Cryptocurrency not found
 */
router.get('/crypto/:symbol', getCryptoBySymbol);

/**
 * @swagger
 * /api/stocks:
 *   get:
 *     summary: Get all stocks
 *     tags: [Finance]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of stocks to return
 *         example: 5
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [symbol, price, change_percent, market_cap]
 *           default: symbol
 *         description: Sort stocks by field
 *         example: price
 *       - in: query
 *         name: sector
 *         schema:
 *           type: string
 *         description: Filter by sector
 *         example: "Technology"
 *     responses:
 *       200:
 *         description: Stock data retrieved successfully
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
 *                     type: object
 *                     properties:
 *                       symbol:
 *                         type: string
 *                         example: "AAPL"
 *                       name:
 *                         type: string
 *                         example: "Apple Inc."
 *                       price:
 *                         type: number
 *                         example: 175.43
 *                       change:
 *                         type: number
 *                         example: 2.15
 *                       change_percent:
 *                         type: number
 *                         example: 1.24
 *                       sector:
 *                         type: string
 *                         example: "Technology"
 *                       market_cap:
 *                         type: number
 *                         example: 2750000000000
 *                 message:
 *                   type: string
 *                   example: "Stock data retrieved successfully"
 */
router.get('/stocks', getAllStocks);

/**
 * @swagger
 * /api/stocks/{symbol}:
 *   get:
 *     summary: Get stock by symbol
 *     tags: [Finance]
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Stock symbol (e.g., AAPL, GOOGL)
 *         example: "AAPL"
 *     responses:
 *       200:
 *         description: Stock data retrieved successfully
 *       404:
 *         description: Stock not found
 */
router.get('/stocks/:symbol', getStockBySymbol);

/**
 * @swagger
 * /api/currency/convert:
 *   get:
 *     summary: Convert currency
 *     tags: [Finance]
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           default: USD
 *         description: Source currency code
 *         example: "USD"
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           default: EUR
 *         description: Target currency code
 *         example: "EUR"
 *       - in: query
 *         name: amount
 *         schema:
 *           type: number
 *           default: 1
 *         description: Amount to convert
 *         example: 100
 *     responses:
 *       200:
 *         description: Currency conversion completed successfully
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
 *                     converted_amount:
 *                       type: number
 *                       example: 85
 *                     timestamp:
 *                       type: string
 *                       example: "2025-09-17T12:00:00.000Z"
 *                     note:
 *                       type: string
 *                       example: 'Exchange rates are for demonstration'
 *                 message:
 *                   type: string
 *                   example: "Currency conversion completed successfully"
 *       400:
 *         description: Invalid parameters or unsupported currency pair
 */
router.get('/currency/convert', convertCurrency);

export default router;
