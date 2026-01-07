import mongoose from 'mongoose';

const qrCodeSchema = new mongoose.Schema(
  {
    qrId: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        `QR${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        'URL',
        'TEXT',
        'VCARD',
        'WIFI',
        'EMAIL',
        'SMS',
        'PHONE',
        'LOCATION',
        'WHATSAPP',
        'PAYMENT',
      ],
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    qrCodeUrl: {
      type: String,
    },
    qrCodeBase64: {
      type: String,
    },
    scanCount: {
      type: Number,
      default: 0,
    },
    lastScannedAt: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
    },
    trackingEnabled: {
      type: Boolean,
      default: true,
    },
    scans: [
      {
        scannedAt: Date,
        ipAddress: String,
        location: {
          country: String,
          city: String,
          latitude: Number,
          longitude: Number,
        },
        device: String,
        browser: String,
      },
    ],
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
qrCodeSchema.index({ isActive: 1 });
qrCodeSchema.index({ createdAt: -1 });

export default mongoose.model('QRCode', qrCodeSchema);
