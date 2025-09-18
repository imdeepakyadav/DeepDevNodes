import connectDB from './config/database.js';
import { Crypto } from './models/index.js';

async function testConnection() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Test basic operations
    console.log('Testing MongoDB connection...');

    // Try to count documents in Crypto collection
    const count = await Crypto.countDocuments();
    console.log(
      `✅ MongoDB connected successfully! Found ${count} crypto records`
    );

    // Test inserting a sample document
    const testDoc = {
      symbol: 'TEST',
      name: 'Test Coin',
      price: 1.0,
      change_24h: 0.1,
      change_percent_24h: 10.0,
      market_cap: 1000000,
      volume_24h: 100000,
      last_updated: new Date(),
      rank: 999,
      supply: {
        circulating: 1000000,
        total: 1000000,
        max: 1000000,
      },
    };

    await Crypto.create(testDoc);
    console.log('✅ Successfully inserted test document');

    // Clean up test document
    await Crypto.deleteOne({ symbol: 'TEST' });
    console.log('✅ Successfully deleted test document');

    console.log('🎉 MongoDB setup is working correctly!');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB test failed:', error.message);
    process.exit(1);
  }
}

testConnection();
