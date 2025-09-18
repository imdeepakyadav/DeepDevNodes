import app from './app.js';
import connectDB from './config/database.js';

// For Vercel serverless functions, export the app directly
export default app;

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    // Wait for database connection
    await connectDB();

    // For local development, start the server
    if (process.env.NODE_ENV !== 'production') {
      const PORT = process.env.PORT || 3000;
      const server = app.listen(PORT, () => {
        console.log(`🚀 deepdevnodes API server is running on port ${PORT}`);
        console.log(
          `📚 API Documentation available at: http://localhost:${PORT}/docs`
        );
        console.log(`❤️  Health check at: http://localhost:${PORT}/health`);
      });

      // Graceful shutdown for local development
      process.on('SIGTERM', () => {
        console.log('SIGTERM received, shutting down gracefully');
        server.close(() => {
          console.log('Process terminated');
        });
      });

      process.on('SIGINT', () => {
        console.log('SIGINT received, shutting down gracefully');
        server.close(() => {
          console.log('Process terminated');
        });
      });
    }
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Start the server
startServer();
