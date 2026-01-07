import express from 'express';
import * as qrcodeController from '../controllers/qrcodeController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: QRCode
 *   description: QR code generation and management
 */

/**
 * @swagger
 * /api/qrcode/generate:
 *   post:
 *     summary: Generate QR code
 *     tags: [QRCode]
 */
router.post('/generate', qrcodeController.generateQRCode);

/**
 * @swagger
 * /api/qrcode/generate/bulk:
 *   post:
 *     summary: Generate bulk QR codes
 *     tags: [QRCode]
 */
router.post('/generate/bulk', qrcodeController.generateBulkQRCodes);

/**
 * @swagger
 * /api/qrcode/{qrId}:
 *   get:
 *     summary: Get QR code
 *     tags: [QRCode]
 */
router.get('/:qrId', qrcodeController.getQRCode);

/**
 * @swagger
 * /api/qrcode:
 *   get:
 *     summary: List QR codes
 *     tags: [QRCode]
 */
router.get('/', qrcodeController.listQRCodes);

/**
 * @swagger
 * /api/qrcode/{qrId}:
 *   put:
 *     summary: Update QR code
 *     tags: [QRCode]
 */
router.put('/:qrId', qrcodeController.updateQRCode);

/**
 * @swagger
 * /api/qrcode/{qrId}:
 *   delete:
 *     summary: Delete QR code
 *     tags: [QRCode]
 */
router.delete('/:qrId', qrcodeController.deleteQRCode);

/**
 * @swagger
 * /api/qrcode/{qrId}/scan:
 *   post:
 *     summary: Track QR code scan
 *     tags: [QRCode]
 */
router.post('/:qrId/scan', qrcodeController.trackQRCodeScan);

/**
 * @swagger
 * /api/qrcode/{qrId}/analytics:
 *   get:
 *     summary: Get QR code analytics
 *     tags: [QRCode]
 */
router.get('/:qrId/analytics', qrcodeController.getQRCodeAnalytics);

export default router;
