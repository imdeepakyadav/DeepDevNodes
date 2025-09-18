# deepdevnodes Data Update System

This document describes the automated data update system for deepdevnodes API, which keeps all data sources fresh and up-to-date.

## Overview

The data update system automatically fetches fresh data from various external APIs and updates the local JSON data files daily. This ensures that the API always serves current and relevant information.

## Features

- **Automated Daily Updates**: Scheduled to run every day at 2:00 AM
- **Manual Updates**: Can be triggered manually via npm script
- **Backup System**: Creates backups before updating data files
- **Error Handling**: Robust error handling with detailed logging
- **Multiple Data Sources**: Supports various APIs (CoinGecko, Alpha Vantage, GitHub, npm, StackOverflow, SpaceX, NASA)

## Data Sources Updated

### 1. Cryptocurrency Data (`crypto.json`)

- **Source**: CoinGecko API
- **Frequency**: Daily
- **Data**: Top 100 cryptocurrencies by market cap
- **Fields**: price, market cap, volume, 24h change, supply info

### 2. Stock Data (`stocks.json`)

- **Source**: Alpha Vantage API
- **Frequency**: Daily
- **Data**: Major tech stocks (AAPL, GOOGL, MSFT, AMZN, TSLA, META, NVDA, NFLX)
- **Fields**: price, change, volume, market cap, P/E ratio, dividend yield
- **Note**: Requires `ALPHA_VANTAGE_API_KEY` environment variable

### 3. GitHub Trending (`githubTrending.json`)

- **Source**: GitHub Search API
- **Frequency**: Daily
- **Data**: Top repositories by stars
- **Fields**: repository info, stars, forks, language, owner details
- **Note**: Optional `GITHUB_TOKEN` for higher rate limits

### 4. npm Trending (`npmTrending.json`)

- **Source**: npm Registry API
- **Frequency**: Daily
- **Data**: Popular npm packages
- **Fields**: package info, download stats, stars, maintainers

### 5. StackOverflow Trending (`stackoverflowTrending.json`)

- **Source**: Stack Exchange API
- **Frequency**: Daily
- **Data**: Trending questions by tags
- **Fields**: question details, scores, tags, owner info

### 6. Space Launches (`spaceLaunches.json`)

- **Source**: SpaceX API
- **Frequency**: Daily
- **Data**: Upcoming SpaceX launches
- **Fields**: launch details, rocket info, payloads, links

### 7. Astronomy Picture of the Day (`apod.json`)

- **Source**: NASA APOD API
- **Frequency**: Daily
- **Data**: Current Astronomy Picture of the Day
- **Fields**: image URL, title, explanation, date
- **Note**: Uses `NASA_API_KEY` or DEMO_KEY

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# API Keys (optional but recommended)
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
GITHUB_TOKEN=your_github_personal_access_token
NASA_API_KEY=your_nasa_api_key
```

### 2. API Keys Setup

#### Alpha Vantage (for stock data)

1. Sign up at [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Get your free API key
3. Add to `.env` file

#### GitHub Token (optional, for higher rate limits)

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with `public_repo` scope
3. Add to `.env` file

#### NASA API Key (optional)

1. Get API key from [NASA API Portal](https://api.nasa.gov/)
2. Add to `.env` file

### 3. Dependencies

The system uses the following npm packages:

- `axios`: For making HTTP requests to external APIs
- `node-cron`: For scheduling automated updates

These are already included in `package.json`.

## Usage

### Automatic Updates

The system automatically runs daily updates when the server starts:

- Scheduled for 2:00 AM every day
- Runs initial update 2 seconds after server startup
- No manual intervention required

### Manual Updates

To manually trigger data updates:

```bash
# Update all data sources
npm run update-data

# Or start the server (includes automatic update)
npm start
```

### Development Mode

```bash
# Start server with auto-restart on file changes
npm run dev
```

## File Structure

```
src/
├── dataUpdater.js          # Main data update logic
├── server.js              # Server startup with update scheduling
└── data/                  # Data files (auto-updated)
    ├── crypto.json
    ├── stocks.json
    ├── githubTrending.json
    ├── npmTrending.json
    ├── stackoverflowTrending.json
    ├── spaceLaunches.json
    └── apod.json
```

## Backup System

Before updating any data file, the system automatically creates a backup:

- Backup files have `.backup` extension
- Example: `crypto.json.backup`
- Backups are overwritten on each update

## Error Handling

The system includes comprehensive error handling:

- Individual API failures don't stop the entire update process
- Detailed error logging for debugging
- Graceful degradation when API keys are missing
- Timeout handling for slow API responses

## Monitoring

### Logs

The system provides detailed console logging:

- ✅ Success messages for completed updates
- ❌ Error messages for failed updates
- 📦 Backup creation notifications
- 🚀 Update process timing

### Health Check

Monitor the update system health via:

- Server logs
- File modification timestamps
- API response freshness

## Troubleshooting

### Common Issues

1. **Missing API Keys**
   - Stock data updates will be skipped
   - Reduced rate limits for GitHub API
   - NASA API uses DEMO_KEY (limited requests)

2. **Network Issues**
   - Automatic retry logic (not implemented yet)
   - Timeout errors in logs
   - Partial update completion

3. **File Permission Issues**
   - Ensure write permissions for data directory
   - Check file ownership

### Debug Mode

For detailed debugging, check the console output when running updates manually:

```bash
npm run update-data
```

## Rate Limits

Be aware of API rate limits:

- **CoinGecko**: 10-50 requests/minute (varies by endpoint)
- **Alpha Vantage**: 5 requests/minute (free tier)
- **GitHub**: 60 requests/hour (unauthenticated), 5000/hour (authenticated)
- **Stack Exchange**: 300 requests/day, 10,000/day with key
- **SpaceX**: No rate limits
- **NASA**: Hourly limits vary by API

## Future Enhancements

Potential improvements for the data update system:

- Retry logic for failed API calls
- Webhook notifications for update failures
- Data validation before saving
- Historical data archiving
- Update frequency customization per data source
- Health check endpoint for update status

## Contributing

When adding new data sources:

1. Add update function to `dataUpdater.js`
2. Include in `updateAllData()` Promise.allSettled
3. Add API key to environment variables if needed
4. Update this documentation
5. Test the update manually

## Support

For issues with the data update system:

1. Check server logs for error messages
2. Verify API keys are correctly set
3. Test individual API endpoints manually
4. Check network connectivity to external APIs
