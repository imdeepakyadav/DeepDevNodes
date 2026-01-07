import mongoose from 'mongoose';

const voiceCallSchema = new mongoose.Schema(
  {
    callId: {
      type: String,
      required: true,
      unique: true,
      default: () =>
        `CALL${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    },
    type: {
      type: String,
      enum: ['VOICE_OTP', 'BULK_CALL', 'MISSED_CALL', 'IVR'],
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    from: {
      type: String,
    },
    message: {
      type: String,
    },
    audioUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        'INITIATED',
        'RINGING',
        'ANSWERED',
        'BUSY',
        'NO_ANSWER',
        'FAILED',
        'COMPLETED',
      ],
      default: 'INITIATED',
    },
    duration: {
      type: Number,
      default: 0,
    },
    scheduledAt: {
      type: Date,
    },
    answeredAt: {
      type: Date,
    },
    endedAt: {
      type: Date,
    },
    recordingUrl: {
      type: String,
    },
    ivrResponse: {
      type: Map,
      of: String,
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
voiceCallSchema.index({ to: 1 });
voiceCallSchema.index({ status: 1 });
voiceCallSchema.index({ createdAt: -1 });

export default mongoose.model('VoiceCall', voiceCallSchema);
