import express from 'express';
import * as automationController from '../controllers/automationController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Automation
 *   description: Lead and campaign automation services
 */

// Lead Management
/**
 * @swagger
 * /api/automation/leads:
 *   post:
 *     summary: Create lead
 *     tags: [Automation]
 */
router.post('/leads', automationController.createLead);

/**
 * @swagger
 * /api/automation/leads/{leadId}:
 *   get:
 *     summary: Get lead
 *     tags: [Automation]
 */
router.get('/leads/:leadId', automationController.getLead);

/**
 * @swagger
 * /api/automation/leads:
 *   get:
 *     summary: List leads
 *     tags: [Automation]
 */
router.get('/leads', automationController.listLeads);

/**
 * @swagger
 * /api/automation/leads/{leadId}:
 *   put:
 *     summary: Update lead
 *     tags: [Automation]
 */
router.put('/leads/:leadId', automationController.updateLead);

/**
 * @swagger
 * /api/automation/leads/{leadId}/notes:
 *   post:
 *     summary: Add note to lead
 *     tags: [Automation]
 */
router.post('/leads/:leadId/notes', automationController.addLeadNote);

/**
 * @swagger
 * /api/automation/leads/analytics:
 *   get:
 *     summary: Get lead analytics
 *     tags: [Automation]
 */
router.get('/leads-analytics', automationController.getLeadAnalytics);

/**
 * @swagger
 * /api/automation/webhook/lead:
 *   post:
 *     summary: Process lead webhook (Facebook, Google, IndiaMart, etc.)
 *     tags: [Automation]
 */
router.post('/webhook/lead', automationController.processLeadWebhook);

// Campaign Management
/**
 * @swagger
 * /api/automation/campaigns:
 *   post:
 *     summary: Create campaign
 *     tags: [Automation]
 */
router.post('/campaigns', automationController.createCampaign);

/**
 * @swagger
 * /api/automation/campaigns/{campaignId}:
 *   get:
 *     summary: Get campaign
 *     tags: [Automation]
 */
router.get('/campaigns/:campaignId', automationController.getCampaign);

/**
 * @swagger
 * /api/automation/campaigns:
 *   get:
 *     summary: List campaigns
 *     tags: [Automation]
 */
router.get('/campaigns', automationController.listCampaigns);

/**
 * @swagger
 * /api/automation/campaigns/{campaignId}/start:
 *   post:
 *     summary: Start campaign
 *     tags: [Automation]
 */
router.post('/campaigns/:campaignId/start', automationController.startCampaign);

/**
 * @swagger
 * /api/automation/campaigns/{campaignId}/stats:
 *   put:
 *     summary: Update campaign statistics
 *     tags: [Automation]
 */
router.put(
  '/campaigns/:campaignId/stats',
  automationController.updateCampaignStats
);

/**
 * @swagger
 * /api/automation/campaigns/{campaignId}/analytics:
 *   get:
 *     summary: Get campaign analytics
 *     tags: [Automation]
 */
router.get(
  '/campaigns/:campaignId/analytics',
  automationController.getCampaignAnalytics
);

export default router;
