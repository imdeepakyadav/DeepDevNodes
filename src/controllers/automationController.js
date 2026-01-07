import Campaign from '../models/Campaign.js';
import Lead from '../models/Lead.js';
import SMS from '../models/SMS.js';

// Create lead
export const createLead = async (req, res) => {
  try {
    const {
      source,
      name,
      email,
      phone,
      company,
      message,
      priority,
      tags,
      metadata,
    } = req.body;

    if (!source || !name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: source, name, phone',
      });
    }

    const lead = new Lead({
      source,
      name,
      email,
      phone,
      company,
      message,
      priority: priority || 'MEDIUM',
      tags: tags || [],
      metadata,
    });

    await lead.save();

    // Trigger automation if configured
    if (source !== 'MANUAL') {
      // Simulate automated response
      const autoResponse = {
        action: 'SEND_WELCOME_SMS',
        triggeredAt: new Date(),
        status: 'COMPLETED',
      };

      lead.automationTriggered = true;
      lead.automationActions.push(autoResponse);
      await lead.save();
    }

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating lead',
      error: error.message,
    });
  }
};

// Get lead
export const getLead = async (req, res) => {
  try {
    const { leadId } = req.params;

    const lead = await Lead.findOne({ leadId });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lead',
      error: error.message,
    });
  }
};

// List leads
export const listLeads = async (req, res) => {
  try {
    const {
      source,
      status,
      priority,
      startDate,
      endDate,
      page = 1,
      limit = 50,
    } = req.query;
    const filter = {};

    if (source) filter.source = source;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Lead.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: leads.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching leads',
      error: error.message,
    });
  }
};

// Update lead
export const updateLead = async (req, res) => {
  try {
    const { leadId } = req.params;
    const updates = req.body;

    const lead = await Lead.findOneAndUpdate(
      { leadId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating lead',
      error: error.message,
    });
  }
};

// Add note to lead
export const addLeadNote = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { note, addedBy } = req.body;

    if (!note) {
      return res.status(400).json({
        success: false,
        message: 'Note is required',
      });
    }

    const lead = await Lead.findOne({ leadId });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    lead.notes.push({
      note,
      addedBy: addedBy || 'System',
      addedAt: new Date(),
    });

    await lead.save();

    res.status(200).json({
      success: true,
      message: 'Note added successfully',
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding note',
      error: error.message,
    });
  }
};

// Create campaign
export const createCampaign = async (req, res) => {
  try {
    const {
      name,
      type,
      category,
      templateId,
      targetAudience,
      scheduledAt,
      budget,
      automationRules,
    } = req.body;

    if (!name || !type || !category) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, type, category',
      });
    }

    const campaign = new Campaign({
      name,
      type,
      category,
      templateId,
      targetAudience,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
      budget,
      automationRules: automationRules || [],
    });

    await campaign.save();

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating campaign',
      error: error.message,
    });
  }
};

// Get campaign
export const getCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;

    const campaign = await Campaign.findOne({ campaignId });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    res.status(200).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching campaign',
      error: error.message,
    });
  }
};

// List campaigns
export const listCampaigns = async (req, res) => {
  try {
    const { type, category, status, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const campaigns = await Campaign.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Campaign.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: campaigns.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: campaigns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching campaigns',
      error: error.message,
    });
  }
};

// Start campaign
export const startCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;

    const campaign = await Campaign.findOne({ campaignId });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    if (campaign.status !== 'DRAFT' && campaign.status !== 'SCHEDULED') {
      return res.status(400).json({
        success: false,
        message: `Campaign cannot be started from ${campaign.status} status`,
      });
    }

    campaign.status = 'RUNNING';
    campaign.startedAt = new Date();
    await campaign.save();

    res.status(200).json({
      success: true,
      message: 'Campaign started successfully',
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error starting campaign',
      error: error.message,
    });
  }
};

// Update campaign statistics
export const updateCampaignStats = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { sent, delivered, failed, opened, clicked, conversions } = req.body;

    const campaign = await Campaign.findOne({ campaignId });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    if (sent !== undefined) campaign.statistics.sent += sent;
    if (delivered !== undefined) campaign.statistics.delivered += delivered;
    if (failed !== undefined) campaign.statistics.failed += failed;
    if (opened !== undefined) campaign.statistics.opened += opened;
    if (clicked !== undefined) campaign.statistics.clicked += clicked;
    if (conversions !== undefined)
      campaign.statistics.conversions += conversions;

    await campaign.save();

    res.status(200).json({
      success: true,
      message: 'Campaign statistics updated',
      data: campaign.statistics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating campaign statistics',
      error: error.message,
    });
  }
};

// Lead automation - Process webhook
export const processLeadWebhook = async (req, res) => {
  try {
    const { source, data } = req.body;

    if (!source || !data) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: source, data',
      });
    }

    // Map webhook data to lead format
    const leadData = {
      source,
      name: data.name || data.full_name || 'Unknown',
      phone: data.phone || data.mobile || data.phone_number,
      email: data.email,
      company: data.company || data.company_name,
      message: data.message || data.query || data.description,
      metadata: data,
    };

    const lead = new Lead(leadData);
    await lead.save();

    // Trigger automation
    const automationActions = [];

    // Send welcome SMS
    if (lead.phone) {
      const sms = new SMS({
        type: 'TRANSACTIONAL',
        to: lead.phone,
        message: `Thank you ${lead.name} for your interest! Our team will contact you soon.`,
        status: 'SENT',
        sentAt: new Date(),
        metadata: {
          leadId: lead.leadId,
          automation: true,
        },
      });
      await sms.save();

      automationActions.push({
        action: 'SEND_WELCOME_SMS',
        triggeredAt: new Date(),
        status: 'COMPLETED',
      });
    }

    lead.automationTriggered = true;
    lead.automationActions = automationActions;
    await lead.save();

    res.status(201).json({
      success: true,
      message: 'Lead processed and automation triggered',
      data: {
        leadId: lead.leadId,
        automationActions: automationActions.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing lead webhook',
      error: error.message,
    });
  }
};

// Get lead analytics
export const getLeadAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = {};

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const totalLeads = await Lead.countDocuments(filter);
    const leadsBySource = await Lead.aggregate([
      { $match: filter },
      { $group: { _id: '$source', count: { $sum: 1 } } },
    ]);
    const leadsByStatus = await Lead.aggregate([
      { $match: filter },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const leadsByPriority = await Lead.aggregate([
      { $match: filter },
      { $group: { _id: '$priority', count: { $sum: 1 } } },
    ]);

    const analytics = {
      totalLeads,
      bySource: leadsBySource.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      byStatus: leadsByStatus.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      byPriority: leadsByPriority.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      conversionRate:
        leadsByStatus.find((s) => s._id === 'CONVERTED')?.count || 0,
      automationTriggered: await Lead.countDocuments({
        ...filter,
        automationTriggered: true,
      }),
    };

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lead analytics',
      error: error.message,
    });
  }
};

// Get campaign analytics
export const getCampaignAnalytics = async (req, res) => {
  try {
    const { campaignId } = req.params;

    const campaign = await Campaign.findOne({ campaignId });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    const totalRecipients = campaign.statistics.totalRecipients || 0;
    const delivered = campaign.statistics.delivered || 0;
    const opened = campaign.statistics.opened || 0;

    let deliveryRate;
    if (totalRecipients > 0) {
      deliveryRate = `${((delivered / totalRecipients) * 100).toFixed(2)}%`;
    } else {
      deliveryRate = '0%';
    }

    let openRate;
    if (delivered > 0) {
      openRate = `${((opened / delivered) * 100).toFixed(2)}%`;
    } else {
      openRate = '0%';
    }

    let clickRate;
    if (opened > 0) {
      clickRate = `${((campaign.statistics.clicked / opened) * 100).toFixed(2)}%`;
    } else {
      clickRate = '0%';
    }

    let conversionRate;
    if (totalRecipients > 0) {
      conversionRate = `${((campaign.statistics.conversions / totalRecipients) * 100).toFixed(2)}%`;
    } else {
      conversionRate = '0%';
    }

    let duration;
    if (campaign.startedAt && campaign.completedAt) {
      duration = `${Math.floor((campaign.completedAt - campaign.startedAt) / 1000 / 60)} minutes`;
    } else {
      duration = 'N/A';
    }

    const analytics = {
      campaignId: campaign.campaignId,
      name: campaign.name,
      type: campaign.type,
      status: campaign.status,
      statistics: campaign.statistics,
      performance: {
        deliveryRate,
        openRate,
        clickRate,
        conversionRate,
      },
      duration,
    };

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching campaign analytics',
      error: error.message,
    });
  }
};
