import express from 'express';
import * as voiceController from '../controllers/voiceController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Voice
 *   description: Voice call and IVR services
 */

/**
 * @swagger
 * /api/voice/call:
 *   post:
 *     summary: Make voice call
 *     tags: [Voice]
 */
router.post('/call', voiceController.makeVoiceCall);

/**
 * @swagger
 * /api/voice/call/bulk:
 *   post:
 *     summary: Make bulk voice calls
 *     tags: [Voice]
 */
router.post('/call/bulk', voiceController.makeBulkVoiceCalls);

/**
 * @swagger
 * /api/voice/otp:
 *   post:
 *     summary: Send voice OTP
 *     tags: [Voice]
 */
router.post('/otp', voiceController.sendVoiceOTP);

/**
 * @swagger
 * /api/voice/call/status/{callId}:
 *   get:
 *     summary: Get call status
 *     tags: [Voice]
 */
router.get('/call/status/:callId', voiceController.getCallStatus);

/**
 * @swagger
 * /api/voice/call/history:
 *   get:
 *     summary: Get call history
 *     tags: [Voice]
 */
router.get('/call/history', voiceController.getCallHistory);

/**
 * @swagger
 * /api/voice/missed-call:
 *   post:
 *     summary: Register missed call (for lead generation)
 *     tags: [Voice]
 */
router.post('/missed-call', voiceController.registerMissedCall);

/**
 * @swagger
 * /api/voice/ivr:
 *   post:
 *     summary: Create IVR
 *     tags: [Voice]
 */
router.post('/ivr', voiceController.createIVR);

/**
 * @swagger
 * /api/voice/ivr/{ivrId}:
 *   get:
 *     summary: Get IVR
 *     tags: [Voice]
 */
router.get('/ivr/:ivrId', voiceController.getIVR);

/**
 * @swagger
 * /api/voice/ivr:
 *   get:
 *     summary: List all IVRs
 *     tags: [Voice]
 */
router.get('/ivr', voiceController.listIVRs);

/**
 * @swagger
 * /api/voice/ivr/{ivrId}:
 *   put:
 *     summary: Update IVR
 *     tags: [Voice]
 */
router.put('/ivr/:ivrId', voiceController.updateIVR);

/**
 * @swagger
 * /api/voice/ivr/response:
 *   post:
 *     summary: Process IVR response
 *     tags: [Voice]
 */
router.post('/ivr/response', voiceController.processIVRResponse);

export default router;
