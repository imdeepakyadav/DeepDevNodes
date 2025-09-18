import mongoose from 'mongoose';

const jokeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    joke: {
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
    collection: 'jokes',
  }
);

// Index for efficient queries
jokeSchema.index({ category: 1 });

export const Joke = mongoose.model('Joke', jokeSchema);
