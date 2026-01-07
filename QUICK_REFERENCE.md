# Communication Services - Quick Reference

## 🚀 Quick Start

### Base URL

```
http://localhost:3000/api
```

## 📱 SMS Services

### Send SMS

```bash
POST /messaging/sms/send
{
  "to": "+1234567890",
  "message": "Your message",
  "type": "TRANSACTIONAL"
}
```

### Generate OTP

```bash
POST /messaging/otp/generate
{
  "phoneNumber": "+1234567890",
  "type": "SMS"
}
```

### Verify OTP

```bash
POST /messaging/otp/verify
{
  "otpId": "OTP123...",
  "otp": "123456"
}
```

## 📞 Voice Services

### Voice Call

```bash
POST /voice/call
{
  "type": "BULK_CALL",
  "to": "+1234567890",
  "message": "Voice message"
}
```

### Voice OTP

```bash
POST /voice/otp
{
  "phoneNumber": "+1234567890"
}
```

### Create IVR

```bash
POST /voice/ivr
{
  "name": "Support IVR",
  "welcomeMessage": "Press 1 for Sales",
  "options": [...]
}
```

## 💬 WhatsApp Services

### Send Message

```bash
POST /whatsapp/send
{
  "type": "TEXT",
  "to": "+1234567890",
  "content": "Hello!"
}
```

### Industry Message

```bash
POST /whatsapp/industry-message
{
  "industry": "EDUCATION",
  "to": "+1234567890",
  "messageType": "REMINDER",
  "data": {...}
}
```

### Chatbot

```bash
POST /whatsapp/chatbot
{
  "from": "+1234567890",
  "message": "Hello"
}
```

## 🔲 QR Code Services

### Generate QR

```bash
POST /qrcode/generate
{
  "name": "Event QR",
  "type": "URL",
  "data": "https://example.com"
}
```

### Track Scan

```bash
POST /qrcode/{qrId}/scan
{
  "device": "iPhone",
  "location": {...}
}
```

### Get Analytics

```bash
GET /qrcode/{qrId}/analytics
```

## 📊 Lead Automation

### Create Lead

```bash
POST /automation/leads
{
  "source": "WEBSITE",
  "name": "John Doe",
  "phone": "+1234567890",
  "email": "john@example.com"
}
```

### Webhook (Auto Lead Capture)

```bash
POST /automation/webhook/lead
{
  "source": "FACEBOOK",
  "data": {...}
}
```

### Get Analytics

```bash
GET /automation/leads-analytics?startDate=2026-01-01
```

### Create Campaign

```bash
POST /automation/campaigns
{
  "name": "Summer Sale",
  "type": "SMS",
  "category": "MARKETING",
  "scheduledAt": "2026-06-01T09:00:00Z"
}
```

## 🎯 Supported Types

### SMS Types

- `OTP` - One-time password
- `PROMOTIONAL` - Marketing messages
- `TRANSACTIONAL` - Important alerts
- `INTERNATIONAL` - Cross-border SMS
- `SMART` - Advanced features
- `SIM_BASED` - SIM-based gateway

### Voice Types

- `VOICE_OTP` - OTP via voice
- `BULK_CALL` - Bulk calling
- `MISSED_CALL` - Lead generation
- `IVR` - Interactive voice response

### WhatsApp Types

- `TEXT` - Text message
- `TEMPLATE` - Template message
- `MEDIA` - Image/video/document
- `INTERACTIVE` - Buttons/lists
- `FLOW` - Multi-step flows

### QR Types

- `URL` - Website link
- `TEXT` - Plain text
- `VCARD` - Contact card
- `WIFI` - WiFi credentials
- `EMAIL` - Email address
- `SMS` - SMS trigger
- `PHONE` - Phone call
- `LOCATION` - GPS coordinates
- `WHATSAPP` - WhatsApp link
- `PAYMENT` - UPI payment

### Lead Sources

- `FACEBOOK` - Facebook Ads
- `GOOGLE` - Google Ads
- `WHATSAPP` - WhatsApp
- `INDIAMART` - IndiaMart
- `TRADEINDIA` - TradeIndia
- `WEBSITE` - Website form
- `LANDING_PAGE` - Landing page
- `QR_CODE` - QR scan
- `MANUAL` - Manual entry

### Industries

- `EDUCATION` - Schools/colleges
- `HEALTHCARE` - Hospitals/clinics
- `BANKING` - Banks/finance
- `REAL_ESTATE` - Property
- `TRAVEL` - Travel/tourism
- `GENERAL` - General purpose

## 📋 Common Query Parameters

### Pagination

```
?page=1&limit=50
```

### Filtering

```
?status=ACTIVE&type=SMS
?startDate=2026-01-01&endDate=2026-12-31
```

### Search

```
?search=keyword
```

## 🎨 Response Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `410` - Expired
- `500` - Server Error

## 🔗 Useful Endpoints

### Documentation

```
GET /docs
```

### Health Check

```
GET /health
```

### All SMS Templates

```
GET /messaging/templates
```

### All IVRs

```
GET /voice/ivr
```

### All QR Codes

```
GET /qrcode
```

### All Leads

```
GET /automation/leads
```

### All Campaigns

```
GET /automation/campaigns
```

## 💡 Pro Tips

1. **OTP expires in 10 minutes** - Use within time limit
2. **Max 5 OTP attempts** - After that, OTP expires
3. **QR tracking** - Enable for analytics
4. **Lead automation** - Triggers automatic welcome messages
5. **Templates** - Create once, reuse many times
6. **Pagination** - Use for large datasets
7. **Filters** - Combine for precise queries

## 🧪 Testing

Use Postman, cURL, or any HTTP client:

```bash
# Example with curl
curl -X POST http://localhost:3000/api/messaging/sms/send \
  -H "Content-Type: application/json" \
  -d '{"to":"+1234567890","message":"Test","type":"TRANSACTIONAL"}'
```

## 📖 Full Documentation

- **Detailed Guide:** See COMMUNICATION_SERVICES.md
- **Implementation Summary:** See IMPLEMENTATION_SUMMARY.md
- **Swagger UI:** http://localhost:3000/docs

---

**Last Updated:** January 7, 2026
