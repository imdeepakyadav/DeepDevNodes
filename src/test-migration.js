import fs from 'fs';
import path from 'path';
import connectDB from './config/database.js';
import { Crypto } from './models/index.js';

async function testMigration() {
  try {
    console.log('Testing crypto migration...');
    await connectDB();

    const cryptoPath = path.join('src', 'data', 'crypto.json');
    if (!fs.existsSync(cryptoPath)) {
      console.log('crypto.json not found');
      return;
    }

    const cryptoData = JSON.parse(fs.readFileSync(cryptoPath, 'utf8'));
    console.log(`Found ${cryptoData.length} crypto records`);

    // Remove duplicates based on symbol
    const uniqueCryptoData = cryptoData.filter(
      (crypto, index, self) =>
        index === self.findIndex((c) => c.symbol === crypto.symbol)
    );
    console.log(
      `After removing duplicates: ${uniqueCryptoData.length} records`
    );

    // Clear existing data
    console.log('Clearing existing crypto data...');
    const deleteResult = await Crypto.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing records`);

    // Verify deletion
    const countAfterDelete = await Crypto.countDocuments();
    console.log(`Records after deletion: ${countAfterDelete}`);

    // Insert new data
    const cryptoDocs = uniqueCryptoData.map((crypto) => ({
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
