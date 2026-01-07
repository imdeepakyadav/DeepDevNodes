import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    otpId: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        `OTP${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    otp: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['SMS', 'VOICE', 'EMAIL', 'WHATSAPP'],
      default: 'SMS',
    },
    purpose: {
      type: String,
      enum: ['VERIFICATION', 'LOGIN', '2FA', 'TRANSACTION', 'PASSWORD_RESET'],
      default: 'VERIFICATION',
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'VERIFIED', 'EXPIRED', 'USED'],
      default: 'ACTIVE',
    },
    attempts: {
      type: Number,
      default: 0,
      max: 5,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    },
    verifiedAt: {
      type: Date,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
otpSchema.index({ phoneNumber: 1, status: 1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('OTP', otpSchema);
