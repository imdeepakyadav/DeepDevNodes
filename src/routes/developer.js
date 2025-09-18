import express from "express";
import {
  getDeveloperStats,
  getGithubTrending,
  getNpmTrending,
  getStackoverflowTrending,
} from "../controllers/developerController.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/developer/github-trending:
 *   get:
 *     summary: Get GitHub trending repositories
 *     description: Retrieve trending GitHub repositories with filtering and sorting options
 *     tags: [Developer APIs]
 *     parameters:
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Filter by programming language (e.g., JavaScript, Python, TypeScript)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Number of repositories to return
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [stars, forks, starsToday]
 *           default: stars
 *         description: Sort repositories by criteria
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rank:
 *                         type: integer
 *                         example: 1
 *                       repositoryName:
 *                         type: string
 *                         example: "microsoft/vscode"
 *                       description:
 *                         type: string
 *                         example: "Visual Studio Code"
 *                       language:
 *                         type: string
 *                         example: "TypeScript"
 *                       stars:
 *                         type: integer
 *                         example: 156000
 *                       forks:
 *                         type: integer
 *                         example: 27800
 *                       starsToday:
 *                         type: integer
 *                         example: 234
 *                       url:
 *                         type: string
 *                         example: "https://github.com/microsoft/vscode"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch GitHub trending data"
 */
router.get("/github-trending", getGithubTrending);

/**
 * @swagger
 * /api/v1/developer/npm-trending:
 *   get:
 *     summary: Get npm trending packages
 *     description: Retrieve trending npm packages with download statistics
 *     tags: [Developer APIs]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Number of packages to return
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [downloads, stars, downloadsChange]
 *           default: downloads
 *         description: Sort packages by criteria
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rank:
 *                         type: integer
 *                         example: 1
 *                       package:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "react"
 *                           version:
 *                             type: string
 *                             example: "18.2.0"
 *                           description:
 *                             type: string
 *                             example: "React is a JavaScript library for building user interfaces"
 *                       downloads:
 *                         type: integer
 *                         example: 12500000
 *                       downloadsChange:
 *                         type: number
 *                         example: 5.2
 *                       stars:
 *                         type: integer
 *                         example: 218000
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch npm trending data"
 */
router.get("/npm-trending", getNpmTrending);

/**
 * @swagger
 * /api/v1/developer/stackoverflow-trending:
 *   get:
 *     summary: Get StackOverflow trending questions
 *     description: Retrieve trending StackOverflow questions with filtering options
 *     tags: [Developer APIs]
 *     parameters:
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Filter by tag (e.g., javascript, react, node.js)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Number of questions to return
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [score, views, answers, newest]
 *           default: score
 *         description: Sort questions by criteria
 *       - in: query
 *         name: answered
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Filter by answered status
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       question_id:
 *                         type: integer
 *                         example: 12345678
 *                       title:
 *                         type: string
 *                         example: "How to properly type React hooks with TypeScript?"
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["react", "typescript", "react-hooks"]
 *                       score:
 *                         type: integer
 *                         example: 245
 *                       view_count:
 *                         type: integer
 *                         example: 12500
 *                       answer_count:
 *                         type: integer
 *                         example: 8
 *                       is_answered:
 *                         type: boolean
 *                         example: true
 *                       link:
 *                         type: string
 *                         example: "https://stackoverflow.com/questions/12345678/how-to-properly-type-react-hooks-with-typescript"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch StackOverflow trending data"
 */
router.get("/stackoverflow-trending", getStackoverflowTrending);

/**
 * @swagger
 * /api/v1/developer/stats:
 *   get:
 *     summary: Get developer ecosystem statistics
 *     description: Retrieve comprehensive statistics across GitHub, npm, and StackOverflow
 *     tags: [Developer APIs]
 *     responses:
 *       200:
 *         description: Successful response
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
 *                     github:
 *                       type: object
 *                       properties:
 *                         totalRepos:
 *                           type: integer
 *                           example: 5
 *                         totalStars:
 *                           type: integer
 *                           example: 764000
 *                         totalForks:
 *                           type: integer
 *                           example: 153600
 *                         languages:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["TypeScript", "JavaScript", "Rust", "C++"]
 *                     npm:
 *                       type: object
 *                       properties:
 *                         totalPackages:
 *                           type: integer
 *                           example: 5
 *                         totalDownloads:
 *                           type: integer
 *                           example: 39500000
 *                         totalStars:
 *                           type: integer
 *                           example: 461000
 *                     stackoverflow:
 *                       type: object
 *                       properties:
 *                         totalQuestions:
 *                           type: integer
 *                           example: 5
 *                         totalAnswers:
 *                           type: integer
 *                           example: 42
 *                         totalViews:
 *                           type: integer
 *                           example: 42900
 *                         answeredQuestions:
 *                           type: integer
 *                           example: 5
 *                         tags:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["react", "typescript", "javascript", "async-await", "promises"]
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch developer statistics"
 */
router.get("/stats", getDeveloperStats);

export default router;
