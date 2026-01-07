import IVR from '../models/IVR.js';
import OTP from '../models/OTP.js';
import VoiceCall from '../models/VoiceCall.js';

// Make voice call
export const makeVoiceCall = async (req, res) => {
  try {
    const reqBody = req.body;
    const {
      type,
      to,
      message,
      audioUrl,
      from,
      scheduledAt,
      metadata,
    } = reqBody;

    if (!to || !type) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: to, type',
      });
    }

    if (type !== 'MISSED_CALL' && !message && !audioUrl) {
      return res.status(400).json({
        success: false,
        message: 'Either message or audioUrl is required',
      });
    }

    const call = new VoiceCall({
      type,
      to,
      from: from || 'DeepDevNodes',
      message,
      audioUrl,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
      metadata,
    });

    // Simulate call initiation
    if (!scheduledAt || new Date(scheduledAt) <= new Date()) {
      call.status = 'RINGING';

      // Simulate call flow
      setTimeout(async () => {
        const outcomes = ['ANSWERED', 'BUSY', 'NO_ANSWER'];
        call.status = outcomes[Math.floor(Math.random() * outcomes.length)];

        if (call.status === 'ANSWERED') {
          call.answeredAt = new Date();
          call.duration = Math.floor(Math.random() * 60) + 10; // 10-70 seconds

          setTimeout(async () => {
            call.status = 'COMPLETED';
            call.endedAt = new Date();
            await call.save();
          }, 3000);
        }

        await call.save();
      }, 2000);
    }

    await call.save();

    res.status(201).json({
      success: true,
      message: 'Voice call initiated successfully',
      data: {
        callId: call.callId,
        status: call.status,
        to: call.to,
        type: call.type,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error making voice call',
      error: error.message,
    });
  }
};

// Generate and send Voice OTP
export const sendVoiceOTP = async (req, res) => {
  try {
    const { phoneNumber, purpose, language } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required',
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Create OTP record
    const otpDoc = new OTP({
      phoneNumber,
      otp,
      type: 'VOICE',
      purpose: purpose || 'VERIFICATION',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    await otpDoc.save();

    // Create voice call with OTP message
    const message = `Your verification code is ${otp.split('').join(', ')}. I repeat, ${otp.split('').join(', ')}`;

    const call = new VoiceCall({
      type: 'VOICE_OTP',
      to: phoneNumber,
      message,
      status: 'RINGING',
      metadata: {
        otpId: otpDoc.otpId,
        language: language || 'en',
      },
    });

    await call.save();

    res.status(201).json({
      success: true,
      message: 'Voice OTP initiated successfully',
      data: {
        otpId: otpDoc.otpId,
        callId: call.callId,
        expiresAt: otpDoc.expiresAt,
        // In production, never send OTP in response
        otp: process.env.NODE_ENV === 'development' ? otp : undefined,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending voice OTP',
      error: error.message,
    });
  }
};

// Get call status
export const getCallStatus = async (req, res) => {
  try {
    const { callId } = req.params;

    const call = await VoiceCall.findOne({ callId });

    if (!call) {
      return res.status(404).json({
        success: false,
        message: 'Call not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        callId: call.callId,
        status: call.status,
        to: call.to,
        type: call.type,
        duration: call.duration,
        answeredAt: call.answeredAt,
        endedAt: call.endedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching call status',
      error: error.message,
    });
  }
};

// Bulk voice calls
export const makeBulkVoiceCalls = async (req, res) => {
  try {
    const { recipients, message, audioUrl, type } = req.body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Recipients array is required',
      });
    }

    if (!message && !audioUrl) {
      return res.status(400).json({
        success: false,
        message: 'Either message or audioUrl is required',
      });
    }

    const results = [];
    const errors = [];

    for (const to of recipients) {
      try {
        const call = new VoiceCall({
          type: type || 'BULK_CALL',
          to,
          message,
          audioUrl,
          status: 'INITIATED',
        });

        await call.save();
        results.push({
          to,
          callId: call.callId,
          status: 'INITIATED',
        });
      } catch (error) {
        errors.push({
          to,
          error: error.message,
        });
      }
    }

    res.status(201).json({
      success: true,
      message: 'Bulk voice calls initiated',
      data: {
        total: recipients.length,
        successful: results.length,
        failed: errors.length,
        results,
        errors,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error making bulk voice calls',
      error: error.message,
    });
  }
};

// Missed call service (for lead generation)
export const registerMissedCall = async (req, res) => {
  try {
    const { from, campaignId } = req.body;

    if (!from) {
      return res.status(400).json({
        success: false,
        message: 'Caller number (from) is required',
      });
    }

    const call = new VoiceCall({
      type: 'MISSED_CALL',
      to: 'DeepDevNodes',
      from,
      status: 'NO_ANSWER',
      metadata: {
        campaignId: campaignId || 'GENERAL',
        leadGeneration: true,
      },
    });

    await call.save();

    res.status(201).json({
      success: true,
      message: 'Missed call registered successfully',
      data: {
        callId: call.callId,
        from: call.from,
        registeredAt: call.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering missed call',
      error: error.message,
    });
  }
};

// Create IVR
export const createIVR = async (req, res) => {
  try {
    const reqBody = req.body;
    const {
      name,
      type,
      welcomeMessage,
      options,
      maxRetries,
      timeout,
    } = reqBody;

    if (!name || !welcomeMessage || !options || !Array.isArray(options)) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, welcomeMessage, options',
      });
    }

    const ivr = new IVR({
      name,
      type: type || 'SINGLE_LEVEL',
      welcomeMessage,
      options,
      maxRetries: maxRetries || 3,
      timeout: timeout || 5,
    });

    await ivr.save();

    res.status(201).json({
      success: true,
      message: 'IVR created successfully',
      data: ivr,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating IVR',
      error: error.message,
    });
  }
};

// Get IVR
export const getIVR = async (req, res) => {
  try {
    const { ivrId } = req.params;

    const ivr = await IVR.findOne({ ivrId });

    if (!ivr) {
      return res.status(404).json({
        success: false,
        message: 'IVR not found',
      });
    }

    res.status(200).json({
      success: true,
      data: ivr,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching IVR',
      error: error.message,
    });
  }
};

// List all IVRs
export const listIVRs = async (req, res) => {
  try {
    const { isActive, type } = req.query;
    const filter = {};

    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (type) filter.type = type;

    const ivrs = await IVR.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: ivrs.length,
      data: ivrs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching IVRs',
      error: error.message,
    });
  }
};

// Update IVR
export const updateIVR = async (req, res) => {
  try {
    const { ivrId } = req.params;
    const updates = req.body;

    const ivr = await IVR.findOneAndUpdate(
      { ivrId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!ivr) {
      return res.status(404).json({
        success: false,
        message: 'IVR not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'IVR updated successfully',
      data: ivr,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating IVR',
      error: error.message,
    });
  }
};

// Process IVR response
export const processIVRResponse = async (req, res) => {
  try {
    const { callId, ivrId, userInput } = req.body;

    if (!callId || !ivrId || !userInput) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: callId, ivrId, userInput',
      });
    }

    const ivr = await IVR.findOne({ ivrId, isActive: true });
    if (!ivr) {
      return res.status(404).json({
        success: false,
        message: 'IVR not found or inactive',
      });
    }

    const call = await VoiceCall.findOne({ callId });
    if (!call) {
      return res.status(404).json({
        success: false,
        message: 'Call not found',
      });
    }

    // Find matching option
    const selectedOption = ivr.options.find((opt) => opt.key === userInput);

    if (!selectedOption) {
      return res.status(400).json({
        success: false,
        message: 'Invalid option selected',
        availableOptions: ivr.options.map((opt) => ({
          key: opt.key,
          message: opt.message,
        })),
      });
    }

    // Update call with IVR response
    if (!call.ivrResponse) {
      call.ivrResponse = new Map();
    }
    call.ivrResponse.set('userInput', userInput);
    call.ivrResponse.set('action', selectedOption.action);
    call.ivrResponse.set('actionValue', selectedOption.actionValue || '');
    await call.save();

    // Update IVR usage
    ivr.usageCount += 1;
    await ivr.save();

    res.status(200).json({
      success: true,
      message: 'IVR response processed successfully',
      data: {
        selectedOption: {
          key: selectedOption.key,
          message: selectedOption.message,
          action: selectedOption.action,
        },
        nextAction: selectedOption.actionValue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing IVR response',
      error: error.message,
    });
  }
};

// Get call history
export const getCallHistory = async (req, res) => {
  try {
    const {
      to,
      from,
      type,
      status,
      startDate,
      endDate,
      page = 1,
      limit = 50,
    } = req.query;

    const filter = {};
    if (to) filter.to = to;
    if (from) filter.from = from;
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const calls = await VoiceCall.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await VoiceCall.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: calls.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: calls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching call history',
      error: error.message,
    });
  }
};
