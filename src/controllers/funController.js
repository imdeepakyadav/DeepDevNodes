import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createResponse } from '../utils/apiHelpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load data
const randomUsers = JSON.parse(
  readFileSync(join(__dirname, '../data/randomUsers.json'), 'utf8')
);
const memeTemplates = JSON.parse(
  readFileSync(join(__dirname, '../data/memeTemplates.json'), 'utf8')
);

/**
 * Get a random user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getRandomUser = (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * randomUsers.length);
    const user = randomUsers[randomIndex];

    res.json(
      createResponse(true, user, null, 'Random user generated successfully')
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, 'Failed to generate random user'));
  }
};

/**
 * Get all meme templates
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getMemeTemplates = (req, res) => {
  try {
    res.json(
      createResponse(
        true,
        memeTemplates,
        null,
        'Meme templates retrieved successfully'
      )
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, 'Failed to retrieve meme templates'));
  }
};

/**
 * Get a specific meme template by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getMemeTemplate = (req, res) => {
  try {
    const { id } = req.params;
    const template = memeTemplates.find((t) => t.id === id);

    if (!template) {
      return res
        .status(404)
        .json(createResponse(false, null, 'Meme template not found'));
    }

    res.json(
      createResponse(
        true,
        template,
        null,
        'Meme template retrieved successfully'
      )
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, 'Failed to retrieve meme template'));
  }
};

/**
 * Generate a meme with custom text
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const generateMeme = (req, res) => {
  try {
    const { template, top, bottom, topText, bottomText } = req.query;

    if (!template) {
      return res
        .status(400)
        .json(createResponse(false, null, 'Template parameter is required'));
    }

    const memeTemplate = memeTemplates.find((t) => t.id === template);
    if (!memeTemplate) {
      return res
        .status(404)
        .json(createResponse(false, null, 'Meme template not found'));
    }

    // Use top/bottom or topText/bottomText parameters
    const top_text = top || topText || '';
    const bottom_text = bottom || bottomText || '';

    const memeData = {
      template: memeTemplate,
      text: {
        top: top_text,
        bottom: bottom_text,
      },
      generated_url: `https://api.imgflip.com/caption_image?template_id=${
        memeTemplate.id
      }&username=deepdevnodes&password=deepdevnodes&text0=${encodeURIComponent(
        top_text
      )}&text1=${encodeURIComponent(bottom_text)}`,
      preview: {
        template_url: memeTemplate.template_url,
        top_text: top_text,
        bottom_text: bottom_text,
      },
    };

    res.json(
      createResponse(true, memeData, null, 'Meme generated successfully')
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, 'Failed to generate meme'));
  }
};
