import connectDB from './config/database.js';
import {
  APOD,
  Crypto,
  GitHubRepo,
  NpmPackage,
  SpaceLaunch,
  StackOverflowQuestion,
  Stock,
} from './models/index.js';

async function checkCollections() {
  try {
    // Connect to MongoDB
    await connectDB();

    console.log('Checking existing collections...');

    const collections = [
      { name: 'Cryptocurrencies', model: Crypto },
      { name: 'Stocks', model: Stock },
      { name: 'GitHub Repos', model: GitHubRepo },
      { name: 'NPM Packages', model: NpmPackage },
      { name: 'StackOverflow Questions', model: StackOverflowQuestion },
      { name: 'Space Launches', model: SpaceLaunch },
      { name: 'APOD', model: APOD },
    ];

    for (const collection of collections) {
      try {
        const count = await collection.model.countDocuments();
        console.log(`${collection.name}: ${count} documents`);
      } catch (error) {
        console.log(`${collection.name}: Error - ${error.message}`);
      }
    }

    console.log('Collection check complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
    process.exit(1);
  }
}

checkCollections();
