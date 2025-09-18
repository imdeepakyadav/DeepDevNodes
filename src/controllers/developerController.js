import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createErrorResponse, createResponse } from '../utils/apiHelpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load data files
const githubTrendingPath = path.join(__dirname, '../data/githubTrending.json');
const npmTrendingPath = path.join(__dirname, '../data/npmTrending.json');
const stackoverflowTrendingPath = path.join(
  __dirname,
  '../data/stackoverflowTrending.json'
);

let githubTrendingData = [];
let npmTrendingData = [];
let stackoverflowTrendingData = [];

// Load data on startup
try {
  githubTrendingData = JSON.parse(fs.readFileSync(githubTrendingPath, 'utf8'));
  npmTrendingData = JSON.parse(fs.readFileSync(npmTrendingPath, 'utf8'));
  stackoverflowTrendingData = JSON.parse(
    fs.readFileSync(stackoverflowTrendingPath, 'utf8')
  );
} catch (error) {
  console.error('Error loading developer data:', error.message);
}

/**
 * Get GitHub trending repositories
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getGithubTrending = (req, res) => {
  try {
    const { language, limit = 10, sort = 'stars' } = req.query;

    let filteredData = [...githubTrendingData];

    // Filter by language if specified
    if (language) {
      filteredData = filteredData.filter(
        (repo) => repo.language?.toLowerCase() === language.toLowerCase()
      );
    }

    // Sort data
    filteredData.sort((a, b) => {
      switch (sort) {
        case 'stars':
          return b.stars - a.stars;
        case 'forks':
          return b.forks - a.forks;
        case 'starsToday':
          return b.starsToday - a.starsToday;
        default:
          return b.stars - a.stars;
      }
    });

    // Apply limit
    const limitedData = filteredData.slice(0, parseInt(limit));

    res.json(
      createResponse({
        count: limitedData.length,
        data: limitedData,
      })
    );
  } catch (error) {
    res
      .status(500)
      .json(createErrorResponse('Failed to fetch GitHub trending data'));
  }
};

/**
 * Get npm trending packages
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getNpmTrending = (req, res) => {
  try {
    const { limit = 10, sort = 'downloads' } = req.query;

    const filteredData = [...npmTrendingData];

    // Sort data
    filteredData.sort((a, b) => {
      switch (sort) {
        case 'downloads':
          return b.downloads - a.downloads;
        case 'stars':
          return b.stars - a.stars;
        case 'downloadsChange':
          return b.downloadsChange - a.downloadsChange;
        default:
          return b.downloads - a.downloads;
      }
    });

    // Apply limit
    const limitedData = filteredData.slice(0, parseInt(limit));

    res.json(
      createResponse({
        count: limitedData.length,
        data: limitedData,
      })
    );
  } catch (error) {
    res
      .status(500)
      .json(createErrorResponse('Failed to fetch npm trending data'));
  }
};

/**
 * Get StackOverflow trending questions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getStackoverflowTrending = (req, res) => {
  try {
    const { tag, limit = 10, sort = 'score', answered } = req.query;

    let filteredData = [...stackoverflowTrendingData];

    // Filter by tag if specified
    if (tag) {
      filteredData = filteredData.filter((question) =>
        question.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
      );
    }

    // Filter by answered status if specified
    if (answered !== undefined) {
      const isAnswered = answered === 'true';
      filteredData = filteredData.filter(
        (question) => question.is_answered === isAnswered
      );
    }

    // Sort data
    filteredData.sort((a, b) => {
      switch (sort) {
        case 'score':
          return b.score - a.score;
        case 'views':
          return b.view_count - a.view_count;
        case 'answers':
          return b.answer_count - a.answer_count;
        case 'newest':
          return new Date(b.creation_date) - new Date(a.creation_date);
        default:
          return b.score - a.score;
      }
    });

    // Apply limit
    const limitedData = filteredData.slice(0, parseInt(limit));

    res.json(
      createResponse({
        count: limitedData.length,
        data: limitedData,
      })
    );
  } catch (error) {
    res
      .status(500)
      .json(createErrorResponse('Failed to fetch StackOverflow trending data'));
  }
};

/**
 * Get developer statistics overview
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getDeveloperStats = (req, res) => {
  try {
    const stats = {
      github: {
        totalRepos: githubTrendingData.length,
        totalStars: githubTrendingData.reduce(
          (sum, repo) => sum + repo.stars,
          0
        ),
        totalForks: githubTrendingData.reduce(
          (sum, repo) => sum + repo.forks,
          0
        ),
        languages: [
          ...new Set(
            githubTrendingData.map((repo) => repo.language).filter(Boolean)
          ),
        ],
      },
      npm: {
        totalPackages: npmTrendingData.length,
        totalDownloads: npmTrendingData.reduce(
          (sum, pkg) => sum + pkg.downloads,
          0
        ),
        totalStars: npmTrendingData.reduce((sum, pkg) => sum + pkg.stars, 0),
      },
      stackoverflow: {
        totalQuestions: stackoverflowTrendingData.length,
        totalAnswers: stackoverflowTrendingData.reduce(
          (sum, q) => sum + q.answer_count,
          0
        ),
        totalViews: stackoverflowTrendingData.reduce(
          (sum, q) => sum + q.view_count,
          0
        ),
        answeredQuestions: stackoverflowTrendingData.filter(
          (q) => q.is_answered
        ).length,
        tags: [...new Set(stackoverflowTrendingData.flatMap((q) => q.tags))],
      },
    };

    res.json(createResponse(stats));
  } catch (error) {
    res
      .status(500)
      .json(createErrorResponse('Failed to fetch developer statistics'));
  }
};
