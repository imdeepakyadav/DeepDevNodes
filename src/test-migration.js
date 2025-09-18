import fs from 'fs';
import path from 'path';
import connectDB from './config/database.js';
import { Crypto } from './models/index.js';

async function testMigration() {
  try {
    console.log('Testing crypto migration...');
    await connectDB();

    const cryptoPath = path.join('data', 'crypto.json');
    if (!fs.existsSync(cryptoPath)) {
      console.log('crypto.json not found');
      return;
    }

    const cryptoData = JSON.parse(fs.readFileSync(cryptoPath, 'utf8'));
    console.log(`Found ${cryptoData.length} crypto records`);

    // Clear existing data
    await Crypto.deleteMany({});
    console.log('Cleared existing crypto data');

    // Insert new data
    const cryptoDocs = cryptoData.map((crypto) => ({
      ...crypto,
      last_updated: new Date(crypto.last_updated || Date.now()),
    }));

    await Crypto.insertMany(cryptoDocs);
    console.log(`✅ Migrated ${cryptoDocs.length} cryptocurrency records`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Test migration failed:', error.message);
    process.exit(1);
  }
}

testMigration();