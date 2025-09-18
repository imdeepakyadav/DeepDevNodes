import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema(
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
    change_24h: {
      type: Number,
      default: 0,
    },
    change_percent_24h: {
      type: Number,
      default: 0,
    },
    market_cap: {
      type: Number,
      default: 0,
    },
    volume_24h: {
      type: Number,
      default: 0,
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
    rank: {
      type: Number,
      default: 0,
    },
    supply: {
      circulating: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
    collection: 'cryptocurrencies',
  }
);

// Index for efficient queries
cryptoSchema.index({ market_cap: -1 });
cryptoSchema.index({ last_updated: -1 });

export const Crypto = mongoose.model('Crypto', cryptoSchema);
