import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createResponse } from "../utils/apiHelpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load data
const spaceLaunches = JSON.parse(
  readFileSync(join(__dirname, "../data/spaceLaunches.json"), "utf8")
);
const apodData = JSON.parse(
  readFileSync(join(__dirname, "../data/apod.json"), "utf8")
);
const planetsData = JSON.parse(
  readFileSync(join(__dirname, "../data/planets.json"), "utf8")
);

/**
 * Get upcoming space launches
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getSpaceLaunches = (req, res) => {
  try {
    const { limit = 10, upcoming = "true" } = req.query;
    let data = [...spaceLaunches];

    // Filter by upcoming status
    if (upcoming === "true") {
      data = data.filter((launch) => launch.upcoming === true);
    } else if (upcoming === "false") {
      data = data.filter((launch) => launch.upcoming === false);
    }

    // Sort by date (upcoming first)
    data.sort((a, b) => new Date(a.date_utc) - new Date(b.date_utc));

    // Apply limit
    const limitNum = parseInt(limit, 10);
    if (limitNum > 0) {
      data = data.slice(0, limitNum);
    }

    res.json(
      createResponse(true, data, null, "Space launches retrieved successfully")
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Failed to retrieve space launches"));
  }
};

/**
 * Get Astronomy Picture of the Day
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAPOD = (req, res) => {
  try {
    // In a real implementation, you would fetch from NASA API
    // For now, return the sample data
    res.json(
      createResponse(
        true,
        apodData,
        null,
        "Astronomy Picture of the Day retrieved successfully"
      )
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Failed to retrieve APOD"));
  }
};

/**
 * Get all planets data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getPlanets = (req, res) => {
  try {
    const { type, sort = "distance_from_sun" } = req.query;
    let data = [...planetsData];

    // Filter by type
    if (type) {
      data = data.filter(
        (planet) => planet.type.toLowerCase() === type.toLowerCase()
      );
    }

    // Apply sorting
    if (sort === "name") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "diameter") {
      data.sort((a, b) => b.diameter - a.diameter);
    } else if (sort === "mass") {
      data.sort((a, b) => b.mass - a.mass);
    } else if (sort === "moons") {
      data.sort((a, b) => b.moons - a.moons);
    } else {
      // Default: distance from sun
      data.sort((a, b) => a.distance_from_sun - b.distance_from_sun);
    }

    res.json(
      createResponse(true, data, null, "Planetary data retrieved successfully")
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Failed to retrieve planetary data"));
  }
};

/**
 * Get planet by name
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getPlanetByName = (req, res) => {
  try {
    const { name } = req.params;
    const planet = planetsData.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );

    if (!planet) {
      return res
        .status(404)
        .json(createResponse(false, null, "Planet not found"));
    }

    res.json(
      createResponse(true, planet, null, "Planet data retrieved successfully")
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Failed to retrieve planet data"));
  }
};
