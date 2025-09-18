import { v4 as uuidv4 } from 'uuid';
import { createErrorResponse, createResponse } from '../utils/apiHelpers.js';

export const generateUUID = (req, res) => {
  try {
    const uuid = uuidv4();

    res.json(
      createResponse({
        uuid,
        timestamp: new Date().toISOString(),
      })
    );
  } catch (error) {
    console.error('Error in generateUUID:', error);
    res.status(500).json(createErrorResponse('Failed to generate UUID'));
  }
};

export const generateLoremIpsum = (req, res) => {
  try {
    const { type = 'paragraphs', count = 1 } = req.query;
    const numCount = parseInt(count, 10);

    if (numCount < 1 || numCount > 10) {
      return res
        .status(400)
        .json(createErrorResponse('Count must be between 1 and 10', 400));
    }

    let loremText = '';

    // Simple Lorem Ipsum generator
    const loremWords = [
      'lorem',
      'ipsum',
      'dolor',
      'sit',
      'amet',
      'consectetur',
      'adipiscing',
      'elit',
      'sed',
      'do',
      'eiusmod',
      'tempor',
      'incididunt',
      'ut',
      'labore',
      'et',
      'dolore',
      'magna',
      'aliqua',
      'enim',
      'ad',
      'minim',
      'veniam',
      'quis',
      'nostrud',
      'exercitation',
    ];

    if (type === 'words') {
      const words = [];
      for (let i = 0; i < numCount; i++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      loremText = words.join(' ');
    } else if (type === 'sentences') {
      const sentences = [];
      for (let i = 0; i < numCount; i++) {
        const sentenceLength = Math.floor(Math.random() * 10) + 5;
        const words = [];
        for (let j = 0; j < sentenceLength; j++) {
          words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        sentences.push(`${words.join(' ')}.`);
      }
      loremText = sentences.join(' ');
    } else {
      // paragraphs (default)
      const paragraphs = [];
      for (let i = 0; i < numCount; i++) {
        const sentences = [];
        const paragraphLength = Math.floor(Math.random() * 3) + 2;
        for (let j = 0; j < paragraphLength; j++) {
          const sentenceLength = Math.floor(Math.random() * 10) + 5;
          const words = [];
          for (let k = 0; k < sentenceLength; k++) {
            words.push(
              loremWords[Math.floor(Math.random() * loremWords.length)]
            );
          }
          sentences.push(`${words.join(' ')}.`);
        }
        paragraphs.push(sentences.join(' '));
      }
      loremText = paragraphs.join('\n\n');
    }

    res.json(
      createResponse({
        type,
        count: numCount,
        text: loremText,
      })
    );
  } catch (error) {
    console.error('Error in generateLoremIpsum:', error);
    res
      .status(500)
      .json(createErrorResponse('Failed to generate Lorem Ipsum text'));
  }
};

export const generateRandomNumber = (req, res) => {
  try {
    const { min = 1, max = 100 } = req.query;
    const minNum = parseInt(min, 10);
    const maxNum = parseInt(max, 10);

    if (isNaN(minNum) || isNaN(maxNum)) {
      return res
        .status(400)
        .json(createErrorResponse('Min and max must be valid numbers', 400));
    }

    if (minNum >= maxNum) {
      return res
        .status(400)
        .json(createErrorResponse('Min must be less than max', 400));
    }

    const randomNumber = Math.floor(
      Math.random() * (maxNum - minNum + 1)
    ) + minNum;

    res.json(
      createResponse({
        number: randomNumber,
        min: minNum,
        max: maxNum,
        timestamp: new Date().toISOString(),
      })
    );
  } catch (error) {
    console.error('Error in generateRandomNumber:', error);
    res
      .status(500)
      .json(createErrorResponse('Failed to generate random number'));
  }
};

export const generateQRCode = (req, res) => {
  try {
    const { text, size = 256, format = 'png' } = req.query;

    if (!text) {
      return res
        .status(400)
        .json(createErrorResponse('Text parameter is required', 400));
    }

    if (text.length > 1000) {
      return res
        .status(400)
        .json(
          createErrorResponse('Text must be less than 1000 characters', 400)
        );
    }

    // Generate QR code URL using Google Charts API (free and reliable)
    const encodedText = encodeURIComponent(text);

    // Alternative: QR Server API
    const qrServerUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`;

    res.json(
      createResponse({
        text,
        qr_code_url: qrServerUrl,
        size,
        format,
        generated_at: new Date().toISOString(),
        note: 'QR code URLs are generated dynamically. For production use, consider implementing server-side generation.',
      })
    );
  } catch (error) {
    console.error('Error in generateQRCode:', error);
    res.status(500).json(createErrorResponse('Failed to generate QR code'));
  }
};

export const generateBarcode = (req, res) => {
  try {
    const {
      data,
      type = 'code128',
      width = 2,
      height = 100,
      format = 'png',
    } = req.query;

    if (!data) {
      return res
        .status(400)
        .json(createErrorResponse('Data parameter is required', 400));
    }

    if (data.length > 50) {
      return res
        .status(400)
        .json(createErrorResponse('Data must be less than 50 characters', 400));
    }

    // Validate barcode type
    const validTypes = ['code128', 'code39', 'ean13', 'ean8', 'upca', 'upce'];
    if (!validTypes.includes(type.toLowerCase())) {
      return res
        .status(400)
        .json(
          createErrorResponse(
            `Invalid barcode type. Valid types: ${validTypes.join(', ')}`,
            400
          )
        );
    }

    // Generate barcode URL using BWIP-JS compatible API
    const encodedData = encodeURIComponent(data);
    const barcodeUrl = `https://bwipjs-api.metafloor.com/?bcid=${type}&text=${encodedData}&scale=${width}&height=${height}&includetext&guardwhitespace`;

    res.json(
      createResponse({
        data,
        barcode_type: type,
        barcode_url: barcodeUrl,
        width,
        height,
        format,
        generated_at: new Date().toISOString(),
        note: 'Barcode URLs are generated dynamically. For production use, consider implementing server-side generation.',
      })
    );
  } catch (error) {
    console.error('Error in generateBarcode:', error);
    res.status(500).json(createErrorResponse('Failed to generate barcode'));
  }
};
