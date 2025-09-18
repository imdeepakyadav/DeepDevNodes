import mongoose from 'mongoose';

const githubSchema = new mongoose.Schema(
  {
    rank: {
      type: Number,
      required: true,
    },
    repositoryName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: null,
    },
    stars: {
      type: Number,
      default: 0,
    },
    forks: {
      type: Number,
      default: 0,
    },
    starsToday: {
      type: Number,
      default: 0,
    },
    owner: {
      login: {
        type: String,
        required: true,
      },
      avatar_url: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: 'User',
      },
    },
    url: {
      type: String,
      required: true,
    },
    builtBy: [
      {
        username: {
          type: String,
          required: true,
        },
        href: {
          type: String,
          required: true,
        },
        avatar: {
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
    collection: 'github_trending',
  }
);

// Index for efficient queries
githubSchema.index({ stars: -1 });
githubSchema.index({ language: 1 });
githubSchema.index({ last_updated: -1 });

export const GitHubRepo = mongoose.model('GitHubRepo', githubSchema);
