import qrcode from 'qrcode';
import QRCode from '../models/QRCode.js';

// Generate QR Code
export const generateQRCode = async (req, res) => {
  try {
    const { name, type, data, trackingEnabled, expiresAt } = req.body;

    if (!name || !type || !data) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, type, data',
      });
    }

    // Generate QR code
    let qrData = data;

    // Format data based on type
    switch (type) {
      case 'WIFI':
        qrData = `WIFI:T:WPA;S:${data.ssid};P:${data.password};;`;
        break;
      case 'VCARD':
        qrData = `BEGIN:VCARD\nVERSION:3.0\nFN:${data.name}\nTEL:${data.phone}\nEMAIL:${data.email}\nEND:VCARD`;
        break;
      case 'SMS':
        qrData = `SMSTO:${data.phone}:${data.message}`;
        break;
      case 'PHONE':
        qrData = `tel:${data}`;
        break;
      case 'EMAIL':
        qrData = `mailto:${data.email}?subject=${data.subject || ''}&body=${data.body || ''}`;
        break;
      case 'LOCATION':
        qrData = `geo:${data.latitude},${data.longitude}`;
        break;
      case 'WHATSAPP':
        qrData = `https://wa.me/${data.phone}?text=${encodeURIComponent(data.message || '')}`;
        break;
      case 'PAYMENT':
        qrData = `upi://pay?pa=${data.upiId}&pn=${data.name}&am=${data.amount}&cu=INR`;
        break;
    }

    // Generate QR code as base64
    const qrCodeBase64 = await qrcode.toDataURL(qrData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      width: 300,
    });

    const qrCodeDoc = new QRCode({
      name,
      type,
      data: qrData,
      qrCodeBase64,
      trackingEnabled: trackingEnabled !== false,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    });

    await qrCodeDoc.save();

    res.status(201).json({
      success: true,
      message: 'QR code generated successfully',
      data: {
        qrId: qrCodeDoc.qrId,
        name: qrCodeDoc.name,
        type: qrCodeDoc.type,
        qrCodeBase64: qrCodeDoc.qrCodeBase64,
        trackingEnabled: qrCodeDoc.trackingEnabled,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating QR code',
      error: error.message,
    });
  }
};

// Get QR Code
export const getQRCode = async (req, res) => {
  try {
    const { qrId } = req.params;

    const qrCodeDoc = await QRCode.findOne({ qrId, isActive: true });

    if (!qrCodeDoc) {
      return res.status(404).json({
        success: false,
        message: 'QR code not found or inactive',
      });
    }

    // Check if expired
    if (qrCodeDoc.expiresAt && qrCodeDoc.expiresAt < new Date()) {
      qrCodeDoc.isActive = false;
      await qrCodeDoc.save();
      return res.status(410).json({
        success: false,
        message: 'QR code has expired',
      });
    }

    res.status(200).json({
      success: true,
      data: qrCodeDoc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching QR code',
      error: error.message,
    });
  }
};

// Track QR Code scan
export const trackQRCodeScan = async (req, res) => {
  try {
    const { qrId } = req.params;
    const { location, device, browser } = req.body;

    const qrCodeDoc = await QRCode.findOne({ qrId, isActive: true });

    if (!qrCodeDoc) {
      return res.status(404).json({
        success: false,
        message: 'QR code not found or inactive',
      });
    }

    // Check if expired
    if (qrCodeDoc.expiresAt && qrCodeDoc.expiresAt < new Date()) {
      qrCodeDoc.isActive = false;
      await qrCodeDoc.save();
      return res.status(410).json({
        success: false,
        message: 'QR code has expired',
      });
    }

    if (qrCodeDoc.trackingEnabled) {
      qrCodeDoc.scanCount += 1;
      qrCodeDoc.lastScannedAt = new Date();

      qrCodeDoc.scans.push({
        scannedAt: new Date(),
        ipAddress: req.ip,
        location,
        device,
        browser,
      });

      await qrCodeDoc.save();
    }

    res.status(200).json({
      success: true,
      message: 'Scan tracked successfully',
      data: {
        qrId: qrCodeDoc.qrId,
        data: qrCodeDoc.data,
        scanCount: qrCodeDoc.scanCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error tracking QR code scan',
      error: error.message,
    });
  }
};

// Get QR Code analytics
export const getQRCodeAnalytics = async (req, res) => {
  try {
    const { qrId } = req.params;

    const qrCodeDoc = await QRCode.findOne({ qrId });

    if (!qrCodeDoc) {
      return res.status(404).json({
        success: false,
        message: 'QR code not found',
      });
    }

    // Calculate analytics
    const analytics = {
      totalScans: qrCodeDoc.scanCount,
      lastScannedAt: qrCodeDoc.lastScannedAt,
      isActive: qrCodeDoc.isActive,
      expiresAt: qrCodeDoc.expiresAt,
      recentScans: qrCodeDoc.scans.slice(-10).reverse(),
      scansByDay: {},
      scansByDevice: {},
      scansByCountry: {},
    };

    // Aggregate scans data
    qrCodeDoc.scans.forEach((scan) => {
      const day = scan.scannedAt.toISOString().split('T')[0];
      analytics.scansByDay[day] = (analytics.scansByDay[day] || 0) + 1;

      if (scan.device) {
        const prevDeviceCount = analytics.scansByDevice[scan.device] || 0;
        analytics.scansByDevice[scan.device] = prevDeviceCount + 1;
      }

      if (scan.location && scan.location.country) {
        const countryKey = scan.location.country;
        const prevCountryCount = analytics.scansByCountry[countryKey] || 0;
        analytics.scansByCountry[countryKey] = prevCountryCount + 1;
      }
    });

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching QR code analytics',
      error: error.message,
    });
  }
};

// List QR Codes
export const listQRCodes = async (req, res) => {
  try {
    const { type, isActive, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const qrCodes = await QRCode.find(filter)
      .select('-qrCodeBase64 -scans')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await QRCode.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: qrCodes.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: qrCodes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching QR codes',
      error: error.message,
    });
  }
};

// Update QR Code
export const updateQRCode = async (req, res) => {
  try {
    const { qrId } = req.params;
    const { name, isActive, expiresAt, trackingEnabled } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (isActive !== undefined) updates.isActive = isActive;
    if (expiresAt) updates.expiresAt = new Date(expiresAt);
    if (trackingEnabled !== undefined)
      updates.trackingEnabled = trackingEnabled;

    const qrCodeDoc = await QRCode.findOneAndUpdate(
      { qrId },
      { $set: updates },
      { new: true }
    );

    if (!qrCodeDoc) {
      return res.status(404).json({
        success: false,
        message: 'QR code not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'QR code updated successfully',
      data: qrCodeDoc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating QR code',
      error: error.message,
    });
  }
};

// Delete QR Code
export const deleteQRCode = async (req, res) => {
  try {
    const { qrId } = req.params;

    const qrCodeDoc = await QRCode.findOneAndDelete({ qrId });

    if (!qrCodeDoc) {
      return res.status(404).json({
        success: false,
        message: 'QR code not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'QR code deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting QR code',
      error: error.message,
    });
  }
};

// Generate bulk QR codes
export const generateBulkQRCodes = async (req, res) => {
  try {
    const { qrCodes } = req.body;

    if (!qrCodes || !Array.isArray(qrCodes) || qrCodes.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'qrCodes array is required',
      });
    }

    const results = [];
    const errors = [];

    for (const qr of qrCodes) {
      try {
        let qrData = qr.data;

        // Format data based on type
        if (qr.type === 'URL') {
          qrData = qr.data;
        } else if (qr.type === 'WHATSAPP') {
          qrData = `https://wa.me/${qr.data.phone}`;
        }

        const qrCodeBase64 = await qrcode.toDataURL(qrData, {
          errorCorrectionLevel: 'H',
          margin: 1,
          width: 300,
        });

        const qrCodeDoc = new QRCode({
          name: qr.name,
          type: qr.type,
          data: qrData,
          qrCodeBase64,
          trackingEnabled: qr.trackingEnabled !== false,
        });

        await qrCodeDoc.save();

        results.push({
          name: qr.name,
          qrId: qrCodeDoc.qrId,
          status: 'SUCCESS',
        });
      } catch (error) {
        errors.push({
          name: qr.name,
          error: error.message,
        });
      }
    }

    res.status(201).json({
      success: true,
      message: 'Bulk QR code generation completed',
      data: {
        total: qrCodes.length,
        successful: results.length,
        failed: errors.length,
        results,
        errors,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating bulk QR codes',
      error: error.message,
    });
  }
};
