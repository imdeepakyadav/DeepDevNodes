import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    change: {
      type: Number,
      default: 0,
    },
    change_percent: {
      type: Number,
      default: 0,
    },
    volume: {
      type: Number,
      default: 0,
    },
    market_cap: {
      type: Number,
      default: 0,
    },
    pe_ratio: {
      type: Number,
      default: 0,
    },
    dividend_yield: {
      type: Number,
      default: 0,
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
    exchange: {
      type: String,
      default: 'NASDAQ',
    },
    sector: {
      type: String,
      default: 'Technology',
    },
    industry: {
      type: String,
      default: 'Software',
    },
  },
  {
    timestamps: true,
    collection: 'stocks',
  }
);

// Index for efficient queries
stockSchema.index({ sector: 1 });
stockSchema.index({ last_updated: -1 });

export const Stock = mongoose.model('Stock', stockSchema);
