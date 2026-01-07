import mongoose from 'mongoose';

const whatsappMessageSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        `WA${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    },
    type: {
      type: String,
      enum: ['TEXT', 'TEMPLATE', 'MEDIA', 'DOCUMENT', 'INTERACTIVE', 'FLOW'],
      required: true,
    },
    category: {
      type: String,
      enum: ['MARKETING', 'UTILITY', 'AUTHENTICATION', 'SERVICE'],
      default: 'UTILITY',
    },
    to: {
      type: String,
      required: true,
    },
    from: {
      type: String,
    },
    content: {
      type: String,
    },
    templateId: {
      type: String,
    },
    mediaUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ['PENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED'],
      default: 'PENDING',
    },
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
    scheduledAt: {
      type: Date,
    },
    sentAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
    readAt: {
      type: Date,
    },
    metadata: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
whatsappMessageSchema.index({ to: 1 });
whatsappMessageSchema.index({ status: 1 });
whatsappMessageSchema.index({ createdAt: -1 });

export default mongoose.model('WhatsAppMessage', whatsappMessageSchema);
