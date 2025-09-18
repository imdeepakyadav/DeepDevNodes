import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import connectDB from './config/database.js';
import {
  APOD,
  Country,
  Crypto,
  Fact,
  GitHubRepo,
  Joke,
  MemeTemplate,
  NpmPackage,
  Planet,
  Quote,
  RandomUser,
  SpaceLaunch,
  StackOverflowQuestion,
  Stock,
} from './models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');

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

    // Remove duplicates based on symbol
    const uniqueCryptoData = cryptoData.filter(
      (crypto, index, self) =>
        index === self.findIndex((c) => c.symbol === crypto.symbol)
    );

    // Clear existing data
    await Crypto.deleteMany({});

    // Insert new data
    const cryptoDocs = uniqueCryptoData.map((crypto) => ({
      ...crypto,
      last_updated: new Date(crypto.last_updated || Date.now()),
    }));

    await Crypto.insertMany(cryptoDocs);
    console.log(
      `✅ Migrated ${cryptoDocs.length} cryptocurrency records (from ${cryptoData.length} total)`
    );
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

    // Remove duplicates based on package name
    const uniqueNpmData = npmData.filter(
      (pkg, index, self) =>
        index === self.findIndex((p) => p.package?.name === pkg.package?.name)
    );

    // Clear existing data
    await NpmPackage.deleteMany({});

    // Insert new data
    const npmDocs = uniqueNpmData.map((pkg) => ({
      ...pkg,
      last_updated: new Date(Date.now()),
    }));

    await NpmPackage.insertMany(npmDocs);
    console.log(
      `✅ Migrated ${npmDocs.length} NPM package records (from ${npmData.length} total)`
    );
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
 * Migrate countries data from JSON to MongoDB
 */
const migrateCountriesData = async () => {
  try {
    console.log('🔄 Migrating countries data...');

    const countriesPath = path.join(dataDir, 'countries.json');
    if (!fs.existsSync(countriesPath)) {
      console.log('⚠️  countries.json not found, skipping...');
      return;
    }

    const countriesData = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

    // Clear existing data
    await Country.deleteMany({});

    // Insert new data
    const countryDocs = countriesData.map((country) => ({
      ...country,
      last_updated: new Date(Date.now()),
    }));

    await Country.insertMany(countryDocs);
    console.log(`✅ Migrated ${countryDocs.length} country records`);
  } catch (error) {
    console.error('❌ Failed to migrate countries data:', error.message);
  }
};

/**
 * Migrate facts data from JSON to MongoDB
 */
const migrateFactsData = async () => {
  try {
    console.log('🔄 Migrating facts data...');

    const factsPath = path.join(dataDir, 'facts.json');
    if (!fs.existsSync(factsPath)) {
      console.log('⚠️  facts.json not found, skipping...');
      return;
    }

    const factsData = JSON.parse(fs.readFileSync(factsPath, 'utf8'));

    // Clear existing data
    await Fact.deleteMany({});

    // Insert new data
    const factDocs = factsData.map((fact) => ({
      ...fact,
      last_updated: new Date(Date.now()),
    }));

    await Fact.insertMany(factDocs);
    console.log(`✅ Migrated ${factDocs.length} fact records`);
  } catch (error) {
    console.error('❌ Failed to migrate facts data:', error.message);
  }
};

/**
 * Migrate jokes data from JSON to MongoDB
 */
const migrateJokesData = async () => {
  try {
    console.log('🔄 Migrating jokes data...');

    const jokesPath = path.join(dataDir, 'jokes.json');
    if (!fs.existsSync(jokesPath)) {
      console.log('⚠️  jokes.json not found, skipping...');
      return;
    }

    const jokesData = JSON.parse(fs.readFileSync(jokesPath, 'utf8'));

    // Clear existing data
    await Joke.deleteMany({});

    // Insert new data
    const jokeDocs = jokesData.map((joke) => ({
      ...joke,
      last_updated: new Date(Date.now()),
    }));

    await Joke.insertMany(jokeDocs);
    console.log(`✅ Migrated ${jokeDocs.length} joke records`);
  } catch (error) {
    console.error('❌ Failed to migrate jokes data:', error.message);
  }
};

/**
 * Migrate meme templates data from JSON to MongoDB
 */
const migrateMemeTemplatesData = async () => {
  try {
    console.log('🔄 Migrating meme templates data...');

    const memeTemplatesPath = path.join(dataDir, 'memeTemplates.json');
    if (!fs.existsSync(memeTemplatesPath)) {
      console.log('⚠️  memeTemplates.json not found, skipping...');
      return;
    }

    const memeTemplatesData = JSON.parse(
      fs.readFileSync(memeTemplatesPath, 'utf8')
    );

    // Clear existing data
    await MemeTemplate.deleteMany({});

    // Insert new data
    const memeTemplateDocs = memeTemplatesData.map((template) => ({
      ...template,
      last_updated: new Date(Date.now()),
    }));

    await MemeTemplate.insertMany(memeTemplateDocs);
    console.log(`✅ Migrated ${memeTemplateDocs.length} meme template records`);
  } catch (error) {
    console.error('❌ Failed to migrate meme templates data:', error.message);
  }
};

/**
 * Migrate planets data from JSON to MongoDB
 */
const migratePlanetsData = async () => {
  try {
    console.log('🔄 Migrating planets data...');

    const planetsPath = path.join(dataDir, 'planets.json');
    if (!fs.existsSync(planetsPath)) {
      console.log('⚠️  planets.json not found, skipping...');
      return;
    }

    const planetsData = JSON.parse(fs.readFileSync(planetsPath, 'utf8'));

    // Clear existing data
    await Planet.deleteMany({});

    // Insert new data
    const planetDocs = planetsData.map((planet) => ({
      ...planet,
      last_updated: new Date(Date.now()),
    }));

    await Planet.insertMany(planetDocs);
    console.log(`✅ Migrated ${planetDocs.length} planet records`);
  } catch (error) {
    console.error('❌ Failed to migrate planets data:', error.message);
  }
};

/**
 * Migrate quotes data from JSON to MongoDB
 */
const migrateQuotesData = async () => {
  try {
    console.log('🔄 Migrating quotes data...');

    const quotesPath = path.join(dataDir, 'quotes.json');
    if (!fs.existsSync(quotesPath)) {
      console.log('⚠️  quotes.json not found, skipping...');
      return;
    }

    const quotesData = JSON.parse(fs.readFileSync(quotesPath, 'utf8'));

    // Clear existing data
    await Quote.deleteMany({});

    // Insert new data
    const quoteDocs = quotesData.map((quote) => ({
      ...quote,
      last_updated: new Date(Date.now()),
    }));

    await Quote.insertMany(quoteDocs);
    console.log(`✅ Migrated ${quoteDocs.length} quote records`);
  } catch (error) {
    console.error('❌ Failed to migrate quotes data:', error.message);
  }
};

/**
 * Migrate random users data from JSON to MongoDB
 */
const migrateRandomUsersData = async () => {
  try {
    console.log('🔄 Migrating random users data...');

    const randomUsersPath = path.join(dataDir, 'randomUsers.json');
    if (!fs.existsSync(randomUsersPath)) {
      console.log('⚠️  randomUsers.json not found, skipping...');
      return;
    }

    const randomUsersData = JSON.parse(
      fs.readFileSync(randomUsersPath, 'utf8')
    );

    // Clear existing data
    await RandomUser.deleteMany({});

    // Insert new data
    const randomUserDocs = randomUsersData.map((user) => ({
      ...user,
      last_updated: new Date(Date.now()),
    }));

    await RandomUser.insertMany(randomUserDocs);
    console.log(`✅ Migrated ${randomUserDocs.length} random user records`);
  } catch (error) {
    console.error('❌ Failed to migrate random users data:', error.message);
  }
};

/**
 * Run all migrations
 */
const runMigrations = async () => {
  try {
    console.log('🚀 Starting data migration from JSON to MongoDB...');

    await connectDB();

    console.log('🔄 Running migrations sequentially...');

    await migrateCryptoData();
    await migrateStockData();
    await migrateGitHubData();
    await migrateNpmData();
    await migrateStackOverflowData();
    await migrateSpaceData();
    await migrateApodData();
    await migrateCountriesData();
    await migrateFactsData();
    await migrateJokesData();
    await migrateMemeTemplatesData();
    await migratePlanetsData();
    await migrateQuotesData();
    await migrateRandomUsersData();

    console.log('✅ Data migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Data migration failed:', error.message);
    process.exit(1);
  }
};

// Run migrations if this script is executed directly
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runMigrations();
}

export {
  migrateApodData,
  migrateCountriesData,
  migrateCryptoData,
  migrateFactsData,
  migrateGitHubData,
  migrateJokesData,
  migrateMemeTemplatesData,
  migrateNpmData,
  migratePlanetsData,
  migrateQuotesData,
  migrateRandomUsersData,
  migrateSpaceData,
  migrateStackOverflowData,
  migrateStockData,
  runMigrations,
};
