import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema(
  {
    campaignId: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        `CAMP${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['SMS', 'VOICE', 'WHATSAPP', 'EMAIL', 'MULTI_CHANNEL'],
      required: true,
    },
    category: {
      type: String,
      enum: ['MARKETING', 'SALES', 'LEAD_NURTURE', 'FOLLOW_UP', 'PROMOTIONAL'],
      required: true,
    },
    status: {
      type: String,
      enum: [
        'DRAFT',
        'SCHEDULED',
        'RUNNING',
        'PAUSED',
        'COMPLETED',
        'CANCELLED',
      ],
      default: 'DRAFT',
    },
    templateId: {
      type: String,
    },
    targetAudience: {
      segments: [String],
      filters: {
        type: Map,
        of: String,
      },
    },
    scheduledAt: {
      type: Date,
    },
    startedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    statistics: {
      totalRecipients: {
        type: Number,
        default: 0,
      },
      sent: {
        type: Number,
        default: 0,
      },
      delivered: {
        type: Number,
        default: 0,
      },
      failed: {
        type: Number,
        default: 0,
      },
      opened: {
        type: Number,
        default: 0,
      },
      clicked: {
        type: Number,
        default: 0,
      },
      conversions: {
        type: Number,
        default: 0,
      },
    },
    budget: {
      type: Number,
    },
    automationRules: [
      {
        trigger: String,
        condition: String,
        action: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
campaignSchema.index({ status: 1 });
campaignSchema.index({ type: 1 });
campaignSchema.index({ createdAt: -1 });

export default mongoose.model('Campaign', campaignSchema);
