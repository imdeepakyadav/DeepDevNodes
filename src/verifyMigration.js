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

async function verifyMigration() {
  try {
    // Connect to MongoDB
    await connectDB();

    console.log('🔍 Verifying data migration...\n');

    const collections = [
      { name: 'Countries', model: Country },
      { name: 'Jokes', model: Joke },
      { name: 'Quotes', model: Quote },
      { name: 'Facts', model: Fact },
      { name: 'Planets', model: Planet },
      { name: 'Meme Templates', model: MemeTemplate },
      { name: 'Random Users', model: RandomUser },
    ];

    let totalRecords = 0;

    for (const collection of collections) {
      try {
        const count = await collection.model.countDocuments();
        console.log(`${collection.name}: ${count} records`);
        totalRecords += count;
      } catch (error) {
        console.log(`${collection.name}: Error - ${error.message}`);
      }
    }

    console.log(`\n📊 Total records migrated: ${totalRecords}`);
    console.log('✅ Data migration verification completed!');

    // Sample data check
    console.log('\n🔍 Sample data check:');

    try {
      const sampleCountry = await Country.findOne().limit(1);
      if (sampleCountry) {
        console.log(
          `Sample Country: ${sampleCountry.name} (${sampleCountry.code})`
        );
      }

      const sampleJoke = await Joke.findOne().limit(1);
      if (sampleJoke) {
        console.log(`Sample Joke: "${sampleJoke.joke.substring(0, 50)}..."`);
      }

      const sampleQuote = await Quote.findOne().limit(1);
      if (sampleQuote) {
        console.log(
          `Sample Quote: "${sampleQuote.quote.substring(0, 50)}..." - ${sampleQuote.author}`
        );
      }
    } catch (error) {
      console.log('Error fetching sample data:', error.message);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    process.exit(1);
  }
}

verifyMigration();
