import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  applyFilters,
  applyPagination,
  applySearch,
  applySorting,
  createErrorResponse,
  createResponse,
  parseQueryParams,
} from '../utils/apiHelpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load quotes data
const quotesPath = path.join(__dirname, '../data/quotes.json');
const quotesData = JSON.parse(fs.readFileSync(quotesPath, 'utf8'));

export const getAllQuotes = (req, res) => {
  try {
    const { page, limit, sort, search, filters } = parseQueryParams(req.query);

    let filteredData = quotesData;

    // Apply search if provided
    if (search) {
      filteredData = applySearch(filteredData, search, ['quote', 'author']);
    }

    // Apply filters
    if (Object.keys(filters).length > 0) {
      filteredData = applyFilters(filteredData, filters);
    }

    // Apply sorting
    if (sort) {
      filteredData = applySorting(filteredData, sort);
    }

    // Apply pagination
    const result = applyPagination(filteredData, page, limit);

    res.json(createResponse(result.data, result.pagination));
  } catch (error) {
    console.error('Error in getAllQuotes:', error);
    res.status(500).json(createErrorResponse('Failed to fetch quotes'));
  }
};

export const getRandomQuote = (req, res) => {
  try {
    const { category } = req.query;

    let quotesPool = quotesData;

    // Filter by category if provided
    if (category) {
      quotesPool = quotesData.filter(
        (quote) => quote.category.toLowerCase() === category.toLowerCase()
      );

      if (quotesPool.length === 0) {
        return res
          .status(404)
          .json(
            createErrorResponse(
              `No quotes found for category '${category}'`,
              404
            )
          );
      }
    }

    const randomIndex = Math.floor(Math.random() * quotesPool.length);
    const randomQuote = quotesPool[randomIndex];

    res.json(createResponse(randomQuote));
  } catch (error) {
    console.error('Error in getRandomQuote:', error);
    res.status(500).json(createErrorResponse('Failed to fetch random quote'));
  }
};

export const getQuotesByCategory = (req, res) => {
  try {
    const { category } = req.params;
    const { page, limit, sort, search } = parseQueryParams(req.query);

    let categoryQuotes = quotesData.filter(
      (quote) => quote.category.toLowerCase() === category.toLowerCase()
    );

    if (categoryQuotes.length === 0) {
      return res
        .status(404)
        .json(
          createErrorResponse(`No quotes found for category '${category}'`, 404)
        );
    }

    // Apply search within category if provided
    if (search) {
      categoryQuotes = applySearch(categoryQuotes, search, ['quote', 'author']);
    }

    // Apply sorting
    if (sort) {
      categoryQuotes = applySorting(categoryQuotes, sort);
    }

    // Apply pagination
    const result = applyPagination(categoryQuotes, page, limit);

    res.json(createResponse(result.data, result.pagination));
  } catch (error) {
    console.error('Error in getQuotesByCategory:', error);
    res
      .status(500)
      .json(createErrorResponse('Failed to fetch quotes by category'));
  }
};
