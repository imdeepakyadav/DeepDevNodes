import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// MongoDB Connection URI
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/deepdevnodes';

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected for data cleanup');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Fix SMS priority values
async function fixSMSPriority() {
  try {
    const SMS = mongoose.connection.collection('sms');

    // Update lowercase priority values to uppercase
    const result = await SMS.updateMany(
      { priority: { $in: ['low', 'medium', 'high', 'urgent'] } },
      [
        {
          $set: {
            priority: {
              $switch: {
                branches: [
                  { case: { $eq: ['$priority', 'low'] }, then: 'LOW' },
                  { case: { $eq: ['$priority', 'medium'] }, then: 'MEDIUM' },
                  { case: { $eq: ['$priority', 'high'] }, then: 'HIGH' },
                  { case: { $eq: ['$priority', 'urgent'] }, then: 'URGENT' },
                ],
                default: '$priority',
              },
            },
          },
        },
      ]
    );

    console.log(
      `✅ Updated ${result.modifiedCount} SMS documents with correct priority values`
    );
  } catch (error) {
    console.error('❌ Error fixing SMS priority:', error);
  }
}

// Fix SMS status values
async function fixSMSStatus() {
  try {
    const SMS = mongoose.connection.collection('sms');

    const result = await SMS.updateMany(
      {
        status: {
          $in: ['pending', 'sent', 'delivered', 'failed', 'queued'],
        },
      },
      [
        {
          $set: {
            status: {
              $switch: {
                branches: [
                  { case: { $eq: ['$status', 'pending'] }, then: 'PENDING' },
                  { case: { $eq: ['$status', 'sent'] }, then: 'SENT' },
                  {
                    case: { $eq: ['$status', 'delivered'] },
                    then: 'DELIVERED',
                  },
                  { case: { $eq: ['$status', 'failed'] }, then: 'FAILED' },
                  { case: { $eq: ['$status', 'queued'] }, then: 'QUEUED' },
                ],
                default: '$status',
              },
            },
          },
        },
      ]
    );

    console.log(
      `✅ Updated ${result.modifiedCount} SMS documents with correct status values`
    );
  } catch (error) {
    console.error('❌ Error fixing SMS status:', error);
  }
}

// Fix SMS type values
async function fixSMSType() {
  try {
    const SMS = mongoose.connection.collection('sms');

    const result = await SMS.updateMany(
      {
        type: {
          $in: [
            'otp',
            'promotional',
            'transactional',
            'international',
            'smart',
            'sim_based',
          ],
        },
      },
      [
        {
          $set: {
            type: {
              $switch: {
                branches: [
                  { case: { $eq: ['$type', 'otp'] }, then: 'OTP' },
                  {
                    case: { $eq: ['$type', 'promotional'] },
                    then: 'PROMOTIONAL',
                  },
                  {
                    case: { $eq: ['$type', 'transactional'] },
                    then: 'TRANSACTIONAL',
                  },
                  {
                    case: { $eq: ['$type', 'international'] },
                    then: 'INTERNATIONAL',
                  },
                  { case: { $eq: ['$type', 'smart'] }, then: 'SMART' },
                  { case: { $eq: ['$type', 'sim_based'] }, then: 'SIM_BASED' },
                ],
                default: '$type',
              },
            },
          },
        },
      ]
    );

    console.log(
      `✅ Updated ${result.modifiedCount} SMS documents with correct type values`
    );
  } catch (error) {
    console.error('❌ Error fixing SMS type:', error);
  }
}

// Main cleanup function
async function cleanupData() {
  console.log('🔧 Starting data cleanup...\n');

  await connectDB();

  await fixSMSPriority();
  await fixSMSStatus();
  await fixSMSType();

  console.log('\n✅ Data cleanup completed successfully!');

  await mongoose.connection.close();
  console.log('🔌 Database connection closed');
  process.exit(0);
}

// Run cleanup
cleanupData().catch((error) => {
  console.error('❌ Cleanup failed:', error);
  process.exit(1);
});
