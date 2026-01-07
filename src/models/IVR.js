import mongoose from 'mongoose';

const ivrSchema = new mongoose.Schema(
  {
    ivrId: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        `IVR${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['SINGLE_LEVEL', 'MULTI_TIER'],
      default: 'SINGLE_LEVEL',
    },
    welcomeMessage: {
      type: String,
      required: true,
    },
    options: [
      {
        key: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        action: {
          type: String,
          enum: ['PLAY_MESSAGE', 'TRANSFER', 'RECORD', 'HANGUP', 'SUBMENU'],
          required: true,
        },
        actionValue: {
          type: String,
        },
      },
    ],
    maxRetries: {
      type: Number,
      default: 3,
    },
    timeout: {
      type: Number,
      default: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ivrSchema.index({ isActive: 1 });

export default mongoose.model('IVR', ivrSchema);
