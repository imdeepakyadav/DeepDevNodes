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

async function clearAllCollections() {
  try {
    await connectDB();
    console.log('Clearing all collections...');

    await Promise.all([
      Crypto.deleteMany({}),
      Stock.deleteMany({}),
      GitHubRepo.deleteMany({}),
      NpmPackage.deleteMany({}),
      StackOverflowQuestion.deleteMany({}),
      SpaceLaunch.deleteMany({}),
      APOD.deleteMany({}),
    ]);

    console.log('✅ All collections cleared successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to clear collections:', error.message);
    process.exit(1);
  }
}

clearAllCollections();
