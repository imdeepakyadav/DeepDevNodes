import WhatsAppMessage from '../models/WhatsAppMessage.js';
import WhatsAppTemplate from '../models/WhatsAppTemplate.js';

// Send WhatsApp message
export const sendWhatsAppMessage = async (req, res) => {
  try {
    const {
      type,
      to,
      content,
      templateId,
      mediaUrl,
      category,
      industry,
      scheduledAt,
      metadata,
    } = req.body;

    if (!to || !type) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: to, type',
      });
    }

    if (type === 'TEXT' && !content) {
      return res.status(400).json({
        success: false,
        message: 'Content is required for TEXT type',
      });
    }

    if (type === 'TEMPLATE' && !templateId) {
      return res.status(400).json({
        success: false,
        message: 'Template ID is required for TEMPLATE type',
      });
    }

    const message = new WhatsAppMessage({
      type,
      to,
      content,
      templateId,
      mediaUrl,
      category: category || 'UTILITY',
      industry,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
      metadata,
    });

    // Simulate sending
    if (!scheduledAt || new Date(scheduledAt) <= new Date()) {
      message.status = 'SENT';
      message.sentAt = new Date();

      // Simulate delivery
      setTimeout(async () => {
        message.status = 'DELIVERED';
        message.deliveredAt = new Date();
        await message.save();
      }, 2000);
    }

    await message.save();

    res.status(201).json({
      success: true,
      message: 'WhatsApp message sent successfully',
      data: {
        messageId: message.messageId,
        status: message.status,
        to: message.to,
        sentAt: message.sentAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending WhatsApp message',
      error: error.message,
    });
  }
};

// Create WhatsApp template
export const createWhatsAppTemplate = async (req, res) => {
  try {
    const {
      name,
      category,
      language,
      headerType,
      headerContent,
      bodyContent,
      footerContent,
      buttons,
      variables,
      industry,
    } = req.body;

    if (!name || !category || !bodyContent) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, category, bodyContent',
      });
    }

    const template = new WhatsAppTemplate({
      name,
      category,
      language: language || 'en',
      headerType: headerType || 'NONE',
      headerContent,
      bodyContent,
      footerContent,
      buttons: buttons || [],
      variables: variables || [],
      industry,
    });

    await template.save();

    res.status(201).json({
      success: true,
      message: 'WhatsApp template created successfully',
      data: template,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating WhatsApp template',
      error: error.message,
    });
  }
};

// Get WhatsApp templates
export const getWhatsAppTemplates = async (req, res) => {
  try {
    const { category, industry, isActive, approvalStatus } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (industry) filter.industry = industry;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (approvalStatus) filter.approvalStatus = approvalStatus;

    const templates = await WhatsAppTemplate.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: templates.length,
      data: templates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching WhatsApp templates',
      error: error.message,
    });
  }
};

// Send WhatsApp message using template
export const sendWhatsAppWithTemplate = async (req, res) => {
  try {
    const { templateId, to, variables, industry, metadata } = req.body;

    if (!templateId || !to) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: templateId, to',
      });
    }

    const template = await WhatsAppTemplate.findOne({
      templateId,
      isActive: true,
      approvalStatus: 'APPROVED',
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found, inactive, or not approved',
      });
    }

    // Replace variables in template
    let content = template.bodyContent;
    if (variables && template.variables.length > 0) {
      template.variables.forEach((variable, index) => {
        const value = variables[variable] || variables[index] || '';
        content = content.replace(
          new RegExp(`{{${index + 1}}}|{${variable}}`, 'g'),
          value
        );
      });
    }

    const message = new WhatsAppMessage({
      type: 'TEMPLATE',
      category: template.category,
      to,
      content,
      templateId,
      industry: industry || template.industry,
      status: 'SENT',
      sentAt: new Date(),
      metadata,
    });

    await message.save();

    // Update template usage
    template.usageCount += 1;
    await template.save();

    res.status(201).json({
      success: true,
      message: 'WhatsApp message sent using template',
      data: {
        messageId: message.messageId,
        status: message.status,
        to: message.to,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending WhatsApp with template',
      error: error.message,
    });
  }
};

// Bulk WhatsApp messages
export const sendBulkWhatsApp = async (req, res) => {
  try {
    const { recipients, content, type, templateId, category } = req.body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Recipients array is required',
      });
    }

    if (!content && !templateId) {
      return res.status(400).json({
        success: false,
        message: 'Either content or templateId is required',
      });
    }

    const results = [];
    const errors = [];

    for (const to of recipients) {
      try {
        const message = new WhatsAppMessage({
          type: type || 'TEXT',
          to,
          content,
          templateId,
          category: category || 'MARKETING',
          status: 'SENT',
          sentAt: new Date(),
        });

        await message.save();
        results.push({
          to,
          messageId: message.messageId,
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
      message: 'Bulk WhatsApp messages processed',
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
      message: 'Error sending bulk WhatsApp messages',
      error: error.message,
    });
  }
};

// Get message status
export const getMessageStatus = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await WhatsAppMessage.findOne({ messageId });

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        messageId: message.messageId,
        status: message.status,
        to: message.to,
        type: message.type,
        sentAt: message.sentAt,
        deliveredAt: message.deliveredAt,
        readAt: message.readAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching message status',
      error: error.message,
    });
  }
};

// Get message history
export const getMessageHistory = async (req, res) => {
  try {
    const {
      to,
      type,
      status,
      category,
      industry,
      startDate,
      endDate,
      page = 1,
      limit = 50,
    } = req.query;

    const filter = {};
    if (to) filter.to = to;
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (industry) filter.industry = industry;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const messages = await WhatsAppMessage.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await WhatsAppMessage.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: messages.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching message history',
      error: error.message,
    });
  }
};

// Industry-specific WhatsApp messages
export const sendIndustrySpecificMessage = async (req, res) => {
  try {
    const { industry, to, messageType, data } = req.body;

    if (!industry || !to || !messageType || !data) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: industry, to, messageType, data',
      });
    }

    let content = '';

    // Generate industry-specific content
    switch (industry) {
      case 'EDUCATION':
        content = `Hello ${data.studentName},\nYour ${messageType} for ${data.course}: ${data.message}`;
        break;
      case 'HEALTHCARE':
        content = `Dear ${data.patientName},\nAppointment Reminder: ${data.appointmentDate} with Dr. ${data.doctorName}`;
        break;
      case 'BANKING':
        content = `Dear Customer,\n${data.transactionType}: Amount ${data.amount}\nRef: ${data.refNumber}`;
        break;
      case 'REAL_ESTATE':
        content = `Hi ${data.clientName},\nProperty Update: ${data.propertyName}\n${data.message}`;
        break;
      case 'TRAVEL':
        content = `Dear ${data.travelerName},\nBooking Confirmation: ${data.bookingId}\n${data.details}`;
        break;
      default:
        content = data.message;
    }

    const message = new WhatsAppMessage({
      type: 'TEXT',
      category: 'SERVICE',
      to,
      content,
      industry,
      status: 'SENT',
      sentAt: new Date(),
      metadata: data,
    });

    await message.save();

    res.status(201).json({
      success: true,
      message: `${industry} specific WhatsApp message sent`,
      data: {
        messageId: message.messageId,
        status: message.status,
        to: message.to,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending industry-specific message',
      error: error.message,
    });
  }
};

// WhatsApp chatbot simulation
export const processChatbotMessage = async (req, res) => {
  try {
    const { from, message } = req.body;

    if (!from || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: from, message',
      });
    }

    // Simple chatbot logic
    let botResponse = '';
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      botResponse = 'Hello! Welcome to DeepDevNodes. How can I help you today?';
    } else if (
      lowerMessage.includes('price') ||
      lowerMessage.includes('cost')
    ) {
      botResponse =
        'Our services are free for developers. Visit our website for more details.';
    } else if (lowerMessage.includes('help')) {
      botResponse =
        'I can help you with:\n1. SMS Services\n2. Voice Calls\n3. WhatsApp API\n4. Lead Generation\n\nWhat would you like to know?';
    } else if (lowerMessage.includes('thank')) {
      botResponse = "You're welcome! Feel free to reach out anytime.";
    } else {
      botResponse =
        'Thank you for your message. Our team will get back to you shortly.';
    }

    // Log incoming message
    const incomingMsg = new WhatsAppMessage({
      type: 'TEXT',
      to: 'DeepDevNodes',
      from,
      content: message,
      status: 'DELIVERED',
      sentAt: new Date(),
      deliveredAt: new Date(),
    });
    await incomingMsg.save();

    // Send bot response
    const outgoingMsg = new WhatsAppMessage({
      type: 'TEXT',
      to: from,
      content: botResponse,
      category: 'UTILITY',
      status: 'SENT',
      sentAt: new Date(),
    });
    await outgoingMsg.save();

    res.status(200).json({
      success: true,
      message: 'Chatbot response sent',
      data: {
        userMessage: message,
        botResponse,
        messageId: outgoingMsg.messageId,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing chatbot message',
      error: error.message,
    });
  }
};
