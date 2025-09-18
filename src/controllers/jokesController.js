import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  applyFilters,
  applyPagination,
  applySearch,
  createErrorResponse,
  createResponse,
  parseQueryParams,
} from "../utils/apiHelpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load jokes data
const jokesPath = path.join(__dirname, "../data/jokes.json");
const jokesData = JSON.parse(fs.readFileSync(jokesPath, "utf8"));

export const getAllJokes = (req, res) => {
  try {
    const { page, limit, search, filters } = parseQueryParams(req.query);

    let filteredData = jokesData;

    // Apply search if provided
    if (search) {
      filteredData = applySearch(filteredData, search, ["joke"]);
    }

    // Apply filters
    if (Object.keys(filters).length > 0) {
      filteredData = applyFilters(filteredData, filters);
    }

    // Apply pagination
    const result = applyPagination(filteredData, page, limit);

    res.json(createResponse(result.data, result.pagination));
  } catch (error) {
    console.error("Error in getAllJokes:", error);
    res.status(500).json(createErrorResponse("Failed to fetch jokes"));
  }
};

export const getRandomJoke = (req, res) => {
  try {
    const { type } = req.query;

    let jokesPool = jokesData;

    // Filter by type if provided
    if (type) {
      if (type === "dev") {
        jokesPool = jokesData.filter((joke) => joke.category === "programming");
      } else if (type === "general") {
        jokesPool = jokesData.filter((joke) => joke.category === "general");
      }

      if (jokesPool.length === 0) {
        return res
          .status(404)
          .json(createErrorResponse(`No jokes found for type '${type}'`, 404));
      }
    }

    const randomIndex = Math.floor(Math.random() * jokesPool.length);
    const randomJoke = jokesPool[randomIndex];

    res.json(createResponse(randomJoke));
  } catch (error) {
    console.error("Error in getRandomJoke:", error);
    res.status(500).json(createErrorResponse("Failed to fetch random joke"));
  }
};

export const getDevJoke = (req, res) => {
  try {
    const devJokes = jokesData.filter(
      (joke) => joke.category === "programming"
    );

    if (devJokes.length === 0) {
      return res
        .status(404)
        .json(createErrorResponse("No programming jokes found", 404));
    }

    const randomIndex = Math.floor(Math.random() * devJokes.length);
    const randomDevJoke = devJokes[randomIndex];

    res.json(createResponse(randomDevJoke));
  } catch (error) {
    console.error("Error in getDevJoke:", error);
    res
      .status(500)
      .json(createErrorResponse("Failed to fetch programming joke"));
  }
};
