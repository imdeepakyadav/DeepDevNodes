import express from 'express';
import {
  generateBarcode,
  generateLoremIpsum,
  generateQRCode,
  generateRandomNumber,
  generateUUID,
} from '../controllers/utilitiesController.js';

const router = express.Router();

/**
 * @swagger
 * /api/utils/uuid:
 *   get:
 *     summary: Generate UUID
 *     description: Generate a random UUID v4
 *     tags: [Utilities]
 *     responses:
 *       200:
 *         description: UUID generated successfully
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
 *                     uuid:
 *                       type: string
 *                       example: "550e8400-e29b-41d4-a716-446655440000"
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
router.get('/uuid', generateUUID);

/**
 * @swagger
 * /api/utils/lorem:
 *   get:
 *     summary: Generate Lorem Ipsum text
 *     description: Generate Lorem Ipsum placeholder text
 *     tags: [Utilities]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [paragraphs, sentences, words]
 *         description: Type of Lorem Ipsum text to generate
 *         example: paragraphs
 *       - in: query
 *         name: count
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *         description: Number of paragraphs, sentences, or words to generate
 *         example: 2
 *     responses:
 *       200:
 *         description: Lorem Ipsum text generated successfully
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
 *                     type:
 *                       type: string
 *                       example: "paragraphs"
 *                     count:
 *                       type: integer
 *                       example: 2
 *                     text:
 *                       type: string
 *                       example: "Lorem ipsum dolor sit amet..."
 *       400:
 *         description: Invalid parameters
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
router.get('/lorem', generateLoremIpsum);

/**
 * @swagger
 * /api/utils/random:
 *   get:
 *     summary: Generate random number
 *     description: Generate a random number within a specified range
 *     tags: [Utilities]
 *     parameters:
 *       - in: query
 *         name: min
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Minimum value (inclusive)
 *         example: 1
 *       - in: query
 *         name: max
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Maximum value (inclusive)
 *         example: 100
 *     responses:
 *       200:
 *         description: Random number generated successfully
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
 *                     number:
 *                       type: integer
 *                       example: 42
 *                     min:
 *                       type: integer
 *                       example: 1
 *                     max:
 *                       type: integer
 *                       example: 100
 *                     timestamp:
 *                       type: string
 *                       example: "2023-12-01T10:00:00.000Z"
 *       400:
 *         description: Invalid parameters
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
router.get('/random', generateRandomNumber);

/**
 * @swagger
 * /api/utils/qr:
 *   get:
 *     summary: Generate QR code
 *     description: Generate a QR code from text data
 *     tags: [Utilities]
 *     parameters:
 *       - in: query
 *         name: text
 *         required: true
 *         schema:
 *           type: string
 *         description: Text to encode in the QR code
 *         example: "Hello, World!"
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 256
 *           minimum: 100
 *           maximum: 1000
 *         description: Size of the QR code in pixels
 *         example: 256
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [png, jpg, svg]
 *           default: png
 *         description: Format of the QR code image
 *         example: png
 *     responses:
 *       200:
 *         description: QR code generated successfully
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
 *                     text:
 *                       type: string
 *                       example: "Hello, World!"
 *                     qr_code_url:
 *                       type: string
 *                       example: "https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=Hello%2C%20World%21"
 *                     size:
 *                       type: integer
 *                       example: 256
 *                     format:
 *                       type: string
 *                       example: "png"
 *                     generated_at:
 *                       type: string
 *                       example: "2023-12-01T10:00:00.000Z"
 *                     note:
 *                       type: string
 *                       example: 'QR codes generated dynamically'
 *       400:
 *         description: Invalid parameters
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
router.get('/qr', generateQRCode);

/**
 * @swagger
 * /api/utils/barcode:
 *   get:
 *     summary: Generate barcode
 *     description: Generate a barcode from data
 *     tags: [Utilities]
 *     parameters:
 *       - in: query
 *         name: data
 *         required: true
 *         schema:
 *           type: string
 *         description: Data to encode in the barcode
 *         example: "123456789"
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [code128, code39, ean13, ean8, upca, upce]
 *           default: code128
 *         description: Type of barcode to generate
 *         example: code128
 *       - in: query
 *         name: width
 *         schema:
 *           type: integer
 *           default: 2
 *           minimum: 1
 *           maximum: 10
 *         description: Width scale factor
 *         example: 2
 *       - in: query
 *         name: height
 *         schema:
 *           type: integer
 *           default: 100
 *           minimum: 10
 *           maximum: 500
 *         description: Height of the barcode in pixels
 *         example: 100
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [png, jpg, svg]
 *           default: png
 *         description: Format of the barcode image
 *         example: png
 *     responses:
 *       200:
 *         description: Barcode generated successfully
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
 *                     data:
 *                       type: string
 *                       example: "123456789"
 *                     barcode_type:
 *                       type: string
 *                       example: "code128"
 *                     barcode_url:
 *                       type: string
 *                       example: "https://bwipjs-api.metafloor.com/?bcid=code128&text=123456789&scale=2&height=100&includetext&guardwhitespace"
 *                     width:
 *                       type: integer
 *                       example: 2
 *                     height:
 *                       type: integer
 *                       example: 100
 *                     format:
 *                       type: string
 *                       example: "png"
 *                     generated_at:
 *                       type: string
 *                       example: "2023-12-01T10:00:00.000Z"
 *                     note:
 *                       type: string
 *                       example: 'Barcode generated dynamically'
 *       400:
 *         description: Invalid parameters
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
router.get('/barcode', generateBarcode);

export default router;
