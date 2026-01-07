import express from 'express';
import * as whatsappController from '../controllers/whatsappController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: WhatsApp
 *   description: WhatsApp Business API services
 */

/**
 * @swagger
 * /api/whatsapp/send:
 *   post:
 *     summary: Send WhatsApp message
 *     tags: [WhatsApp]
 */
router.post('/send', whatsappController.sendWhatsAppMessage);

/**
 * @swagger
 * /api/whatsapp/send/bulk:
 *   post:
 *     summary: Send bulk WhatsApp messages
 *     tags: [WhatsApp]
 */
router.post('/send/bulk', whatsappController.sendBulkWhatsApp);

/**
 * @swagger
 * /api/whatsapp/send-with-template:
 *   post:
 *     summary: Send WhatsApp message using template
 *     tags: [WhatsApp]
 */
router.post('/send-with-template', whatsappController.sendWhatsAppWithTemplate);

/**
 * @swagger
 * /api/whatsapp/templates:
 *   post:
 *     summary: Create WhatsApp template
 *     tags: [WhatsApp]
 */
router.post('/templates', whatsappController.createWhatsAppTemplate);

/**
 * @swagger
 * /api/whatsapp/templates:
 *   get:
 *     summary: Get WhatsApp templates
 *     tags: [WhatsApp]
 */
router.get('/templates', whatsappController.getWhatsAppTemplates);

/**
 * @swagger
 * /api/whatsapp/status/{messageId}:
 *   get:
 *     summary: Get message status
 *     tags: [WhatsApp]
 */
router.get('/status/:messageId', whatsappController.getMessageStatus);

/**
 * @swagger
 * /api/whatsapp/history:
 *   get:
 *     summary: Get message history
 *     tags: [WhatsApp]
 */
router.get('/history', whatsappController.getMessageHistory);

/**
 * @swagger
 * /api/whatsapp/industry-message:
 *   post:
 *     summary: Send industry-specific WhatsApp message
 *     tags: [WhatsApp]
 */
router.post(
  '/industry-message',
  whatsappController.sendIndustrySpecificMessage
);

/**
 * @swagger
 * /api/whatsapp/chatbot:
 *   post:
 *     summary: Process chatbot message
 *     tags: [WhatsApp]
 */
router.post('/chatbot', whatsappController.processChatbotMessage);

export default router;
