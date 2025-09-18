import express from 'express';
import {
  generateMeme,
  getMemeTemplate,
  getMemeTemplates,
  getRandomUser,
} from '../controllers/funController.js';

const router = express.Router();

/**
 * @swagger
 * /api/fun/random-user:
 *   get:
 *     summary: Get a random user profile
 *     tags: [Fun]
 *     responses:
 *       200:
 *         description: Random user profile generated successfully
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
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: object
 *                       properties:
 *                         first:
 *                           type: string
 *                           example: "John"
 *                         last:
 *                           type: string
 *                           example: "Doe"
 *                         title:
 *                           type: string
 *                           example: "Mr"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     phone:
 *                       type: string
 *                       example: "+1-555-123-4567"
 *                     picture:
 *                       type: object
 *                       properties:
 *                         large:
 *                           type: string
 *                           example: "https://randomuser.me/api/portraits/men/1.jpg"
 *                         medium:
 *                           type: string
 *                           example: "https://randomuser.me/api/portraits/med/men/1.jpg"
 *                         thumbnail:
 *                           type: string
 *                           example: "https://randomuser.me/api/portraits/thumb/men/1.jpg"
 *                     location:
 *                       type: object
 *                       properties:
 *                         city:
 *                           type: string
 *                           example: "New York"
 *                         country:
 *                           type: string
 *                           example: "United States"
 *                     gender:
 *                       type: string
 *                       example: "male"
 *                 message:
 *                   type: string
 *                   example: "Random user generated successfully"
 */
router.get('/random-user', getRandomUser);

/**
 * @swagger
 * /api/fun/meme/templates:
 *   get:
 *     summary: Get all available meme templates
 *     tags: [Fun]
 *     responses:
 *       200:
 *         description: Meme templates retrieved successfully
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
 *                       id:
 *                         type: string
 *                         example: "drake"
 *                       name:
 *                         type: string
 *                         example: "Drake Hotline Bling"
 *                       description:
 *                         type: string
 *                         example: "Drake disapproving and approving"
 *                       template_url:
 *                         type: string
 *                         example: "https://i.imgflip.com/30b1gx.jpg"
 *                       text_boxes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "top"
 *                             text:
 *                               type: string
 *                               example: "Things that are disappointing"
 *                 message:
 *                   type: string
 *                   example: "Meme templates retrieved successfully"
 */
router.get('/meme/templates', getMemeTemplates);

/**
 * @swagger
 * /api/fun/meme/templates/{id}:
 *   get:
 *     summary: Get a specific meme template by ID
 *     tags: [Fun]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Meme template ID
 *         example: "drake"
 *     responses:
 *       200:
 *         description: Meme template retrieved successfully
 *       404:
 *         description: Meme template not found
 */
router.get('/meme/templates/:id', getMemeTemplate);

/**
 * @swagger
 * /api/fun/meme:
 *   get:
 *     summary: Generate a meme with custom text
 *     tags: [Fun]
 *     parameters:
 *       - in: query
 *         name: template
 *         required: true
 *         schema:
 *           type: string
 *         description: Meme template ID
 *         example: "drake"
 *       - in: query
 *         name: top
 *         schema:
 *           type: string
 *         description: Top text for the meme
 *         example: "Things that are disappointing"
 *       - in: query
 *         name: bottom
 *         schema:
 *           type: string
 *         description: Bottom text for the meme
 *         example: "Things that are awesome"
 *       - in: query
 *         name: topText
 *         schema:
 *           type: string
 *         description: Alternative parameter for top text
 *       - in: query
 *         name: bottomText
 *         schema:
 *           type: string
 *         description: Alternative parameter for bottom text
 *     responses:
 *       200:
 *         description: Meme generated successfully
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
 *                     template:
 *                       type: object
 *                       description: Meme template information
 *                     text:
 *                       type: object
 *                       properties:
 *                         top:
 *                           type: string
 *                           example: "Things that are disappointing"
 *                         bottom:
 *                           type: string
 *                           example: "Things that are awesome"
 *                     generated_url:
 *                       type: string
 *                       example: "https://api.imgflip.com/caption_image?template_id=drake&username=deepdevnodes&password=deepdevnodes&text0=Things%20that%20are%20disappointing&text1=Things%20that%20are%20awesome"
 *                     preview:
 *                       type: object
 *                       properties:
 *                         template_url:
 *                           type: string
 *                           example: "https://i.imgflip.com/30b1gx.jpg"
 *                         top_text:
 *                           type: string
 *                           example: "Things that are disappointing"
 *                         bottom_text:
 *                           type: string
 *                           example: "Things that are awesome"
 *                 message:
 *                   type: string
 *                   example: "Meme generated successfully"
 *       400:
 *         description: Template parameter is required
 *       404:
 *         description: Meme template not found
 */
router.get('/meme', generateMeme);

export default router;
