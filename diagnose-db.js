import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/deepdevnodes';

console.log('🔍 MongoDB Connection Diagnostic Tool');
console.log('=====================================');
console.log(
  `Target URI: ${MONGODB_URI.replace(/:([^:@]{4})[^:@]*@/, ':$1****@')}`
); // Hide password
console.log('');

const testConnection = async () => {
  try {
    console.log('⏳ Attempting to connect to MongoDB...');

    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // Increased timeout for testing
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      family: 4,
      bufferCommands: false,
    });

    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📊 Database: ${conn.connection.db.databaseName}`);
    console.log(`🌐 Host: ${conn.connection.host}`);
    console.log(`📍 Port: ${conn.connection.port}`);

    // Test basic operations
    const { db } = conn.connection;
    const collections = await db.listCollections().toArray();
    console.log(`📋 Collections found: ${collections.length}`);

    // Close connection
    await mongoose.disconnect();
    console.log('🔌 Connection closed successfully');
  } catch (error) {
    console.log('❌ MongoDB Connection Failed!');
    console.log('Error details:', error.message);
    console.log('');

    // Provide troubleshooting suggestions
    console.log('🔧 Troubleshooting Suggestions:');
    console.log('================================');

    if (error.message.includes('authentication failed')) {
      console.log('1. Check your MongoDB username and password');
      console.log('2. Ensure the user has proper permissions');
    } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
      console.log('1. Check your internet connection');
      console.log('2. Verify the MongoDB cluster URL is correct');
    } else if (error.message.includes('Server selection timed out')) {
      console.log('1. MongoDB Atlas IP Whitelist:');
      console.log('   - Go to MongoDB Atlas Dashboard');
      console.log('   - Navigate to Network Access');
      console.log(
        '   - Add IP: 0.0.0.0/0 (Allow from anywhere) OR your current IP'
      );
      console.log(
        '2. Check if your MongoDB cluster is paused (free tier pauses after inactivity)'
      );
      console.log('3. Firewall might be blocking the connection');
      console.log('4. Try using a different network (mobile hotspot)');
    } else if (error.message.includes('connection timed out')) {
      console.log('1. Check your internet connection');
      console.log('2. MongoDB Atlas might be experiencing issues');
      console.log('3. Try again in a few minutes');
    }

    console.log('');
    console.log('🆘 Quick Fix Commands:');
    console.log('======================');
    console.log('1. Test with local MongoDB:');
    console.log(
      '   MONGODB_URI=mongodb://localhost:27017/deepdevnodes npm start'
    );
    console.log('');
    console.log('2. Check MongoDB Atlas status:');
    console.log('   Visit: https://status.mongodb.com/');
    console.log('');
    console.log('3. Get your current IP:');
    console.log('   Visit: https://whatismyipaddress.com/');
  }
};

testConnection();
