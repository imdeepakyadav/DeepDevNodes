import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../data');

/**
 * Migrate cryptocurrency data from JSON to MongoDB
 */
const migrateCryptoData = async () => {
  try {
    console.log('🔄 Migrating cryptocurrency data...');

    const cryptoPath = path.join(dataDir, 'crypto.json');
    if (!fs.existsSync(cryptoPath)) {
      console.log('⚠️  crypto.json not found, skipping...');
      return;
    }

    const cryptoData = JSON.parse(fs.readFileSync(cryptoPath, 'utf8'));

    // Clear existing data
    await Crypto.deleteMany({});

    // Insert new data
    const cryptoDocs = cryptoData.map((crypto) => ({
      ...crypto,
      last_updated: new Date(crypto.last_updated || Date.now()),
    }));

    await Crypto.insertMany(cryptoDocs);
    console.log(`✅ Migrated ${cryptoDocs.length} cryptocurrency records`);
  } catch (error) {
    console.error('❌ Failed to migrate cryptocurrency data:', error.message);
  }
};

/**
 * Migrate stock data from JSON to MongoDB
 */
const migrateStockData = async () => {
  try {
    console.log('🔄 Migrating stock data...');

    const stockPath = path.join(dataDir, 'stocks.json');
    if (!fs.existsSync(stockPath)) {
      console.log('⚠️  stocks.json not found, skipping...');
      return;
    }

    const stockData = JSON.parse(fs.readFileSync(stockPath, 'utf8'));

    // Clear existing data
    await Stock.deleteMany({});

    // Insert new data
    const stockDocs = stockData.map((stock) => ({
      ...stock,
      last_updated: new Date(stock.last_updated || Date.now()),
    }));

    await Stock.insertMany(stockDocs);
    console.log(`✅ Migrated ${stockDocs.length} stock records`);
  } catch (error) {
    console.error('❌ Failed to migrate stock data:', error.message);
  }
};

/**
 * Migrate GitHub data from JSON to MongoDB
 */
const migrateGitHubData = async () => {
  try {
    console.log('🔄 Migrating GitHub data...');

    const githubPath = path.join(dataDir, 'githubTrending.json');
    if (!fs.existsSync(githubPath)) {
      console.log('⚠️  githubTrending.json not found, skipping...');
      return;
    }

    const githubData = JSON.parse(fs.readFileSync(githubPath, 'utf8'));

    // Clear existing data
    await GitHubRepo.deleteMany({});

    // Insert new data
    const githubDocs = githubData.map((repo) => ({
      ...repo,
      last_updated: new Date(Date.now()),
    }));

    await GitHubRepo.insertMany(githubDocs);
    console.log(`✅ Migrated ${githubDocs.length} GitHub repository records`);
  } catch (error) {
    console.error('❌ Failed to migrate GitHub data:', error.message);
  }
};

/**
 * Migrate NPM data from JSON to MongoDB
 */
const migrateNpmData = async () => {
  try {
    console.log('🔄 Migrating NPM data...');

    const npmPath = path.join(dataDir, 'npmTrending.json');
    if (!fs.existsSync(npmPath)) {
      console.log('⚠️  npmTrending.json not found, skipping...');
      return;
    }

    const npmData = JSON.parse(fs.readFileSync(npmPath, 'utf8'));

    // Clear existing data
    await NpmPackage.deleteMany({});

    // Insert new data
    const npmDocs = npmData.map((pkg) => ({
      ...pkg,
      last_updated: new Date(Date.now()),
    }));

    await NpmPackage.insertMany(npmDocs);
    console.log(`✅ Migrated ${npmDocs.length} NPM package records`);
  } catch (error) {
    console.error('❌ Failed to migrate NPM data:', error.message);
  }
};

/**
 * Migrate StackOverflow data from JSON to MongoDB
 */
const migrateStackOverflowData = async () => {
  try {
    console.log('🔄 Migrating StackOverflow data...');

    const soPath = path.join(dataDir, 'stackoverflowTrending.json');
    if (!fs.existsSync(soPath)) {
      console.log('⚠️  stackoverflowTrending.json not found, skipping...');
      return;
    }

    const soData = JSON.parse(fs.readFileSync(soPath, 'utf8'));

    // Clear existing data
    await StackOverflowQuestion.deleteMany({});

    // Insert new data
    const soDocs = soData.map((question) => ({
      ...question,
      creation_date: new Date(question.creation_date),
      last_activity_date: new Date(question.last_activity_date),
      last_updated: new Date(Date.now()),
    }));

    await StackOverflowQuestion.insertMany(soDocs);
    console.log(`✅ Migrated ${soDocs.length} StackOverflow question records`);
  } catch (error) {
    console.error('❌ Failed to migrate StackOverflow data:', error.message);
  }
};

/**
 * Migrate Space data from JSON to MongoDB
 */
const migrateSpaceData = async () => {
  try {
    console.log('🔄 Migrating Space data...');

    const spacePath = path.join(dataDir, 'spaceLaunches.json');
    if (!fs.existsSync(spacePath)) {
      console.log('⚠️  spaceLaunches.json not found, skipping...');
      return;
    }

    const spaceData = JSON.parse(fs.readFileSync(spacePath, 'utf8'));

    // Clear existing data
    await SpaceLaunch.deleteMany({});

    // Insert new data
    const spaceDocs = spaceData.map((launch) => ({
      ...launch,
      date_utc: new Date(launch.date_utc),
      last_updated: new Date(Date.now()),
    }));

    await SpaceLaunch.insertMany(spaceDocs);
    console.log(`✅ Migrated ${spaceDocs.length} Space launch records`);
  } catch (error) {
    console.error('❌ Failed to migrate Space data:', error.message);
  }
};

/**
 * Migrate APOD data from JSON to MongoDB
 */
const migrateApodData = async () => {
  try {
    console.log('🔄 Migrating APOD data...');

    const apodPath = path.join(dataDir, 'apod.json');
    if (!fs.existsSync(apodPath)) {
      console.log('⚠️  apod.json not found, skipping...');
      return;
    }

    const apodData = JSON.parse(fs.readFileSync(apodPath, 'utf8'));

    // Clear existing data
    await APOD.deleteMany({});

    // Insert new data
    const apodDoc = {
      ...apodData,
      last_updated: new Date(Date.now()),
    };

    await APOD.create(apodDoc);
    console.log('✅ Migrated APOD record');
  } catch (error) {
    console.error('❌ Failed to migrate APOD data:', error.message);
  }
};

/**
 * Run all migrations
 */
const runMigrations = async () => {
  try {
    console.log('🚀 Starting data migration from JSON to MongoDB...');

    await connectDB();

    await Promise.allSettled([
      migrateCryptoData(),
      migrateStockData(),
      migrateGitHubData(),
      migrateNpmData(),
      migrateStackOverflowData(),
      migrateSpaceData(),
      migrateApodData(),
    ]);

    console.log('✅ Data migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Data migration failed:', error.message);
    process.exit(1);
  }
};

// Run migrations if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations();
}

export {
  migrateApodData,
  migrateCryptoData,
  migrateGitHubData,
  migrateNpmData,
  migrateSpaceData,
  migrateStackOverflowData,
  migrateStockData,
  runMigrations,
};
