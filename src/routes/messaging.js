import express from 'express';
import * as messagingController from '../controllers/messagingController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messaging
 *   description: SMS and OTP services
 */

/**
 * @swagger
 * /api/messaging/sms/send:
 *   post:
 *     summary: Send SMS
 *     tags: [Messaging]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - message
 *               - type
 *             properties:
 *               to:
 *                 type: string
 *               message:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [OTP, PROMOTIONAL, TRANSACTIONAL, INTERNATIONAL, SMART, SIM_BASED]
 *               from:
 *                 type: string
 *               country:
 *                 type: string
 *               priority:
 *                 type: string
 *               scheduledAt:
 *                 type: string
 *     responses:
 *       201:
 *         description: SMS sent successfully
 */
router.post('/sms/send', messagingController.sendSMS);

/**
 * @swagger
 * /api/messaging/sms/bulk:
 *   post:
 *     summary: Send bulk SMS
 *     tags: [Messaging]
 */
router.post('/sms/bulk', messagingController.sendBulkSMS);

/**
 * @swagger
 * /api/messaging/sms/status/{messageId}:
 *   get:
 *     summary: Get SMS status
 *     tags: [Messaging]
 */
router.get('/sms/status/:messageId', messagingController.getSMSStatus);

/**
 * @swagger
 * /api/messaging/sms/history:
 *   get:
 *     summary: Get SMS history
 *     tags: [Messaging]
 */
router.get('/sms/history', messagingController.getSMSHistory);

/**
 * @swagger
 * /api/messaging/otp/generate:
 *   post:
 *     summary: Generate and send OTP
 *     tags: [Messaging]
 */
router.post('/otp/generate', messagingController.generateOTP);

/**
 * @swagger
 * /api/messaging/otp/verify:
 *   post:
 *     summary: Verify OTP
 *     tags: [Messaging]
 */
router.post('/otp/verify', messagingController.verifyOTP);

/**
 * @swagger
 * /api/messaging/templates:
 *   post:
 *     summary: Create SMS template
 *     tags: [Messaging]
 */
router.post('/templates', messagingController.createSMSTemplate);

/**
 * @swagger
 * /api/messaging/templates:
 *   get:
 *     summary: Get all SMS templates
 *     tags: [Messaging]
 */
router.get('/templates', messagingController.getSMSTemplates);

/**
 * @swagger
 * /api/messaging/sms/send-with-template:
 *   post:
 *     summary: Send SMS using template
 *     tags: [Messaging]
 */
router.post('/sms/send-with-template', messagingController.sendSMSWithTemplate);

export default router;
