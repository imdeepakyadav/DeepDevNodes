# 🚀 deepdevnodes API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-blue.svg)](https://expressjs.com/)
[![Open Source](https://img.shields.io/badge/Open%20Source-Yes-brightgreen.svg)](https://github.com/imdeepakyadav/deepdevnodes)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/imdeepakyadav/deepdevnodes/pulls)

A comprehensive, free, and open-source API hub providing developers with essential APIs for building applications. Built with Node.js, Express, and modern JavaScript.

![deepdevnodes Banner](https://via.placeholder.com/800x200/4F46E5/FFFFFF?text=deepdevnodes+API+Hub)

## ✨ Features

- **🔥 RESTful APIs**: Clean, consistent REST API endpoints with JSON responses
- **🎯 Advanced Filtering**: Filter, sort, paginate, and search across all APIs
- **🛡️ Rate Limiting**: Built-in rate limiting to prevent abuse (100 requests per 15 minutes)
- **🌐 CORS Support**: Cross-origin resource sharing enabled for web applications
- **📚 Swagger Documentation**: Interactive API documentation with examples
- **⚡ Error Handling**: Comprehensive error handling and validation
- **🔄 Auto Updates**: Daily automated data updates from external APIs
- **📊 Multiple Categories**: 6 major API categories covering development, finance, space, and more
- **🎨 Modern UI**: Beautiful and responsive API documentation interface

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [📖 API Documentation](#-api-documentation)
- [🛠️ Installation](#️-installation)
- [⚙️ Configuration](#️-configuration)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)
- [📞 Support](#-support)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/imdeepakyadav/deepdevnodes.git
cd deepdevnodes

# Install dependencies
npm install

# Start the development server
npm run dev

# API will be available at http://localhost:3000
# Documentation at http://localhost:3000/docs
```

## 📖 API Documentation

### 🌍 Countries API

Get information about countries with advanced filtering options.

**Base URL:** `http://localhost:3000/api/countries`

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| GET    | `/api/countries`       | Get all countries   |
| GET    | `/api/countries/:code` | Get country by code |

**Query Parameters:**

- `region` - Filter by region (Asia, Europe, Africa, Americas, Oceania)
- `currency` - Filter by currency code (USD, EUR, GBP, etc.)
- `language` - Filter by language
- `search` - Search in country names
- `sort` - Sort by field (name, population, area)
- `limit` - Limit results (default: 10, max: 250)
- `page` - Page number for pagination

**Example:**

```bash
curl "http://localhost:3000/api/countries?region=Asia&limit=5"
```

### 📍 IP Geolocation API

Get geolocation information for IP addresses.

**Base URL:** `http://localhost:3000/api/ip`

| Method | Endpoint       | Description                 |
| ------ | -------------- | --------------------------- |
| GET    | `/api/ip/:ip`  | Get IP information          |
| GET    | `/api/ip/myip` | Get your own IP information |

**Query Parameters:**

- `fields` - Select specific fields (comma-separated)

**Example:**

```bash
curl "http://localhost:3000/api/ip/8.8.8.8"
```

### 💬 Quotes API

Get inspirational quotes with filtering options.

**Base URL:** `http://localhost:3000/api/quotes`

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| GET    | `/api/quotes`        | Get all quotes   |
| GET    | `/api/quotes/random` | Get random quote |
| GET    | `/api/quotes/:id`    | Get quote by ID  |

**Query Parameters:**

- `author` - Filter by author
- `category` - Filter by category
- `search` - Search in quotes
- `limit` - Limit results
- `page` - Page number

**Example:**

```bash
curl "http://localhost:3000/api/quotes/random"
```

### 😂 Jokes API

Get programming and general jokes.

**Base URL:** `http://localhost:3000/api/jokes`

| Method | Endpoint            | Description     |
| ------ | ------------------- | --------------- |
| GET    | `/api/jokes`        | Get all jokes   |
| GET    | `/api/jokes/random` | Get random joke |
| GET    | `/api/jokes/:id`    | Get joke by ID  |

**Query Parameters:**

- `category` - Filter by category (programming, general, etc.)
- `search` - Search in jokes
- `limit` - Limit results
- `page` - Page number

**Example:**

```bash
curl "http://localhost:3000/api/jokes?category=programming"
```

### 🛠️ Utilities API

Various utility functions for developers.

**Base URL:** `http://localhost:3000/api/utilities`

| Method | Endpoint                 | Description               |
| ------ | ------------------------ | ------------------------- |
| GET    | `/api/utilities/uuid`    | Generate UUID             |
| GET    | `/api/utilities/lorem`   | Generate lorem ipsum text |
| GET    | `/api/utilities/random`  | Generate random number    |
| GET    | `/api/utilities/qr`      | Generate QR code          |
| GET    | `/api/utilities/barcode` | Generate barcode          |

**Query Parameters for random:**

- `min` - Minimum value (default: 1)
- `max` - Maximum value (default: 100)

**Query Parameters for lorem:**

- `words` - Number of words (default: 50)
- `paragraphs` - Number of paragraphs (default: 1)

**Example:**

```bash
curl "http://localhost:3000/api/utilities/uuid"
curl "http://localhost:3000/api/utilities/qr?text=https://github.com/imdeepakyadav/deepdevnodes"
```

### 🕐 Time API

Get current time information for different countries.

**Base URL:** `http://localhost:3000/api/time`

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| GET    | `/api/time/:country` | Get time for country     |
| GET    | `/api/time/list`     | List supported countries |

**Example:**

```bash
curl "http://localhost:3000/api/time/US"
```

### 💱 Currency API

Currency conversion with real-time rates.

**Base URL:** `http://localhost:3000/api/currency`

| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| GET    | `/api/currency/convert` | Convert currency   |
| GET    | `/api/currency/rates`   | Get exchange rates |

**Query Parameters for convert:**

- `from` - Source currency (required)
- `to` - Target currency (required)
- `amount` - Amount to convert (required)

**Example:**

```bash
curl "http://localhost:3000/api/currency/convert?from=USD&to=EUR&amount=100"
```

### 📚 Facts API

Get interesting facts across various categories.

**Base URL:** `http://localhost:3000/api/facts`

| Method | Endpoint            | Description     |
| ------ | ------------------- | --------------- |
| GET    | `/api/facts/random` | Get random fact |
| GET    | `/api/facts`        | Get all facts   |
| GET    | `/api/facts/:id`    | Get fact by ID  |

**Query Parameters:**

- `category` - Filter by category
- `limit` - Limit results
- `page` - Page number

**Example:**

```bash
curl "http://localhost:3000/api/facts/random"
```

### 🎯 Fun APIs

**Base URL:** `http://localhost:3000/api/fun`

#### Random User Generator

| Method | Endpoint               | Description                  |
| ------ | ---------------------- | ---------------------------- |
| GET    | `/api/fun/random-user` | Generate random user profile |

**Query Parameters:**

- `count` - Number of users (default: 1, max: 10)

#### Meme Generator

| Method | Endpoint                   | Description                  |
| ------ | -------------------------- | ---------------------------- |
| GET    | `/api/fun/memes/templates` | Get available meme templates |
| GET    | `/api/fun/memes/generate`  | Generate meme                |

**Query Parameters for generate:**

- `template` - Template name (required)
- `topText` - Top text for meme
- `bottomText` - Bottom text for meme

**Example:**

```bash
curl "http://localhost:3000/api/fun/random-user"
curl "http://localhost:3000/api/fun/memes/generate?template=drake&topText=Coding&bottomText=Debugging"
```

### 💰 Finance APIs

**Base URL:** `http://localhost:3000/api`

#### Cryptocurrency Data

| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| GET    | `/api/crypto`         | Get cryptocurrency data     |
| GET    | `/api/crypto/:symbol` | Get specific cryptocurrency |

**Query Parameters:**

- `limit` - Limit results (default: 10)
- `sort` - Sort by field (price, market_cap, change)

#### Stock Data

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | `/api/stocks`         | Get stock data     |
| GET    | `/api/stocks/:symbol` | Get specific stock |

**Query Parameters:**

- `limit` - Limit results (default: 10)
- `sort` - Sort by field (price, change)

#### Currency Conversion

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| GET    | `/api/currency/convert` | Convert between currencies |

**Example:**

```bash
curl "http://localhost:3000/api/crypto?limit=5"
curl "http://localhost:3000/api/stocks?limit=5"
```

### 🚀 Space APIs

**Base URL:** `http://localhost:3000/api/space`

#### Space Launches

| Method | Endpoint                       | Description           |
| ------ | ------------------------------ | --------------------- |
| GET    | `/api/space/launches`          | Get space launches    |
| GET    | `/api/space/launches/upcoming` | Get upcoming launches |

**Query Parameters:**

- `limit` - Limit results (default: 10)
- `status` - Filter by status (upcoming, past)

#### Astronomy Picture of the Day

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | `/api/space/apod` | Get current APOD |

#### Planets Data

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| GET    | `/api/space/planets`       | Get planets data    |
| GET    | `/api/space/planets/:name` | Get specific planet |

**Example:**

```bash
curl "http://localhost:3000/api/space/launches/upcoming"
curl "http://localhost:3000/api/space/apod"
```

### 👨‍💻 Developer APIs

**Base URL:** `http://localhost:3000/api/developer`

#### GitHub Trending

| Method | Endpoint                         | Description                      |
| ------ | -------------------------------- | -------------------------------- |
| GET    | `/api/developer/github-trending` | Get trending GitHub repositories |

**Query Parameters:**

- `language` - Filter by programming language
- `limit` - Limit results (default: 10)
- `sort` - Sort by (stars, forks, starsToday)

#### npm Trending

| Method | Endpoint                      | Description               |
| ------ | ----------------------------- | ------------------------- |
| GET    | `/api/developer/npm-trending` | Get trending npm packages |

**Query Parameters:**

- `limit` - Limit results (default: 10)
- `sort` - Sort by (downloads, stars, downloadsChange)

#### StackOverflow Trending

| Method | Endpoint                                | Description                          |
| ------ | --------------------------------------- | ------------------------------------ |
| GET    | `/api/developer/stackoverflow-trending` | Get trending StackOverflow questions |

**Query Parameters:**

- `tag` - Filter by tag
- `limit` - Limit results (default: 10)
- `sort` - Sort by (score, views, answers, newest)
- `answered` - Filter by answered status

#### Developer Statistics

| Method | Endpoint               | Description                        |
| ------ | ---------------------- | ---------------------------------- |
| GET    | `/api/developer/stats` | Get developer ecosystem statistics |

**Example:**

```bash
curl "http://localhost:3000/api/developer/github-trending?language=javascript"
curl "http://localhost:3000/api/developer/npm-trending?limit=5"
```

## 🛠️ Installation

### Prerequisites

- Node.js 18+ ([Download here](https://nodejs.org/))
- npm or yarn package manager
- Git ([Download here](https://git-scm.com/))

### Step-by-Step Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/imdeepakyadav/deepdevnodes.git
   cd deepdevnodes
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Or start the production server:**
   ```bash
   npm start
   ```

The API will be available at `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# API Keys (Optional - for enhanced data updates)
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here
GITHUB_TOKEN=your_github_token_here
NASA_API_KEY=your_nasa_api_key_here
```

### API Keys Setup

#### Alpha Vantage (Stock Data)

1. Visit [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Sign up for a free API key
3. Add to your `.env` file

#### GitHub Token (Higher Rate Limits)

1. Go to [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. Generate a new personal access token
3. Select `public_repo` scope
4. Add to your `.env` file

#### NASA API Key (Astronomy Data)

1. Visit [NASA API Portal](https://api.nasa.gov/)
2. Generate an API key
3. Add to your `.env` file

## 🧪 Testing

### Automated Testing

Run the comprehensive test suite:

```bash
# Run all tests
npm test

# Run API endpoint tests
node test-api.js
```

### Manual Testing

1. Start the server: `npm run dev`
2. Visit the interactive documentation: `http://localhost:3000/docs`
3. Test endpoints using the Swagger UI or curl commands

### Data Updates

Update all data sources manually:

```bash
npm run update-data
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 **Report Bugs**: Use [GitHub Issues](https://github.com/imdeepakyadav/deepdevnodes/issues)
- 💡 **Suggest Features**: Share your ideas for new APIs or improvements
- 🔧 **Fix Issues**: Help resolve existing bugs
- 📖 **Improve Documentation**: Enhance docs, add examples, fix typos
- 🧪 **Add Tests**: Create test cases for better reliability

### Development Workflow

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/yourusername/deepdevnodes.git
   cd deepdevnodes
   ```

3. **Create a feature branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies:**

   ```bash
   npm install
   ```

5. **Make your changes** and test thoroughly

6. **Run tests:**

   ```bash
   node test-api.js
   ```

7. **Commit your changes:**

   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

8. **Push to your fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

9. **Create a Pull Request** on the main repository

### Code Style Guidelines

- Use ES6+ features and modern JavaScript
- Follow consistent naming conventions
- Add JSDoc comments for functions
- Keep code modular and well-organized
- Test your changes before submitting

### Adding New APIs

When adding new API endpoints:

1. Create the data file in `src/data/`
2. Add the controller in `src/controllers/`
3. Create the route file in `src/routes/`
4. Register the route in `src/app.js`
5. Update the Swagger documentation
6. Add tests for the new endpoint
7. Update this README.md

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Deepak Yadav

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

deepdevnodes API wouldn't be possible without these amazing resources and communities:

- **Data Sources:**
  - [REST Countries](https://restcountries.com/) - Country data
  - [CoinGecko](https://www.coingecko.com/) - Cryptocurrency data
  - [SpaceX API](https://github.com/r-spacex/SpaceX-API) - Space launch data
  - [NASA APOD](https://api.nasa.gov/) - Astronomy pictures
  - [GitHub API](https://docs.github.com/en/rest) - Repository data
  - [npm Registry](https://registry.npmjs.org/) - Package data
  - [Stack Exchange API](https://api.stackexchange.com/) - Q&A data

- **Libraries & Tools:**
  - [Express.js](https://expressjs.com/) - Web framework
  - [Node.js](https://nodejs.org/) - Runtime environment
  - [Swagger](https://swagger.io/) - API documentation
  - [Axios](https://axios-http.com/) - HTTP client

- **Community:**
  - Open source contributors and maintainers
  - Developer communities and forums
  - Educational content creators

## 📞 Support

### Getting Help

- 📧 **Email**: [imdeepakyadav@example.com](mailto:imdeepakyadav@example.com)
- 💬 **GitHub Issues**: [Create an issue](https://github.com/imdeepakyadav/deepdevnodes/issues)
- 💭 **GitHub Discussions**: [Start a discussion](https://github.com/imdeepakyadav/deepdevnodes/discussions)
- 📖 **Documentation**: [API Docs](http://localhost:3000/docs)

### Community

- 🌟 **Star this repo** if you find it useful!
- 🍴 **Fork and contribute** to make it better
- 📢 **Share** with fellow developers
- 🐛 **Report bugs** to help improve stability

### Roadmap

- [ ] Add GraphQL support
- [ ] Implement API versioning
- [ ] Add webhook notifications
- [ ] Create SDKs for popular languages
- [ ] Add real-time data streaming
- [ ] Implement advanced caching strategies
- [ ] Add API analytics and monitoring
- [ ] Create mobile app companion

---

<div align="center">

**Made with ❤️ by [Deepak Yadav](https://github.com/imdeepakyadav)**

⭐ **Star this repository** if you find it helpful!

[⬆️ Back to Top](#-deepdevnodes-api)

</div>
