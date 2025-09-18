import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing deepdevnodes API endpoints...\n');

  const tests = [
    { name: 'Health Check', url: '/health' },
    { name: 'Root Endpoint', url: '/' },
    { name: 'Countries API', url: '/api/countries' },
    {
      name: 'Countries with filters',
      url: '/api/countries?region=Asia&limit=2',
    },
    { name: 'IP Lookup', url: '/api/ip/8.8.8.8' },
    { name: 'Quotes API', url: '/api/quotes' },
    { name: 'Quotes with search', url: '/api/quotes?search=work' },
    { name: 'Jokes API', url: '/api/jokes' },
    { name: 'Jokes with category', url: '/api/jokes?category=programming' },
    { name: 'Random Number', url: '/api/utilities/random?min=1&max=100' },
    { name: 'Time API', url: '/api/time/US' },
    {
      name: 'Currency Conversion',
      url: '/api/currency/convert?from=USD&to=EUR&amount=100',
    },
    { name: 'Random Fact', url: '/api/facts/random' },
    { name: 'Facts by category', url: '/api/facts?category=science' },
  ];

  for (const test of tests) {
    try {
      const response = await fetch(`${BASE_URL}${test.url}`);
      const data = await response.json();

      if (response.ok && data.success !== false) {
        console.log(`✅ ${test.name}: OK`);
      } else {
        console.log(
          `❌ ${test.name}: ${response.status} - ${
            data.error?.message || 'Unknown error'
          }`
        );
      }
    } catch (error) {
      console.log(`❌ ${test.name}: Failed to connect - ${error.message}`);
    }
  }

  console.log('\n📚 API Documentation: http://localhost:3000/api-docs');
}

// Run tests
testAPI().catch(console.error);
