import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import {
  Country,
  Fact,
  Joke,
  MemeTemplate,
  Planet,
  Quote,
  RandomUser,
} from './models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');

/**
 * Load JSON data from file
 */
const loadJsonData = (fileName) => {
  try {
    const filePath = path.join(dataDir, fileName);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File ${fileName} not found, skipping...`);
      return null;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`❌ Error loading ${fileName}:`, error.message);
    return null;
  }
};

/**
 * Migrate countries data
 */
const migrateCountries = async () => {
  try {
    console.log('Migrating countries data...');
    const countriesData = loadJsonData('countries.json');

    if (!countriesData) return;

    // Clear existing data
    await Country.deleteMany({});

    // Transform data to match schema
    const transformedData = countriesData.map((country) => ({
      name: country.name,
      code: country.code,
      capital: country.capital,
      currency: country.currency,
      flag: country.flag,
      languages: country.languages || [],
      region: country.region,
      subregion: country.subregion || '',
      population: country.population,
      area: country.area,
      timezones: country.timezones || [],
      callingCode: country.callingCode || '',
      states: country.states || [],
      majorCities: country.majorCities || [],
    }));

    await Country.insertMany(transformedData, { ordered: false });
    console.log(
      `✅ Countries data migrated successfully - ${transformedData.length} records`
    );
  } catch (error) {
    console.error('❌ Failed to migrate countries data:', error.message);
  }
};

/**
 * Migrate jokes data
 */
const migrateJokes = async () => {
  try {
    console.log('Migrating jokes data...');
    const jokesData = loadJsonData('jokes.json');

    if (!jokesData) return;

    // Clear existing data
    await Joke.deleteMany({});

    await Joke.insertMany(jokesData, { ordered: false });
    console.log(
      `✅ Jokes data migrated successfully - ${jokesData.length} records`
    );
  } catch (error) {
    console.error('❌ Failed to migrate jokes data:', error.message);
  }
};

/**
 * Migrate quotes data
 */
const migrateQuotes = async () => {
  try {
    console.log('Migrating quotes data...');
    const quotesData = loadJsonData('quotes.json');

    if (!quotesData) return;

    // Clear existing data
    await Quote.deleteMany({});

    await Quote.insertMany(quotesData, { ordered: false });
    console.log(
      `✅ Quotes data migrated successfully - ${quotesData.length} records`
    );
  } catch (error) {
    console.error('❌ Failed to migrate quotes data:', error.message);
  }
};

/**
 * Migrate facts data
 */
const migrateFacts = async () => {
  try {
    console.log('Migrating facts data...');
    const factsData = loadJsonData('facts.json');

    if (!factsData) return;

    // Clear existing data
    await Fact.deleteMany({});

    await Fact.insertMany(factsData, { ordered: false });
    console.log(
      `✅ Facts data migrated successfully - ${factsData.length} records`
    );
  } catch (error) {
    console.error('❌ Failed to migrate facts data:', error.message);
  }
};

/**
 * Migrate planets data
 */
const migratePlanets = async () => {
  try {
    console.log('Migrating planets data...');
    const planetsData = loadJsonData('planets.json');

    if (!planetsData) return;

    // Clear existing data
    await Planet.deleteMany({});

    await Planet.insertMany(planetsData, { ordered: false });
    console.log(
      `✅ Planets data migrated successfully - ${planetsData.length} records`
    );
  } catch (error) {
    console.error('❌ Failed to migrate planets data:', error.message);
  }
};

/**
 * Migrate meme templates data
 */
const migrateMemeTemplates = async () => {
  try {
    console.log('Migrating meme templates data...');
    const memeTemplatesData = loadJsonData('memeTemplates.json');

    if (!memeTemplatesData) return;

    // Clear existing data
    await MemeTemplate.deleteMany({});

    await MemeTemplate.insertMany(memeTemplatesData, { ordered: false });
    console.log(
      `✅ Meme templates data migrated successfully - ${memeTemplatesData.length} records`
    );
  } catch (error) {
    console.error('❌ Failed to migrate meme templates data:', error.message);
  }
};

/**
 * Migrate random users data
 */
const migrateRandomUsers = async () => {
  try {
    console.log('Migrating random users data...');
    const randomUsersData = loadJsonData('randomUsers.json');

    if (!randomUsersData) return;

    // Clear existing data
    await RandomUser.deleteMany({});

    await RandomUser.insertMany(randomUsersData, { ordered: false });
    console.log(
      `✅ Random users data migrated successfully - ${randomUsersData.length} records`
    );
  } catch (error) {
    console.error('❌ Failed to migrate random users data:', error.message);
  }
};

/**
 * Run all migrations
 */
const runMigrations = async () => {
  try {
    console.log('🚀 Starting comprehensive data migration...');

    // Connect to MongoDB
    await connectDB();

    // Run all migrations
    await Promise.allSettled([
      migrateCountries(),
      migrateJokes(),
      migrateQuotes(),
      migrateFacts(),
      migratePlanets(),
      migrateMemeTemplates(),
      migrateRandomUsers(),
    ]);

    console.log('✅ All data migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration process failed:', error.message);
    process.exit(1);
  }
};

// Run migrations if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations();
}

export {
  migrateCountries,
  migrateFacts,
  migrateJokes,
  migrateMemeTemplates,
  migratePlanets,
  migrateQuotes,
  migrateRandomUsers,
  runMigrations,
};
