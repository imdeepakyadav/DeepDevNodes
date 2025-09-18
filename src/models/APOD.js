import mongoose from 'mongoose';

const apodSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    hdurl: {
      type: String,
      default: '',
    },
    media_type: {
      type: String,
      required: true,
      enum: ['image', 'video'],
    },
    service_version: {
      type: String,
      default: 'v1',
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'apod',
  }
);

// Index for efficient queries
apodSchema.index({ date: -1 });
apodSchema.index({ last_updated: -1 });

export const APOD = mongoose.model('APOD', apodSchema);
