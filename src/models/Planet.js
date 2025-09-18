import mongoose from 'mongoose';

const planetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    distance_from_sun: {
      type: Number,
      required: true,
    },
    diameter: {
      type: Number,
      required: true,
    },
    mass: {
      type: Number,
      required: true,
    },
    orbital_period: {
      type: Number,
      required: true,
    },
    rotation_period: {
      type: Number,
      required: true,
    },
    moons: {
      type: Number,
      default: 0,
    },
    rings: {
      type: Boolean,
      default: false,
    },
    atmosphere: [
      {
        type: String,
      },
    ],
    surface_temperature: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
      average: {
        type: Number,
        required: true,
      },
    },
    gravity: {
      type: Number,
      required: true,
    },
    escape_velocity: {
      type: Number,
      required: true,
    },
    discovery_date: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'planets',
  }
);

// Index for efficient queries
planetSchema.index({ type: 1 });
planetSchema.index({ moons: -1 });
planetSchema.index({ distance_from_sun: 1 });

export const Planet = mongoose.model('Planet', planetSchema);
