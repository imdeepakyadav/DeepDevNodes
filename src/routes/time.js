import express from 'express';
import { getCountryTime } from '../controllers/timeController.js';

const router = express.Router();

/**
 * @swagger
 * /api/time/{country}:
 *   get:
 *     summary: Get current time for a country
 *     description: Retrieve the current time for a specific country or timezone
 *     tags: [Time]
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         schema:
 *           type: string
 *         description: Country code (e.g., US, IN, GB) or any identifier
 *         example: US
 *       - in: query
 *         name: tz
 *         schema:
 *           type: string
 *         description: Specific timezone override
 *         example: America/New_York
 *     responses:
 *       200:
 *         description: Country time retrieved successfully
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
 *                     country:
 *                       type: string
 *                       example: "US"
 *                     timezone:
 *                       type: string
 *                       example: "America/New_York"
 *                     time:
 *                       type: string
 *                       example: "Friday, December 1, 2023 at 03:30:45 PM"
 *                     offset:
 *                       type: string
 *                       example: "EST"
 *                     utc:
 *                       type: string
 *                       example: "2023-12-01T20:30:45.000Z"
 *                     timestamp:
 *                       type: integer
 *                       example: 1701460245
 *       400:
 *         description: Invalid country or timezone
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
router.get('/:country', getCountryTime);

export default router;
