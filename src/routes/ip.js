import express from 'express';
import { getClientIP, getIPDetails } from '../controllers/ipController.js';

const router = express.Router();

/**
 * @swagger
 * /api/ip:
 *   get:
 *     summary: Get client IP address
 *     description: Retrieve the client's IP address and basic information
 *     tags: [IP]
 *     parameters:
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Comma-separated list of fields
 *         example: ip,timestamp
 *     responses:
 *       200:
 *         description: Client IP information retrieved successfully
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
 *                     ip:
 *                       type: string
 *                       example: "192.168.1.1"
 *                     userAgent:
 *                       type: string
 *                       example: "Mozilla/5.0..."
 *                     timestamp:
 *                       type: string
 *                       example: "2023-12-01T10:00:00.000Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getClientIP);

/**
 * @swagger
 * /api/ip/{ip}:
 *   get:
 *     summary: Get IP address details
 *     description: Retrieve detailed information about a specific IP address
 *     tags: [IP]
 *     parameters:
 *       - in: path
 *         name: ip
 *         required: true
 *         schema:
 *           type: string
 *         description: IP address to lookup
 *         example: 8.8.8.8
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Comma-separated list of fields
 *         example: city,country,isp
 *     responses:
 *       200:
 *         description: IP details retrieved successfully
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
 *                     ip:
 *                       type: string
 *                       example: "8.8.8.8"
 *                     hostname:
 *                       type: string
 *                       example: "dns.google"
 *                     city:
 *                       type: string
 *                       example: "Mountain View"
 *                     region:
 *                       type: string
 *                       example: "California"
 *                     country:
 *                       type: string
 *                       example: "US"
 *                     country_name:
 *                       type: string
 *                       example: "United States"
 *                     timezone:
 *                       type: string
 *                       example: "America/Los_Angeles"
 *                     isp:
 *                       type: string
 *                       example: "Google LLC"
 *                     latitude:
 *                       type: number
 *                       example: 37.386
 *                     longitude:
 *                       type: number
 *                       example: -122.084
 *                     timestamp:
 *                       type: string
 *                       example: "2023-12-01T10:00:00.000Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:ip', getIPDetails);

export default router;
