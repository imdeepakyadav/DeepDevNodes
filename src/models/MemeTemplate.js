import mongoose from 'mongoose';

const memeTemplateSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    template_url: {
      type: String,
      required: true,
    },
    text_boxes: [
      {
        id: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          default: '',
        },
        x: {
          type: Number,
          required: true,
        },
        y: {
          type: Number,
          required: true,
        },
        width: {
          type: Number,
          required: true,
        },
        height: {
          type: Number,
          required: true,
        },
        color: {
          type: String,
          default: '#ffffff',
        },
        font_size: {
          type: Number,
          default: 24,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'meme_templates',
  }
);

// Index for efficient queries
memeTemplateSchema.index({ name: 1 });
// Removed duplicate index on 'id' since unique: true already creates it

export const MemeTemplate = mongoose.model('MemeTemplate', memeTemplateSchema);
