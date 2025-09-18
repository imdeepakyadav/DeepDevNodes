# Vercel Deployment Guide for deepdevnodes API

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your project should be pushed to GitHub
3. **MongoDB Atlas**: Ensure your MongoDB database is accessible from the internet

## Environment Variables Setup

In your Vercel dashboard, go to your project settings and add these environment variables:

### Required Variables

- `MONGODB_URI`: Your MongoDB connection string
- `NODE_ENV`: Set to `production`

### Optional Variables (for enhanced functionality)

- `ALPHA_VANTAGE_API_KEY`: For stock market data
- `GITHUB_TOKEN`: For higher GitHub API rate limits
- `NASA_API_KEY`: For NASA APOD data
- `JWT_SECRET`: For authentication (if implemented)
- `CORS_ORIGIN`: Set to your frontend domain in production

## Deployment Steps

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**:
   - **Framework Preset**: Select "Other"
   - **Root Directory**: Leave as `./` (root)
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

3. **Environment Variables**:
   - Add all required environment variables in the "Environment Variables" section

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application

## Post-Deployment Configuration

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

### Database Connection

Ensure your MongoDB Atlas cluster allows connections from `0.0.0.0/0` (all IP addresses) or specifically from Vercel's IP ranges.

## Testing Your Deployment

After deployment, test these endpoints:

- `https://your-app.vercel.app/health` - Health check
- `https://your-app.vercel.app/docs` - API documentation
- `https://your-app.vercel.app/api/countries` - Sample API endpoint

## Troubleshooting

### Common Issues

1. **MongoDB Connection Timeout**:
   - Check if MongoDB URI is correct
   - Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

2. **Build Failures**:
   - Check Vercel build logs
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

3. **Environment Variables**:
   - Double-check all required environment variables are set
   - Ensure variable names match exactly (case-sensitive)

### Vercel-Specific Considerations

- **Serverless Functions**: Each API request creates a new serverless function instance
- **Cold Starts**: First request after inactivity may be slower
- **Execution Time**: Functions have a 30-second timeout (configurable up to 300s for Pro plans)
- **Memory**: Default 1008 MB, upgradeable for Pro plans

## Monitoring

- **Vercel Analytics**: Monitor performance and usage
- **Logs**: Check function logs in Vercel dashboard
- **Health Checks**: Set up monitoring for your `/health` endpoint

## Cost Optimization

- **Pro Plan**: Recommended for production with higher limits
- **Function Optimization**: Consider caching strategies to reduce database calls
- **Rate Limiting**: Already implemented in your code

---

🎉 Your deepdevnodes API is now deployed and ready to serve requests!
