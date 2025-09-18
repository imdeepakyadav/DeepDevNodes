import mongoose from 'mongoose';

const npmSchema = new mongoose.Schema(
  {
    rank: {
      type: Number,
      required: true,
    },
    package: {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      version: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        default: '',
      },
      keywords: [
        {
          type: String,
        },
      ],
      author: {
        name: {
          type: String,
          default: 'Unknown',
        },
        email: {
          type: String,
          default: '',
        },
      },
      license: {
        type: String,
        default: 'MIT',
      },
    },
    downloads: {
      type: Number,
      default: 0,
    },
    downloadsChange: {
      type: Number,
      default: 0,
    },
    stars: {
      type: Number,
      default: 0,
    },
    publisher: {
      name: {
        type: String,
        default: 'unknown',
      },
      email: {
        type: String,
        default: '',
      },
    },
    maintainers: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          default: '',
        },
      },
    ],
    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'npm_trending',
  }
);

// Index for efficient queries
npmSchema.index({ downloads: -1 });
npmSchema.index({ stars: -1 });
npmSchema.index({ last_updated: -1 });

export const NpmPackage = mongoose.model('NpmPackage', npmSchema);
