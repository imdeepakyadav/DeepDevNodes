import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    leadId: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        `LEAD${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    },
    source: {
      type: String,
      enum: [
        'FACEBOOK',
        'GOOGLE',
        'WHATSAPP',
        'INDIAMART',
        'TRADEINDIA',
        'WEBSITE',
        'LANDING_PAGE',
        'QR_CODE',
        'MANUAL',
      ],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'],
      default: 'NEW',
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
    },
    message: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    assignedTo: {
      type: String,
    },
    followUpDate: {
      type: Date,
    },
    automationTriggered: {
      type: Boolean,
      default: false,
    },
    automationActions: [
      {
        action: String,
        triggeredAt: Date,
        status: String,
      },
    ],
    metadata: {
      type: Map,
      of: String,
    },
    notes: [
      {
        note: String,
        addedBy: String,
        addedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes
leadSchema.index({ source: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ phone: 1 });
leadSchema.index({ createdAt: -1 });

export default mongoose.model('Lead', leadSchema);
