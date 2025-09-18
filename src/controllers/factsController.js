import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createErrorResponse, createResponse } from '../utils/apiHelpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load facts data
const factsPath = path.join(__dirname, '../data/facts.json');
const factsData = JSON.parse(fs.readFileSync(factsPath, 'utf8'));

export const getRandomFact = (req, res) => {
  try {
    const { category } = req.query;

    let factsPool = factsData;

    // Filter by category if provided
    if (category) {
      factsPool = factsData.filter(
        (fact) => fact.category.toLowerCase() === category.toLowerCase()
      );

      if (factsPool.length === 0) {
        return res
          .status(404)
          .json(
            createErrorResponse(
              `No facts found for category '${category}'`,
              404
            )
          );
      }
    }

    const randomIndex = Math.floor(Math.random() * factsPool.length);
    const randomFact = factsPool[randomIndex];

    res.json(createResponse(randomFact));
  } catch (error) {
    console.error('Error in getRandomFact:', error);
    res.status(500).json(createErrorResponse('Failed to fetch random fact'));
  }
};

export const getFactsByCategory = (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 10, page = 1 } = req.query;

    const categoryFacts = factsData.filter(
      (fact) => fact.category.toLowerCase() === category.toLowerCase()
    );

    if (categoryFacts.length === 0) {
      return res
        .status(404)
        .json(
          createErrorResponse(`No facts found for category '${category}'`, 404)
        );
    }

    // Apply pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const offset = (pageNum - 1) * limitNum;
    const paginatedFacts = categoryFacts.slice(offset, offset + limitNum);

    const totalPages = Math.ceil(categoryFacts.length / limitNum);

    res.json(
      createResponse(paginatedFacts, {
        page: pageNum,
        limit: limitNum,
        total: categoryFacts.length,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1,
      })
    );
  } catch (error) {
    console.error('Error in getFactsByCategory:', error);
    res
      .status(500)
      .json(createErrorResponse('Failed to fetch facts by category'));
  }
};

export const getAllFacts = (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;

    let filteredFacts = factsData;

    // Filter by category if provided
    if (category) {
      filteredFacts = factsData.filter(
        (fact) => fact.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const offset = (pageNum - 1) * limitNum;
    const paginatedFacts = filteredFacts.slice(offset, offset + limitNum);

    const totalPages = Math.ceil(filteredFacts.length / limitNum);

    res.json(
      createResponse(paginatedFacts, {
        page: pageNum,
        limit: limitNum,
        total: filteredFacts.length,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1,
      })
    );
  } catch (error) {
    console.error('Error in getAllFacts:', error);
    res.status(500).json(createErrorResponse('Failed to fetch facts'));
  }
};
