import mongoose from 'mongoose';

const factSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    fact: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'facts',
  }
);

// Index for efficient queries
factSchema.index({ category: 1 });
factSchema.index({ source: 1 });

export const Fact = mongoose.model('Fact', factSchema);
