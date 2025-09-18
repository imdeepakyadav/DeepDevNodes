import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

// Load environment variables
dotenv.config();

// Import routes
import countryRoutes from './routes/countries.js';
import currencyRoutes from './routes/currency.js';
import developerRoutes from './routes/developer.js';
import factsRoutes from './routes/facts.js';
import financeRoutes from './routes/finance.js';
import funRoutes from './routes/fun.js';
import ipRoutes from './routes/ip.js';
import jokeRoutes from './routes/jokes.js';
import quoteRoutes from './routes/quotes.js';
import spaceRoutes from './routes/space.js';
import timeRoutes from './routes/time.js';
import utilityRoutes from './routes/utilities.js';

// Import middleware
import errorHandler from './middlewares/errorHandler.js';
import rateLimiter from './middlewares/rateLimiter.js';

// Import Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(rateLimiter);

// Serve static files from public directory
app.use(express.static('public'));

// Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve landing page at root
app.get('/', (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'index.html');
    console.log('Serving file from:', filePath); // Debug log
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error serving file:', err);
        // Fallback: serve a simple HTML page
        res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DeepDevNodes API - Loading...</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 50px;
            margin: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        h1 { font-size: 3rem; margin-bottom: 20px; }
        p { font-size: 1.2rem; opacity: 0.9; }
        .links { margin-top: 30px; }
        .links a {
            color: #00d4ff;
            text-decoration: none;
            margin: 0 15px;
            font-weight: 500;
        }
        .links a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 DeepDevNodes</h1>
        <p>A comprehensive REST API providing access to various data sources including financial data, space information, GitHub statistics, and more.</p>
        <div class="links">
            <a href="/docs">📚 API Documentation</a>
            <a href="/health">❤️ Health Check</a>
            <a href="/api/countries">🌍 Try Countries API</a>
        </div>
    </div>
</body>
</html>`);
      }
    });
  } catch (error) {
    console.error('Error in root route:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Internal server error',
        details: error.message,
      },
    });
  }
});

// API Routes
app.use('/api/countries', countryRoutes);
app.use('/api/ip', ipRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/jokes', jokeRoutes);
app.use('/api/utilities', utilityRoutes);
app.use('/api/time', timeRoutes);
app.use('/api/currency', currencyRoutes);
app.use('/api/facts', factsRoutes);
app.use('/api/fun', funRoutes);
app.use('/api', financeRoutes);
app.use('/api/space', spaceRoutes);
app.use('/api/developer', developerRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'deepdevnodes API is running' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
