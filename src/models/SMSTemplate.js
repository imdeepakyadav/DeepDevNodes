import mongoose from 'mongoose';

const smsTemplateSchema = new mongoose.Schema(
  {
    templateId: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        `TPL${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'OTP',
        'PROMOTIONAL',
        'TRANSACTIONAL',
        'MARKETING',
        'ALERT',
        'REMINDER',
      ],
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 1600,
    },
    variables: [
      {
        type: String,
      },
    ],
    language: {
      type: String,
      default: 'en',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    dltTemplateId: {
      type: String,
    },
    sender: {
      type: String,
      default: 'DeepDevNodes',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
smsTemplateSchema.index({ category: 1, isActive: 1 });

export default mongoose.model('SMSTemplate', smsTemplateSchema);
