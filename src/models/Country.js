import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    capital: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    flag: {
      type: String,
      required: true,
    },
    languages: [
      {
        type: String,
      },
    ],
    region: {
      type: String,
      required: true,
    },
    subregion: {
      type: String,
      default: '',
    },
    population: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    timezones: [
      {
        type: String,
      },
    ],
    callingCode: {
      type: String,
      default: '',
    },
    states: [
      {
        type: String,
      },
    ],
    majorCities: [
      {
        name: {
          type: String,
          required: true,
        },
        population: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'countries',
  }
);

// Index for efficient queries
countrySchema.index({ region: 1 });
countrySchema.index({ subregion: 1 });
countrySchema.index({ population: -1 });
countrySchema.index({ area: -1 });

export const Country = mongoose.model('Country', countrySchema);
