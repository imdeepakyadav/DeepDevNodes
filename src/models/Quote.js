import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    quote: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'quotes',
  }
);

// Index for efficient queries
quoteSchema.index({ author: 1 });
quoteSchema.index({ category: 1 });

export const Quote = mongoose.model('Quote', quoteSchema);
