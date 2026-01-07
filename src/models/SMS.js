import mongoose from 'mongoose';

const smsSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        `SMS${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    },
    type: {
      type: String,
      enum: [
        'OTP',
        'PROMOTIONAL',
        'TRANSACTIONAL',
        'INTERNATIONAL',
        'SMART',
        'SIM_BASED',
      ],
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      default: 'DeepDevNodes',
    },
    message: {
      type: String,
      required: true,
      maxlength: 1600,
    },
    status: {
      type: String,
      enum: ['PENDING', 'SENT', 'DELIVERED', 'FAILED', 'QUEUED'],
      default: 'PENDING',
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
    country: {
      type: String,
      default: 'IN',
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
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
smsSchema.index({ to: 1 });
smsSchema.index({ status: 1 });
smsSchema.index({ createdAt: -1 });

export default mongoose.model('SMS', smsSchema);
