# Communication Services API Documentation

## Overview

This document provides comprehensive documentation for all the free communication and messaging service APIs available in DeepDevNodes.

## Table of Contents

- [Messaging Services](#messaging-services)
- [Voice Services](#voice-services)
- [WhatsApp Services](#whatsapp-services)
- [QR Code Services](#qr-code-services)
- [Lead & Campaign Automation](#lead--campaign-automation)

---

## Messaging Services

### 1. Send SMS

**Endpoint:** `POST /api/messaging/sms/send`

Send SMS messages with support for different types (OTP, Promotional, Transactional, International).

**Request Body:**

```json
{
  "to": "+1234567890",
  "message": "Your message here",
  "type": "TRANSACTIONAL",
  "from": "DeepDevNodes",
  "country": "IN",
  "priority": "HIGH",
  "scheduledAt": "2026-01-08T10:00:00Z"
}
```

**Response:**

```json
{
  "success": true,
  "message": "SMS sent successfully",
  "data": {
    "messageId": "SMS1704620400123abc",
    "status": "SENT",
    "to": "+1234567890",
    "sentAt": "2026-01-07T10:00:00Z"
  }
}
```

### 2. Send Bulk SMS

**Endpoint:** `POST /api/messaging/sms/bulk`

Send SMS to multiple recipients at once.

**Request Body:**

```json
{
  "recipients": ["+1234567890", "+9876543210"],
  "message": "Bulk message content",
  "type": "PROMOTIONAL",
  "priority": "MEDIUM"
}
```

### 3. Generate OTP

**Endpoint:** `POST /api/messaging/otp/generate`

Generate and send One-Time Password for verification.

**Request Body:**

```json
{
  "phoneNumber": "+1234567890",
  "email": "user@example.com",
  "type": "SMS",
  "purpose": "LOGIN",
  "length": 6
}
```

**Response:**

```json
{
  "success": true,
  "message": "OTP generated and sent successfully",
  "data": {
    "otpId": "OTP1704620400123xyz",
    "expiresAt": "2026-01-07T10:10:00Z",
    "otp": "123456"
  }
}
```

### 4. Verify OTP

**Endpoint:** `POST /api/messaging/otp/verify`

Verify the OTP provided by the user.

**Request Body:**

```json
{
  "otpId": "OTP1704620400123xyz",
  "otp": "123456"
}
```

### 5. Create SMS Template

**Endpoint:** `POST /api/messaging/templates`

Create reusable SMS templates.

**Request Body:**

```json
{
  "name": "Welcome SMS",
  "category": "TRANSACTIONAL",
  "content": "Welcome {name}! Your account has been created successfully.",
  "variables": ["name"],
  "language": "en"
}
```

### 6. Send SMS with Template

**Endpoint:** `POST /api/messaging/sms/send-with-template`

Send SMS using predefined template.

**Request Body:**

```json
{
  "templateId": "TPL1704620400123",
  "to": "+1234567890",
  "variables": {
    "name": "John Doe"
  }
}
```

### 7. Get SMS Status

**Endpoint:** `GET /api/messaging/sms/status/:messageId`

Check the delivery status of sent SMS.

### 8. Get SMS History

**Endpoint:** `GET /api/messaging/sms/history`

Retrieve SMS history with filtering options.

**Query Parameters:**

- `to` - Filter by recipient
- `type` - Filter by SMS type
- `status` - Filter by status
- `startDate` - Start date for filtering
- `endDate` - End date for filtering
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 50)

---

## Voice Services

### 1. Make Voice Call

**Endpoint:** `POST /api/voice/call`

Initiate voice calls with custom messages.

**Request Body:**

```json
{
  "type": "BULK_CALL",
  "to": "+1234567890",
  "message": "This is an automated voice message",
  "from": "DeepDevNodes",
  "scheduledAt": "2026-01-08T10:00:00Z"
}
```

### 2. Send Voice OTP

**Endpoint:** `POST /api/voice/otp`

Send OTP via voice call.

**Request Body:**

```json
{
  "phoneNumber": "+1234567890",
  "purpose": "VERIFICATION",
  "language": "en"
}
```

### 3. Bulk Voice Calls

**Endpoint:** `POST /api/voice/call/bulk`

Make voice calls to multiple recipients.

**Request Body:**

```json
{
  "recipients": ["+1234567890", "+9876543210"],
  "message": "Important announcement",
  "type": "BULK_CALL"
}
```

### 4. Register Missed Call

**Endpoint:** `POST /api/voice/missed-call`

Register missed calls for lead generation.

**Request Body:**

```json
{
  "from": "+1234567890",
  "campaignId": "CAMPAIGN123"
}
```

### 5. Create IVR

**Endpoint:** `POST /api/voice/ivr`

Create Interactive Voice Response system.

**Request Body:**

```json
{
  "name": "Customer Support IVR",
  "type": "MULTI_TIER",
  "welcomeMessage": "Welcome to DeepDevNodes. Press 1 for Sales, 2 for Support",
  "options": [
    {
      "key": "1",
      "message": "Connecting you to Sales",
      "action": "TRANSFER",
      "actionValue": "+1234567890"
    },
    {
      "key": "2",
      "message": "Connecting you to Support",
      "action": "TRANSFER",
      "actionValue": "+9876543210"
    }
  ],
  "maxRetries": 3,
  "timeout": 5
}
```

### 6. Get Call Status

**Endpoint:** `GET /api/voice/call/status/:callId`

Check the status of a voice call.

### 7. Get Call History

**Endpoint:** `GET /api/voice/call/history`

Retrieve call history with filters.

---

## WhatsApp Services

### 1. Send WhatsApp Message

**Endpoint:** `POST /api/whatsapp/send`

Send WhatsApp messages.

**Request Body:**

```json
{
  "type": "TEXT",
  "to": "+1234567890",
  "content": "Hello! This is a WhatsApp message from DeepDevNodes",
  "category": "UTILITY"
}
```

### 2. Send Bulk WhatsApp Messages

**Endpoint:** `POST /api/whatsapp/send/bulk`

Send WhatsApp messages to multiple recipients.

**Request Body:**

```json
{
  "recipients": ["+1234567890", "+9876543210"],
  "content": "Bulk WhatsApp message",
  "type": "TEXT",
  "category": "MARKETING"
}
```

### 3. Create WhatsApp Template

**Endpoint:** `POST /api/whatsapp/templates`

Create WhatsApp message templates.

**Request Body:**

```json
{
  "name": "Order Confirmation",
  "category": "UTILITY",
  "language": "en",
  "headerType": "TEXT",
  "headerContent": "Order Confirmed",
  "bodyContent": "Your order {{1}} has been confirmed. Total amount: {{2}}",
  "footerContent": "Thank you for shopping with us!",
  "buttons": [
    {
      "type": "QUICK_REPLY",
      "text": "Track Order"
    }
  ],
  "variables": ["orderNumber", "amount"]
}
```

### 4. Send WhatsApp with Template

**Endpoint:** `POST /api/whatsapp/send-with-template`

Send WhatsApp message using template.

**Request Body:**

```json
{
  "templateId": "WATPL1704620400123",
  "to": "+1234567890",
  "variables": {
    "orderNumber": "ORD12345",
    "amount": "$99.99"
  }
}
```

### 5. Industry-Specific Messages

**Endpoint:** `POST /api/whatsapp/industry-message`

Send industry-specific formatted messages.

**Request Body:**

```json
{
  "industry": "EDUCATION",
  "to": "+1234567890",
  "messageType": "ASSIGNMENT_REMINDER",
  "data": {
    "studentName": "John Doe",
    "course": "Mathematics",
    "message": "Assignment due tomorrow"
  }
}
```

**Supported Industries:**

- EDUCATION
- HEALTHCARE
- BANKING
- REAL_ESTATE
- TRAVEL

### 6. WhatsApp Chatbot

**Endpoint:** `POST /api/whatsapp/chatbot`

Process chatbot messages with automated responses.

**Request Body:**

```json
{
  "from": "+1234567890",
  "message": "Hello, I need help"
}
```

### 7. Get Message Status

**Endpoint:** `GET /api/whatsapp/status/:messageId`

Check WhatsApp message delivery status.

### 8. Get Message History

**Endpoint:** `GET /api/whatsapp/history`

Retrieve WhatsApp message history.

---

## QR Code Services

### 1. Generate QR Code

**Endpoint:** `POST /api/qrcode/generate`

Generate QR codes for various purposes.

**Request Body:**

```json
{
  "name": "Website QR",
  "type": "URL",
  "data": "https://deepdevnodes.com",
  "trackingEnabled": true,
  "expiresAt": "2026-12-31T23:59:59Z"
}
```

**Supported Types:**

- URL
- TEXT
- VCARD (Contact card)
- WIFI
- EMAIL
- SMS
- PHONE
- LOCATION
- WHATSAPP
- PAYMENT (UPI)

**Response:**

```json
{
  "success": true,
  "message": "QR code generated successfully",
  "data": {
    "qrId": "QR1704620400123",
    "name": "Website QR",
    "type": "URL",
    "qrCodeBase64": "data:image/png;base64,iVBORw0KGgoAAAANS...",
    "trackingEnabled": true
  }
}
```

### 2. Generate Bulk QR Codes

**Endpoint:** `POST /api/qrcode/generate/bulk`

Generate multiple QR codes at once.

**Request Body:**

```json
{
  "qrCodes": [
    {
      "name": "Event 1",
      "type": "URL",
      "data": "https://event1.com"
    },
    {
      "name": "Event 2",
      "type": "URL",
      "data": "https://event2.com"
    }
  ]
}
```

### 3. Track QR Code Scan

**Endpoint:** `POST /api/qrcode/:qrId/scan`

Track when a QR code is scanned.

**Request Body:**

```json
{
  "location": {
    "country": "US",
    "city": "New York",
    "latitude": 40.7128,
    "longitude": -74.006
  },
  "device": "iPhone 13",
  "browser": "Safari"
}
```

### 4. Get QR Code Analytics

**Endpoint:** `GET /api/qrcode/:qrId/analytics`

Get detailed analytics for QR code scans.

**Response:**

```json
{
  "success": true,
  "data": {
    "totalScans": 150,
    "lastScannedAt": "2026-01-07T10:00:00Z",
    "isActive": true,
    "recentScans": [...],
    "scansByDay": {
      "2026-01-01": 20,
      "2026-01-02": 35
    },
    "scansByDevice": {
      "iPhone": 80,
      "Android": 70
    },
    "scansByCountry": {
      "US": 100,
      "UK": 50
    }
  }
}
```

### 5. List QR Codes

**Endpoint:** `GET /api/qrcode`

Get list of all QR codes with filtering.

### 6. Update QR Code

**Endpoint:** `PUT /api/qrcode/:qrId`

Update QR code details.

### 7. Delete QR Code

**Endpoint:** `DELETE /api/qrcode/:qrId`

Delete a QR code.

---

## Lead & Campaign Automation

### 1. Create Lead

**Endpoint:** `POST /api/automation/leads`

Create a new lead manually.

**Request Body:**

```json
{
  "source": "WEBSITE",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Tech Corp",
  "message": "Interested in your services",
  "priority": "HIGH",
  "tags": ["hot-lead", "enterprise"]
}
```

### 2. Process Lead Webhook

**Endpoint:** `POST /api/automation/webhook/lead`

Automatically process leads from various sources (Facebook, Google, IndiaMart, etc.).

**Request Body:**

```json
{
  "source": "FACEBOOK",
  "data": {
    "name": "Jane Smith",
    "phone": "+1234567890",
    "email": "jane@example.com",
    "message": "Need more information",
    "ad_id": "FB12345"
  }
}
```

**Supported Sources:**

- FACEBOOK
- GOOGLE
- WHATSAPP
- INDIAMART
- TRADEINDIA
- WEBSITE
- LANDING_PAGE
- QR_CODE

### 3. Get Lead

**Endpoint:** `GET /api/automation/leads/:leadId`

Retrieve specific lead details.

### 4. List Leads

**Endpoint:** `GET /api/automation/leads`

Get all leads with filtering.

**Query Parameters:**

- `source` - Filter by source
- `status` - Filter by status (NEW, CONTACTED, QUALIFIED, CONVERTED, LOST)
- `priority` - Filter by priority
- `startDate` - Start date
- `endDate` - End date
- `page` - Page number
- `limit` - Items per page

### 5. Update Lead

**Endpoint:** `PUT /api/automation/leads/:leadId`

Update lead information.

### 6. Add Note to Lead

**Endpoint:** `POST /api/automation/leads/:leadId/notes`

Add notes to a lead.

**Request Body:**

```json
{
  "note": "Called customer, interested in premium plan",
  "addedBy": "Sales Rep 1"
}
```

### 7. Get Lead Analytics

**Endpoint:** `GET /api/automation/leads-analytics`

Get comprehensive lead analytics.

**Response:**

```json
{
  "success": true,
  "data": {
    "totalLeads": 500,
    "bySource": {
      "FACEBOOK": 200,
      "GOOGLE": 150,
      "WEBSITE": 150
    },
    "byStatus": {
      "NEW": 100,
      "CONTACTED": 200,
      "CONVERTED": 150,
      "LOST": 50
    },
    "conversionRate": 150,
    "automationTriggered": 450
  }
}
```

### 8. Create Campaign

**Endpoint:** `POST /api/automation/campaigns`

Create a marketing/sales campaign.

**Request Body:**

```json
{
  "name": "Summer Sale 2026",
  "type": "SMS",
  "category": "MARKETING",
  "templateId": "TPL123",
  "targetAudience": {
    "segments": ["premium-customers", "active-users"],
    "filters": {
      "location": "US",
      "age": "25-45"
    }
  },
  "scheduledAt": "2026-06-01T09:00:00Z",
  "budget": 5000,
  "automationRules": [
    {
      "trigger": "CLICK",
      "condition": "link_clicked",
      "action": "SEND_FOLLOWUP"
    }
  ]
}
```

### 9. Start Campaign

**Endpoint:** `POST /api/automation/campaigns/:campaignId/start`

Start a campaign execution.

### 10. Get Campaign Analytics

**Endpoint:** `GET /api/automation/campaigns/:campaignId/analytics`

Get detailed campaign performance analytics.

**Response:**

```json
{
  "success": true,
  "data": {
    "campaignId": "CAMP1704620400",
    "name": "Summer Sale 2026",
    "status": "COMPLETED",
    "statistics": {
      "totalRecipients": 10000,
      "sent": 9800,
      "delivered": 9500,
      "failed": 300,
      "opened": 7000,
      "clicked": 2500,
      "conversions": 500
    },
    "performance": {
      "deliveryRate": "96.94%",
      "openRate": "73.68%",
      "clickRate": "35.71%",
      "conversionRate": "5.00%"
    }
  }
}
```

---

## Common Response Codes

- `200` - Success
- `201` - Resource created successfully
- `400` - Bad request / Missing required fields
- `404` - Resource not found
- `410` - Resource expired
- `500` - Internal server error

## Authentication

Currently, all APIs are free and open for developers. Authentication will be added in future versions.

## Rate Limiting

Default rate limits apply to all endpoints. Check the rate limit headers in responses:

- `X-RateLimit-Limit` - Maximum requests allowed
- `X-RateLimit-Remaining` - Remaining requests
- `X-RateLimit-Reset` - Time when limit resets

## Support

For issues, feature requests, or questions:

- GitHub: https://github.com/imdeepakyadav/DeepDevNodes
- Documentation: https://deepdevnodes.com/docs

---

## Example Use Cases

### 1. User Registration with OTP

```javascript
// Step 1: Generate OTP
const otpResponse = await fetch('/api/messaging/otp/generate', {
  method: 'POST',
  body: JSON.stringify({
    phoneNumber: '+1234567890',
    purpose: 'VERIFICATION',
  }),
});

// Step 2: User enters OTP
// Step 3: Verify OTP
const verifyResponse = await fetch('/api/messaging/otp/verify', {
  method: 'POST',
  body: JSON.stringify({
    otpId: otpResponse.data.otpId,
    otp: '123456',
  }),
});
```

### 2. Lead Capture from Landing Page

```javascript
// Capture lead
const leadResponse = await fetch('/api/automation/webhook/lead', {
  method: 'POST',
  body: JSON.stringify({
    source: 'LANDING_PAGE',
    data: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    },
  }),
});
// Automated SMS/WhatsApp welcome message will be sent
```

### 3. Generate Event QR Code with Tracking

```javascript
// Generate QR code
const qrResponse = await fetch('/api/qrcode/generate', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Conference 2026',
    type: 'URL',
    data: 'https://conference2026.com/register',
    trackingEnabled: true,
  }),
});

// Use qrCodeBase64 in your app
// Track scans automatically
```

---

**Last Updated:** January 7, 2026
**Version:** 1.0.0
