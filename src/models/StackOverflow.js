import mongoose from 'mongoose';

const stackoverflowSchema = new mongoose.Schema(
  {
    question_id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      default: '',
    },
    tags: [
      {
        type: String,
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
    view_count: {
      type: Number,
      default: 0,
    },
    answer_count: {
      type: Number,
      default: 0,
    },
    creation_date: {
      type: Date,
      required: true,
    },
    last_activity_date: {
      type: Date,
      default: Date.now,
    },
    owner: {
      user_id: {
        type: Number,
        required: true,
      },
      display_name: {
        type: String,
        required: true,
      },
      reputation: {
        type: Number,
        default: 0,
      },
      user_type: {
        type: String,
        default: 'registered',
      },
      profile_image: {
        type: String,
        default: '',
      },
      link: {
        type: String,
        default: '',
      },
    },
    is_answered: {
      type: Boolean,
      default: false,
    },
    accepted_answer_id: {
      type: Number,
      default: null,
    },
    link: {
      type: String,
      required: true,
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'stackoverflow_trending',
  }
);

// Index for efficient queries
stackoverflowSchema.index({ score: -1 });
stackoverflowSchema.index({ tags: 1 });
stackoverflowSchema.index({ creation_date: -1 });
stackoverflowSchema.index({ last_updated: -1 });

export const StackOverflowQuestion = mongoose.model(
  'StackOverflowQuestion',
  stackoverflowSchema
);
