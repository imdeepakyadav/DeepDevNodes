import express from "express";
import {
  getAPOD,
  getPlanetByName,
  getPlanets,
  getSpaceLaunches,
} from "../controllers/spaceController.js";

const router = express.Router();

/**
 * @swagger
 * /api/space/launches:
 *   get:
 *     summary: Get space launches
 *     tags: [Space]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of launches to return
 *         example: 5
 *       - in: query
 *         name: upcoming
 *         schema:
 *           type: string
 *           enum: [true, false]
 *           default: true
 *         description: Filter by upcoming launches
 *         example: true
 *     responses:
 *       200:
 *         description: Space launches retrieved successfully
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
 *                         example: "spacex-falcon9-001"
 *                       name:
 *                         type: string
 *                         example: "Falcon 9 Block 5 | Starlink Mission 8-1"
 *                       date_utc:
 *                         type: string
 *                         example: "2025-09-20T14:30:00.000Z"
 *                       rocket:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Falcon 9"
 *                       launchpad:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "CCSFS SLC 40"
 *                           locality:
 *                             type: string
 *                             example: "Cape Canaveral"
 *                       details:
 *                         type: string
 *                         example: "SpaceX's Falcon 9 rocket will launch the 8th batch of Starlink satellites to low Earth orbit."
 *                       upcoming:
 *                         type: boolean
 *                         example: true
 *                 message:
 *                   type: string
 *                   example: "Space launches retrieved successfully"
 */
router.get("/launches", getSpaceLaunches);

/**
 * @swagger
 * /api/space/apod:
 *   get:
 *     summary: Get Astronomy Picture of the Day
 *     tags: [Space]
 *     responses:
 *       200:
 *         description: Astronomy Picture of the Day retrieved successfully
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
 *                     date:
 *                       type: string
 *                       example: "2025-09-17"
 *                     title:
 *                       type: string
 *                       example: "M94: A Ring of Star Formation"
 *                     explanation:
 *                       type: string
 *                       example: "Why does this galaxy have a ring of bright blue stars..."
 *                     hdurl:
 *                       type: string
 *                       example: "https://apod.nasa.gov/apod/image/2509/M94_HubbleSchmidt_960.jpg"
 *                     url:
 *                       type: string
 *                       example: "https://apod.nasa.gov/apod/image/2509/M94_HubbleSchmidt_960.jpg"
 *                     media_type:
 *                       type: string
 *                       example: "image"
 *                     copyright:
 *                       type: string
 *                       example: "Image Credit: NASA, ESA, Hubble, HLA; Reprocessing & Copyright: Robert Gendler"
 *                 message:
 *                   type: string
 *                   example: "Astronomy Picture of the Day retrieved successfully"
 */
router.get("/apod", getAPOD);

/**
 * @swagger
 * /api/space/planets:
 *   get:
 *     summary: Get planetary data
 *     tags: [Space]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [Terrestrial Planet, Gas Giant, Ice Giant]
 *         description: Filter by planet type
 *         example: "Terrestrial Planet"
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [distance_from_sun, name, diameter, mass, moons]
 *           default: distance_from_sun
 *         description: Sort planets by field
 *         example: diameter
 *     responses:
 *       200:
 *         description: Planetary data retrieved successfully
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
 *                       name:
 *                         type: string
 *                         example: "Earth"
 *                       type:
 *                         type: string
 *                         example: "Terrestrial Planet"
 *                       distance_from_sun:
 *                         type: number
 *                         example: 149600000
 *                       diameter:
 *                         type: number
 *                         example: 12756
 *                       mass:
 *                         type: number
 *                         example: 5.9724e24
 *                       moons:
 *                         type: integer
 *                         example: 1
 *                       rings:
 *                         type: boolean
 *                         example: false
 *                       surface_temperature:
 *                         type: object
 *                         properties:
 *                           min:
 *                             type: number
 *                             example: -89
 *                           max:
 *                             type: number
 *                             example: 58
 *                           average:
 *                             type: number
 *                             example: 15
 *                       description:
 *                         type: string
 *                         example: "Earth is the only known planet with life and liquid water on its surface."
 *                 message:
 *                   type: string
 *                   example: "Planetary data retrieved successfully"
 */
router.get("/planets", getPlanets);

/**
 * @swagger
 * /api/space/planets/{name}:
 *   get:
 *     summary: Get planet by name
 *     tags: [Space]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Planet name
 *         example: "Mars"
 *     responses:
 *       200:
 *         description: Planet data retrieved successfully
 *       404:
 *         description: Planet not found
 */
router.get("/planets/:name", getPlanetByName);

export default router;
