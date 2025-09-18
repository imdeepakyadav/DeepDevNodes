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

// Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve landing page at root
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
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
