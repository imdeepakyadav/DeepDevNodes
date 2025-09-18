import { createErrorResponse, createResponse } from '../utils/apiHelpers.js';

// Simple in-memory cache for IP lookups
const ipCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Mock IP geolocation data (in production, use a real service)
const mockIPData = {
  '8.8.8.8': {
    ip: '8.8.8.8',
    hostname: 'dns.google',
    city: 'Mountain View',
    region: 'California',
    country: 'US',
    country_name: 'United States',
    postal: '94043',
    timezone: 'America/Los_Angeles',
    latitude: 37.386,
    longitude: -122.084,
    isp: 'Google LLC',
    org: 'Google LLC',
  },
  '1.1.1.1': {
    ip: '1.1.1.1',
    hostname: 'one.one.one.one',
    city: 'San Francisco',
    region: 'California',
    country: 'US',
    country_name: 'United States',
    postal: '94107',
    timezone: 'America/Los_Angeles',
    latitude: 37.7749,
    longitude: -122.4194,
    isp: 'Cloudflare, Inc.',
    org: 'Cloudflare, Inc.',
  },
};

export const getClientIP = (req, res) => {
  try {
    // Get client IP address
    const clientIP =      req.ip
      || req.connection.remoteAddress
      || req.socket.remoteAddress
      || (req.connection.socket ? req.connection.socket.remoteAddress : null);

    // Clean up IPv4-mapped IPv6 addresses
    const cleanIP = clientIP ? clientIP.replace(/^::ffff:/, '') : 'Unknown';

    // Get requested fields
    const { fields } = req.query;
    const requestedFields = fields
      ? fields.split(',').map((f) => f.trim())
      : null;

    const responseData = {
      ip: cleanIP,
      userAgent: req.get('User-Agent') || 'Unknown',
      timestamp: new Date().toISOString(),
    };

    // If specific fields are requested, filter the response
    if (requestedFields) {
      const filteredData = {};
      requestedFields.forEach((field) => {
        if (responseData[field] !== undefined) {
          filteredData[field] = responseData[field];
        }
      });
      return res.json(createResponse(filteredData));
    }

    res.json(createResponse(responseData));
  } catch (error) {
    console.error('Error in getClientIP:', error);
    res.status(500).json(createErrorResponse('Failed to get client IP'));
  }
};

export const getIPDetails = (req, res) => {
  try {
    const { ip } = req.params;
    const { fields } = req.query;

    // Check cache first
    const cacheKey = `ip_${ip}`;
    const cached = ipCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      let responseData = cached.data;

      // Apply field filtering if requested
      if (fields) {
        const requestedFields = fields.split(',').map((f) => f.trim());
        responseData = {};
        requestedFields.forEach((field) => {
          if (cached.data[field] !== undefined) {
            responseData[field] = cached.data[field];
          }
        });
      }

      return res.json(
        createResponse(responseData, null, 'Data retrieved from cache')
      );
    }

    // Mock IP lookup (in production, use a real IP geolocation service)
    let ipData = mockIPData[ip];

    if (!ipData) {
      // Generate mock data for unknown IPs
      ipData = {
        ip,
        hostname: 'unknown',
        city: 'Unknown',
        region: 'Unknown',
        country: 'XX',
        country_name: 'Unknown',
        postal: '00000',
        timezone: 'UTC',
        latitude: 0,
        longitude: 0,
        isp: 'Unknown',
        org: 'Unknown',
      };
    }

    // Add timestamp
    ipData.timestamp = new Date().toISOString();

    // Cache the result
    ipCache.set(cacheKey, {
      data: { ...ipData },
      timestamp: Date.now(),
    });

    // Apply field filtering if requested
    let responseData = ipData;
    if (fields) {
      const requestedFields = fields.split(',').map((f) => f.trim());
      responseData = {};
      requestedFields.forEach((field) => {
        if (ipData[field] !== undefined) {
          responseData[field] = ipData[field];
        }
      });
    }

    res.json(createResponse(responseData));
  } catch (error) {
    console.error('Error in getIPDetails:', error);
    res.status(500).json(createErrorResponse('Failed to lookup IP details'));
  }
};
