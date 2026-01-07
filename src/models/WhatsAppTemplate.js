import mongoose from 'mongoose';

const whatsappTemplateSchema = new mongoose.Schema(
  {
    templateId: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        `WATPL${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['MARKETING', 'UTILITY', 'AUTHENTICATION', 'SERVICE'],
      required: true,
    },
    language: {
      type: String,
      default: 'en',
    },
    headerType: {
      type: String,
      enum: ['NONE', 'TEXT', 'IMAGE', 'VIDEO', 'DOCUMENT'],
      default: 'NONE',
    },
    headerContent: {
      type: String,
    },
    bodyContent: {
      type: String,
      required: true,
    },
    footerContent: {
      type: String,
    },
    buttons: [
      {
        type: {
          type: String,
          enum: ['QUICK_REPLY', 'CALL_TO_ACTION', 'URL'],
        },
        text: String,
        value: String,
      },
    ],
    variables: [
      {
        type: String,
      },
    ],
    industry: {
      type: String,
      enum: [
        'EDUCATION',
        'TRAVEL',
        'BANKING',
        'REAL_ESTATE',
        'HEALTHCARE',
        'GENERAL',
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    approvalStatus: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
whatsappTemplateSchema.index({ category: 1, isActive: 1 });
whatsappTemplateSchema.index({ approvalStatus: 1 });

export default mongoose.model('WhatsAppTemplate', whatsappTemplateSchema);
