import { createErrorResponse, createResponse } from '../utils/apiHelpers.js';

// Mock exchange rates (use real API in production)
const exchangeRates = {
  USD: {
    EUR: 0.85,
    GBP: 0.73,
    INR: 74.5,
    JPY: 110.0,
    CAD: 1.25,
    AUD: 1.35,
  },
  EUR: { USD: 1.18, GBP: 0.86, INR: 87.6, JPY: 129.0, CAD: 1.47, AUD: 1.59 },
  GBP: { USD: 1.37, EUR: 1.16, INR: 101.8, JPY: 150.0, CAD: 1.71, AUD: 1.85 },
  INR: {
    USD: 0.013,
    EUR: 0.011,
    GBP: 0.0098,
    JPY: 1.47,
    CAD: 0.017,
    AUD: 0.018,
  },
  JPY: {
    USD: 0.0091,
    EUR: 0.0078,
    GBP: 0.0067,
    INR: 0.68,
    CAD: 0.011,
    AUD: 0.012,
  },
  CAD: { USD: 0.8, EUR: 0.68, GBP: 0.58, INR: 59.6, JPY: 88.0, AUD: 1.08 },
  AUD: { USD: 0.74, EUR: 0.63, GBP: 0.54, INR: 55.2, JPY: 81.5, CAD: 0.93 },
};

const supportedCurrencies = Object.keys(exchangeRates);

export const convertCurrency = (req, res) => {
  try {
    const { from, to, amount } = req.query;

    // Validate required parameters
    if (!from || !to || !amount) {
      return res
        .status(400)
        .json(
          createErrorResponse(
            'Missing required parameters: from, to, amount',
            400
          )
        );
    }

    const fromCurrency = from.toUpperCase();
    const toCurrency = to.toUpperCase();
    const amountNum = parseFloat(amount);

    // Validate currencies
    if (!supportedCurrencies.includes(fromCurrency)) {
      return res
        .status(400)
        .json(
          createErrorResponse(
            `Unsupported currency: ${fromCurrency}. Supported: ${supportedCurrencies.join(
              ', '
            )}`,
            400
          )
        );
    }

    if (!supportedCurrencies.includes(toCurrency)) {
      return res
        .status(400)
        .json(
          createErrorResponse(
            `Unsupported currency: ${toCurrency}. Supported: ${supportedCurrencies.join(
              ', '
            )}`,
            400
          )
        );
    }

    // Validate amount
    if (isNaN(amountNum) || amountNum <= 0) {
      return res
        .status(400)
        .json(createErrorResponse('Amount must be a positive number', 400));
    }

    // Get exchange rate
    let rate;
    if (fromCurrency === toCurrency) {
      rate = 1;
    } else {
      rate = exchangeRates[fromCurrency][toCurrency];
      if (!rate) {
        return res
          .status(400)
          .json(
            createErrorResponse(
              `Exchange rate not available for ${fromCurrency} to ${toCurrency}`,
              400
            )
          );
      }
    }

    // Calculate conversion
    const convertedAmount = amountNum * rate;
    const inverseRate = 1 / rate;

    res.json(
      createResponse({
        from: fromCurrency,
        to: toCurrency,
        amount: amountNum,
        rate,
        convertedAmount: Math.round(convertedAmount * 100) / 100,
        inverseRate: Math.round(inverseRate * 100) / 100,
        timestamp: new Date().toISOString(),
        note: 'Exchange rates are for demonstration purposes only',
      })
    );
  } catch (error) {
    console.error('Error in convertCurrency:', error);
    res.status(500).json(createErrorResponse('Failed to convert currency'));
  }
};
