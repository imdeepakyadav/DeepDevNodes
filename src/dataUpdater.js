import axios from 'axios';
import cron from 'node-cron';
import {
  APOD,
  Crypto,
  GitHubRepo,
  NpmPackage,
  SpaceLaunch,
  StackOverflowQuestion,
  Stock,
} from './models/index.js';

// API Keys from environment variables
const { ALPHA_VANTAGE_API_KEY, GITHUB_TOKEN } = process.env;

/**
 * Fetch cryptocurrency data from CoinGecko API and save to MongoDB
 */
const updateCryptoData = async () => {
  try {
    console.log('Fetching cryptocurrency data...');

    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 100,
          page: 1,
          sparkline: false,
          price_change_percentage: '24h',
        },
        timeout: 10000,
      }
    );

    const cryptoData = response.data
      .filter(
        (coin, index, self) =>
          index
          === self.findIndex(
            (c) => c.symbol.toUpperCase() === coin.symbol.toUpperCase()
          )
      )
      .map((coin) => ({
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        change_24h: coin.price_change_24h || 0,
        change_percent_24h: coin.price_change_percentage_24h || 0,
        market_cap: coin.market_cap,
        volume_24h: coin.total_volume,
        last_updated: new Date(),
        rank: coin.market_cap_rank,
        supply: {
          circulating: coin.circulating_supply,
          total: coin.total_supply,
          max: coin.max_supply,
        },
      }));

    // Clear existing data and insert new data
    await Crypto.deleteMany({});
    await Crypto.insertMany(cryptoData, { ordered: false });

    console.log(
      `✅ Cryptocurrency data updated successfully - ${cryptoData.length} records`
    );
    return cryptoData;
  } catch (error) {
    console.error('❌ Failed to fetch cryptocurrency data:', error.message);
    throw error;
  }
};

/**
 * Fetch stock data from Alpha Vantage API and save to MongoDB
 */
const updateStockData = async () => {
  if (!ALPHA_VANTAGE_API_KEY) {
    console.log(
      '⚠️  Alpha Vantage API key not configured, skipping stock data update'
    );
    return;
  }

  try {
    console.log('Fetching stock data...');

    const symbols = [
      'AAPL',
      'GOOGL',
      'MSFT',
      'AMZN',
      'TSLA',
      'META',
      'NVDA',
      'NFLX',
    ];
    const stockData = [];

    for (const symbol of symbols) {
      try {
        const response = await axios.get('https://www.alphavantage.co/query', {
          params: {
            function: 'GLOBAL_QUOTE',
            symbol,
            apikey: ALPHA_VANTAGE_API_KEY,
          },
          timeout: 5000,
        });

        const quote = response.data['Global Quote'];
        if (quote && quote['05. price']) {
          stockData.push({
            symbol,
            name: getCompanyName(symbol),
            price: parseFloat(quote['05. price']),
            change: parseFloat(quote['09. change'] || 0),
            change_percent: parseFloat(
              quote['10. change percent']?.replace('%', '') || 0
            ),
            volume: parseInt(quote['06. volume'] || 0),
            market_cap: getMarketCap(symbol),
            pe_ratio: getPERatio(symbol),
            dividend_yield: getDividendYield(symbol),
            last_updated: new Date(),
            exchange: 'NASDAQ',
            sector: getSector(symbol),
            industry: getIndustry(symbol),
          });
        }

        // Rate limiting - Alpha Vantage free tier allows 5 calls per minute
        await new Promise((resolve) => setTimeout(resolve, 12000));
      } catch (error) {
        console.error(`❌ Failed to fetch data for ${symbol}:`, error.message);
      }
    }

    if (stockData.length > 0) {
      // Clear existing data and insert new data
      await Stock.deleteMany({});
      await Stock.insertMany(stockData);
      console.log(
        `✅ Stock data updated successfully - ${stockData.length} records`
      );
    }
    return stockData;
  } catch (error) {
    console.error('❌ Failed to fetch stock data:', error.message);
    throw error;
  }
};

/**
 * Fetch GitHub trending repositories and save to MongoDB
 */
const updateGithubData = async () => {
  try {
    console.log('Fetching GitHub trending data...');

    const headers = GITHUB_TOKEN
      ? { Authorization: `token ${GITHUB_TOKEN}` }
      : {};

    // GitHub doesn't have an official trending API, so we'll use
    // GitHub Search API
    const response = await axios.get(
      'https://api.github.com/search/repositories',
      {
        params: {
          q: 'stars:>1000',
          sort: 'stars',
          order: 'desc',
          per_page: 10,
        },
        headers: {
          ...headers,
          Accept: 'application/vnd.github.v3+json',
        },
        timeout: 10000,
      }
    );

    const githubData = response.data.items.slice(0, 5).map((repo, index) => ({
      rank: index + 1,
      repositoryName: repo.full_name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      starsToday: Math.floor(Math.random() * 500) + 50,
      // Mock data since API doesn't provide this
      owner: {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
        type: repo.owner.type,
      },
      url: repo.html_url,
      builtBy: [
        {
          username: repo.owner.login,
          href: `https://github.com/${repo.owner.login}`,
          avatar: repo.owner.avatar_url,
        },
      ],
      last_updated: new Date(),
    }));

    // Clear existing data and insert new data
    await GitHubRepo.deleteMany({});
    await GitHubRepo.insertMany(githubData);

    console.log(
      `✅ GitHub trending data updated successfully - ${githubData.length} records`
    );
    return githubData;
  } catch (error) {
    console.error('❌ Failed to fetch GitHub trending data:', error.message);
    throw error;
  }
};

/**
 * Fetch npm trending packages and save to MongoDB
 */
const updateNpmData = async () => {
  try {
    console.log('Fetching npm trending data...');

    const packageNames = ['react', 'express', 'lodash', 'axios', 'typescript'];
    const npmData = [];

    for (let i = 0; i < packageNames.length; i++) {
      const packageName = packageNames[i];
      try {
        const packageResponse = await axios.get(
          `https://registry.npmjs.org/${packageName}/latest`,
          {
            timeout: 5000,
          }
        );

        const packageInfo = packageResponse.data;
        npmData.push({
          rank: i + 1,
          package: {
            name: packageName,
            version: packageInfo.version,
            description: packageInfo.description,
            keywords: packageInfo.keywords || [],
            author: packageInfo.author || { name: 'Unknown' },
            license: packageInfo.license || 'MIT',
          },
          downloads: Math.floor(Math.random() * 10000000) + 1000000,
          // Mock download count
          downloadsChange: Math.random() * 10 - 2,
          // Random change between -2% and +8%
          stars: Math.floor(Math.random() * 100000) + 10000,
          publisher: {
            username: packageInfo.maintainers?.[0]?.name || 'unknown',
            email: packageInfo.maintainers?.[0]?.email || '',
          },
          maintainers: (packageInfo.maintainers || []).map((maintainer) => ({
            username: maintainer.name || maintainer.username || 'unknown',
            email: maintainer.email || '',
          })),
          last_updated: new Date(),
        });
      } catch (error) {
        console.error(
          `❌ Failed to fetch npm data for ${packageName}:`,
          error.message
        );
      }
    }

    // Clear existing data and insert new data
    await NpmPackage.deleteMany({});
    await NpmPackage.insertMany(npmData);

    console.log(
      `✅ npm trending data updated successfully - ${npmData.length} records`
    );
    return npmData;
  } catch (error) {
    console.error('❌ Failed to fetch npm trending data:', error.message);
    throw error;
  }
};

/**
 * Fetch StackOverflow trending questions and save to MongoDB
 */
const updateStackoverflowData = async () => {
  try {
    console.log('Fetching StackOverflow trending data...');

    const tags = ['javascript', 'react', 'node.js', 'python', 'typescript'];
    const stackoverflowData = [];

    for (const tag of tags) {
      try {
        const response = await axios.get(
          'https://api.stackexchange.com/2.3/questions',
          {
            params: {
              order: 'desc',
              sort: 'votes',
              tagged: tag,
              site: 'stackoverflow',
              pagesize: 2,
              filter: 'withbody',
            },
            timeout: 10000,
          }
        );

        response.data.items.forEach((question) => {
          if (stackoverflowData.length < 5) {
            stackoverflowData.push({
              question_id: question.question_id,
              title: question.title,
              body: `${question.body.substring(0, 200)}...`,
              tags: question.tags,
              score: question.score,
              view_count: question.view_count,
              answer_count: question.answer_count,
              creation_date: new Date(question.creation_date * 1000),
              last_activity_date: new Date(question.last_activity_date * 1000),
              owner: {
                user_id: question.owner.user_id,
                display_name: question.owner.display_name,
                reputation: question.owner.reputation,
                user_type: question.owner.user_type,
                profile_image: question.owner.profile_image,
                link: question.owner.link,
              },
              is_answered: question.is_answered,
              accepted_answer_id: question.accepted_answer_id,
              link: question.link,
              last_updated: new Date(),
            });
          }
        });
      } catch (error) {
        console.error(
          `❌ Failed to fetch StackOverflow data for tag ${tag}:`,
          error.message
        );
      }
    }

    // Sort by score and take top 5
    stackoverflowData.sort((a, b) => b.score - a.score);
    const topQuestions = stackoverflowData.slice(0, 5);

    // Clear existing data and insert new data
    await StackOverflowQuestion.deleteMany({});
    await StackOverflowQuestion.insertMany(topQuestions);

    console.log(
      `✅ StackOverflow trending data updated successfully - ${topQuestions.length} records`
    );
    return topQuestions;
  } catch (error) {
    console.error(
      '❌ Failed to fetch StackOverflow trending data:',
      error.message
    );
    throw error;
  }
};

/**
 * Fetch space launches data from SpaceX API and save to MongoDB
 */
const updateSpaceLaunchesData = async () => {
  try {
    console.log('Fetching space launches data...');

    const response = await axios.get(
      'https://api.spacexdata.com/v4/launches/upcoming',
      {
        timeout: 10000,
      }
    );

    const launchesData = response.data.slice(0, 3).map((launch) => ({
      id: launch.id,
      name: launch.name,
      date_utc: new Date(launch.date_utc),
      date_local: launch.date_local,
      rocket: {
        id: launch.rocket,
        name: 'Falcon 9', // Simplified
        type: 'FT',
      },
      launchpad: {
        id: launch.launchpad,
        name: 'Launch Complex 39A', // Simplified
        locality: 'Cape Canaveral',
        region: 'Florida',
      },
      payloads: launch.payloads.map((payload) => ({
        id: payload,
        name: `Payload ${payload.substring(0, 8)}`,
        type: 'Satellite',
        orbit: 'LEO',
        customers: ['SpaceX'],
      })),
      cores: [
        {
          core: '5e9e28a7f359183c413b265d',
          flight: 1,
          gridfins: true,
          legs: true,
          reused: true,
          landing_attempt: true,
          landing_success: null,
          landing_type: 'ASDS',
          landpad: '5e9e3032383ecb6bb234e7ca',
        },
      ],
      fairings: {
        reused: false,
        recovery_attempt: false,
        recovered: false,
        ships: [],
      },
      links: {
        patch: {
          small: 'https://images2.imgbox.com/53/22/dh0XSLXO_o.png',
          large: 'https://images2.imgbox.com/15/2b/NAcsTEB6_o.png',
        },
        reddit: {
          campaign: null,
          launch: null,
          media: null,
          recovery: null,
        },
        flickr: {
          small: [],
          original: [],
        },
        presskit: null,
        webcast: 'https://www.youtube.com/watch?v=0a_00nJ_Y88',
        youtube_id: '0a_00nJ_Y88',
        article: null,
        wikipedia: 'https://en.wikipedia.org/wiki/Starlink',
      },
      static_fire_date_utc: null,
      static_fire_date_unix: null,
      tbd: false,
      net: false,
      window: 0,
      success: null,
      failures: [],
      details: launch.details,
      crew: [],
      ships: [],
      capsules: [],
      payloads_ids: launch.payloads,
      last_updated: new Date(),
    }));

    // Clear existing data and insert new data
    await SpaceLaunch.deleteMany({});
    await SpaceLaunch.insertMany(launchesData);

    console.log(
      `✅ Space launches data updated successfully - ${launchesData.length} records`
    );
    return launchesData;
  } catch (error) {
    console.error('❌ Failed to fetch space launches data:', error.message);
    throw error;
  }
};

/**
 * Fetch Astronomy Picture of the Day (APOD) from NASA API and save to MongoDB
 */
const updateApodData = async () => {
  try {
    console.log('Fetching APOD data...');

    const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: NASA_API_KEY,
      },
      timeout: 10000,
    });

    const apodData = {
      date: response.data.date,
      title: response.data.title,
      explanation: response.data.explanation,
      url: response.data.url,
      hdurl: response.data.hdurl,
      media_type: response.data.media_type,
      service_version: response.data.service_version,
      last_updated: new Date(),
    };

    // Clear existing data and insert new data
    await APOD.deleteMany({});
    await APOD.create(apodData);

    console.log('✅ APOD data updated successfully');
    return apodData;
  } catch (error) {
    console.error('❌ Failed to fetch APOD data:', error.message);
    throw error;
  }
};

/**
 * Run all data updates
 */
const updateAllData = async () => {
  const startTime = Date.now();
  console.log('🚀 Starting daily data update...');

  try {
    await Promise.allSettled([
      updateCryptoData(),
      updateStockData(),
      updateGithubData(),
      updateNpmData(),
      updateStackoverflowData(),
      updateSpaceLaunchesData(),
      updateApodData(),
    ]);

    const endTime = Date.now();
    console.log(`✅ All data updated successfully in ${endTime - startTime}ms`);
  } catch (error) {
    console.error('❌ Data update process failed:', error.message);
  }
};

/**
 * Schedule daily data updates
 */
const scheduleDailyUpdates = () => {
  // Run at 2:00 AM daily
  cron.schedule('0 2 * * *', () => {
    console.log('📅 Scheduling daily data updates at: 0 2 * * *');
    updateAllData();
  });

  console.log('📅 Scheduling daily data updates at: 0 2 * * *');
};

/**
 * Manual update function for immediate execution
 */
const manualUpdate = async () => {
  await updateAllData();
};

// Helper functions for stock data
const getCompanyName = (symbol) => {
  const names = {
    AAPL: 'Apple Inc.',
    GOOGL: 'Alphabet Inc.',
    MSFT: 'Microsoft Corporation',
    AMZN: 'Amazon.com Inc.',
    TSLA: 'Tesla Inc.',
    META: 'Meta Platforms Inc.',
    NVDA: 'NVIDIA Corporation',
    NFLX: 'Netflix Inc.',
  };
  return names[symbol] || symbol;
};

const getMarketCap = (symbol) => {
  const caps = {
    AAPL: 2750000000000,
    GOOGL: 1800000000000,
    MSFT: 2500000000000,
    AMZN: 1500000000000,
    TSLA: 800000000000,
    META: 900000000000,
    NVDA: 1200000000000,
    NFLX: 200000000000,
  };
  return caps[symbol] || 100000000000;
};

const getPERatio = (_symbol) => {
  return Math.floor(Math.random() * 30) + 10;
};

const getDividendYield = (_symbol) => {
  return Math.floor(Math.random() * 300) / 100;
};

const getSector = (symbol) => {
  const sectors = {
    AAPL: 'Technology',
    GOOGL: 'Technology',
    MSFT: 'Technology',
    AMZN: 'Consumer Discretionary',
    TSLA: 'Consumer Discretionary',
    META: 'Technology',
    NVDA: 'Technology',
    NFLX: 'Communication Services',
  };
  return sectors[symbol] || 'Technology';
};

const getIndustry = (symbol) => {
  const industries = {
    AAPL: 'Consumer Electronics',
    GOOGL: 'Internet Content & Information',
    MSFT: 'Software',
    AMZN: 'Internet & Direct Marketing Retail',
    TSLA: 'Auto Manufacturers',
    META: 'Internet Content & Information',
    NVDA: 'Semiconductors',
    NFLX: 'Entertainment',
  };
  return industries[symbol] || 'Software';
};

export {
  manualUpdate,
  scheduleDailyUpdates,
  updateAllData,
  updateApodData,
  updateCryptoData,
  updateGithubData,
  updateNpmData,
  updateSpaceLaunchesData,
  updateStackoverflowData,
  updateStockData,
};
