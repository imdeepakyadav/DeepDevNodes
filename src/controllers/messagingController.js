import OTP from '../models/OTP.js';
import SMS from '../models/SMS.js';
import SMSTemplate from '../models/SMSTemplate.js';

// Send SMS
export const sendSMS = async (req, res) => {
  try {
    const {
      type,
      to,
      message,
      from,
      country,
      priority,
      scheduledAt,
      metadata,
    } = req.body;

    if (!to || !message || !type) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: to, message, type',
      });
    }

    // Validate phone number format
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(to)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format',
      });
    }

    const sms = new SMS({
      type,
      to,
      message,
      from: from || 'DeepDevNodes',
      country: country || 'IN',
      priority: priority || 'MEDIUM',
      scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
      metadata,
    });

    // Simulate sending (in real scenario, integrate with SMS gateway)
    if (!scheduledAt || new Date(scheduledAt) <= new Date()) {
      sms.status = 'SENT';
      sms.sentAt = new Date();

      // Simulate delivery after 2 seconds
      setTimeout(async () => {
        sms.status = 'DELIVERED';
        sms.deliveredAt = new Date();
        await sms.save();
      }, 2000);
    } else {
      sms.status = 'QUEUED';
    }

    await sms.save();

    res.status(201).json({
      success: true,
      message: 'SMS sent successfully',
      data: {
        messageId: sms.messageId,
        status: sms.status,
        to: sms.to,
        sentAt: sms.sentAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending SMS',
      error: error.message,
    });
  }
};

// Generate and send OTP
export const generateOTP = async (req, res) => {
  try {
    const { phoneNumber, email, type, purpose, length } = req.body;

    if (!phoneNumber && !email) {
      return res.status(400).json({
        success: false,
        message: 'Either phoneNumber or email is required',
      });
    }

    // Generate random OTP
    const otpLength = length || 6;
    const otp = Math.floor(Math.random() * Math.pow(10, otpLength))
      .toString()
      .padStart(otpLength, '0');

    // Check for existing active OTP
    const existingOTP = await OTP.findOne({
      phoneNumber,
      status: 'ACTIVE',
      expiresAt: { $gt: new Date() },
    });

    if (existingOTP) {
      return res.status(400).json({
        success: false,
        message:
          'Active OTP already exists. Please wait for it to expire or verify it.',
      });
    }

    const otpDoc = new OTP({
      phoneNumber,
      email,
      otp,
      type: type || 'SMS',
      purpose: purpose || 'VERIFICATION',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    await otpDoc.save();

    // Simulate sending OTP via SMS/Voice/Email
    const message = `Your OTP is ${otp}. Valid for 10 minutes. Do not share with anyone.`;

    if (type === 'SMS' || !type) {
      // Create SMS record
      const sms = new SMS({
        type: 'OTP',
        to: phoneNumber,
        message,
        status: 'SENT',
        sentAt: new Date(),
      });
      await sms.save();
    }

    res.status(201).json({
      success: true,
      message: 'OTP generated and sent successfully',
      data: {
        otpId: otpDoc.otpId,
        expiresAt: otpDoc.expiresAt,
        // In production, never send OTP in response - this is for demo only
        otp: process.env.NODE_ENV === 'development' ? otp : undefined,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating OTP',
      error: error.message,
    });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { otpId, phoneNumber, otp } = req.body;

    if ((!otpId && !phoneNumber) || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const query = otpId ? { otpId } : { phoneNumber, status: 'ACTIVE' };
    const otpDoc = await OTP.findOne(query);

    if (!otpDoc) {
      return res.status(404).json({
        success: false,
        message: 'OTP not found or expired',
      });
    }

    if (otpDoc.status !== 'ACTIVE') {
      return res.status(400).json({
        success: false,
        message: `OTP is ${otpDoc.status.toLowerCase()}`,
      });
    }

    if (otpDoc.expiresAt < new Date()) {
      otpDoc.status = 'EXPIRED';
      await otpDoc.save();
      return res.status(400).json({
        success: false,
        message: 'OTP has expired',
      });
    }

    if (otpDoc.attempts >= 5) {
      otpDoc.status = 'EXPIRED';
      await otpDoc.save();
      return res.status(400).json({
        success: false,
        message: 'Maximum verification attempts exceeded',
      });
    }

    otpDoc.attempts += 1;

    if (otpDoc.otp !== otp) {
      await otpDoc.save();
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
        attemptsLeft: 5 - otpDoc.attempts,
      });
    }

    otpDoc.status = 'VERIFIED';
    otpDoc.verifiedAt = new Date();
    await otpDoc.save();

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      data: {
        otpId: otpDoc.otpId,
        verifiedAt: otpDoc.verifiedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying OTP',
      error: error.message,
    });
  }
};

// Get SMS status
export const getSMSStatus = async (req, res) => {
  try {
    const { messageId } = req.params;

    const sms = await SMS.findOne({ messageId });

    if (!sms) {
      return res.status(404).json({
        success: false,
        message: 'SMS not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        messageId: sms.messageId,
        status: sms.status,
        to: sms.to,
        type: sms.type,
        sentAt: sms.sentAt,
        deliveredAt: sms.deliveredAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching SMS status',
      error: error.message,
    });
  }
};

// Create SMS Template
export const createSMSTemplate = async (req, res) => {
  try {
    const {
      name,
      category,
      content,
      variables,
      language,
      dltTemplateId,
      sender,
    } = req.body;

    if (!name || !category || !content) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, category, content',
      });
    }

    const template = new SMSTemplate({
      name,
      category,
      content,
      variables: variables || [],
      language: language || 'en',
      dltTemplateId,
      sender,
    });

    await template.save();

    res.status(201).json({
      success: true,
      message: 'SMS template created successfully',
      data: template,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating SMS template',
      error: error.message,
    });
  }
};

// Get all SMS templates
export const getSMSTemplates = async (req, res) => {
  try {
    const { category, isActive } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const templates = await SMSTemplate.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: templates.length,
      data: templates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching SMS templates',
      error: error.message,
    });
  }
};

// Send SMS using template
export const sendSMSWithTemplate = async (req, res) => {
  try {
    const { templateId, to, variables, metadata } = req.body;

    if (!templateId || !to) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: templateId, to',
      });
    }

    const template = await SMSTemplate.findOne({ templateId, isActive: true });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found or inactive',
      });
    }

    // Replace variables in template
    let message = template.content;
    if (variables && template.variables.length > 0) {
      template.variables.forEach((variable, index) => {
        const value = variables[variable] || variables[index] || '';
        message = message.replace(
          new RegExp(`{${variable}}|{${index}}`, 'g'),
          value
        );
      });
    }

    const sms = new SMS({
      type:
        template.category === 'OTP'
          ? 'OTP'
          : template.category === 'PROMOTIONAL'
            ? 'PROMOTIONAL'
            : 'TRANSACTIONAL',
      to,
      message,
      from: template.sender,
      status: 'SENT',
      sentAt: new Date(),
      metadata,
    });

    await sms.save();

    // Update template usage count
    template.usageCount += 1;
    await template.save();

    res.status(201).json({
      success: true,
      message: 'SMS sent using template successfully',
      data: {
        messageId: sms.messageId,
        status: sms.status,
        to: sms.to,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending SMS with template',
      error: error.message,
    });
  }
};

// Get SMS history
export const getSMSHistory = async (req, res) => {
  try {
    const {
      to,
      type,
      status,
      startDate,
      endDate,
      page = 1,
      limit = 50,
    } = req.query;

    const filter = {};
    if (to) filter.to = to;
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const smsMessages = await SMS.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await SMS.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: smsMessages.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: smsMessages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching SMS history',
      error: error.message,
    });
  }
};

// Bulk SMS
export const sendBulkSMS = async (req, res) => {
  try {
    const { recipients, message, type, from, priority } = req.body;

    if (
      !recipients ||
      !Array.isArray(recipients) ||
      recipients.length === 0 ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: recipients (array), message',
      });
    }

    const results = [];
    const errors = [];

    for (const to of recipients) {
      try {
        const sms = new SMS({
          type: type || 'PROMOTIONAL',
          to,
          message,
          from: from || 'DeepDevNodes',
          priority: priority || 'MEDIUM',
          status: 'SENT',
          sentAt: new Date(),
        });

        await sms.save();
        results.push({
          to,
          messageId: sms.messageId,
          status: 'SENT',
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
      message: 'Bulk SMS processing completed',
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
      message: 'Error sending bulk SMS',
      error: error.message,
    });
  }
};
