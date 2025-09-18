import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'deepdevnodes API',
      version: '1.0.0',
      description:
        'Free & OpenSource API Hub providing common APIs for developers',
      contact: {
        name: 'deepdevnodes',
        url: 'https://github.com/yourusername/deepdevnodes',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Country: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'India' },
            code: { type: 'string', example: 'IN' },
            capital: { type: 'string', example: 'New Delhi' },
            currency: { type: 'string', example: 'INR' },
            flag: { type: 'string', example: 'https://flagcdn.com/in.svg' },
            language: { type: 'string', example: 'Hindi, English' },
            timezone: { type: 'string', example: 'Asia/Kolkata' },
            region: { type: 'string', example: 'Asia' },
            population: { type: 'integer', example: 1380000000 },
          },
        },
        Quote: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            quote: {
              type: 'string',
              example: 'The only way to do great work is to love what you do.',
            },
            author: { type: 'string', example: 'Steve Jobs' },
            category: { type: 'string', example: 'inspiration' },
          },
        },
        Joke: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            joke: {
              type: 'string',
              example:
                'Why do programmers prefer dark mode? Because light attracts bugs!',
            },
            category: { type: 'string', example: 'programming' },
          },
        },
        Fact: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            fact: {
              type: 'string',
              example:
                'Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.',
            },
            category: { type: 'string', example: 'food' },
            source: { type: 'string', example: 'Scientific American' },
          },
        },
        CurrencyConversion: {
          type: 'object',
          properties: {
            from: { type: 'string', example: 'USD' },
            to: { type: 'string', example: 'EUR' },
            amount: { type: 'number', example: 100 },
            rate: { type: 'number', example: 0.85 },
            convertedAmount: { type: 'number', example: 85 },
            inverseRate: { type: 'number', example: 1.18 },
            timestamp: { type: 'string', example: '2023-12-01T10:00:00.000Z' },
            note: {
              type: 'string',
              example: 'Exchange rates are for demonstration purposes only',
            },
          },
        },
        TimeInfo: {
          type: 'object',
          properties: {
            country: { type: 'string', example: 'US' },
            timezone: { type: 'string', example: 'America/New_York' },
            time: {
              type: 'string',
              example: 'Friday, December 1, 2023 at 03:30:45 PM',
            },
            offset: { type: 'string', example: 'EST' },
            utc: { type: 'string', example: '2023-12-01T20:30:45.000Z' },
            timestamp: { type: 'integer', example: 1701460245 },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'Error message' },
                statusCode: { type: 'integer', example: 400 },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJSDoc(options);

export default specs;
