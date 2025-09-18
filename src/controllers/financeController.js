import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createResponse } from "../utils/apiHelpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load data
const cryptoData = JSON.parse(
  readFileSync(join(__dirname, "../data/crypto.json"), "utf8")
);
const stocksData = JSON.parse(
  readFileSync(join(__dirname, "../data/stocks.json"), "utf8")
);

/**
 * Get all cryptocurrencies
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllCrypto = (req, res) => {
  try {
    const { limit = 10, sort = "rank" } = req.query;
    let data = [...cryptoData];

    // Apply sorting
    if (sort === "price") {
      data.sort((a, b) => b.price - a.price);
    } else if (sort === "market_cap") {
      data.sort((a, b) => b.market_cap - a.market_cap);
    } else if (sort === "change_percent") {
      data.sort((a, b) => b.change_percent_24h - a.change_percent_24h);
    } else {
      data.sort((a, b) => a.rank - b.rank);
    }

    // Apply limit
    const limitNum = parseInt(limit, 10);
    if (limitNum > 0) {
      data = data.slice(0, limitNum);
    }

    res.json(
      createResponse(
        true,
        data,
        null,
        "Cryptocurrency data retrieved successfully"
      )
    );
  } catch (error) {
    res
      .status(500)
      .json(
        createResponse(false, null, "Failed to retrieve cryptocurrency data")
      );
  }
};

/**
 * Get cryptocurrency by symbol
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getCryptoBySymbol = (req, res) => {
  try {
    const { symbol } = req.params;
    const crypto = cryptoData.find(
      (c) => c.symbol.toLowerCase() === symbol.toLowerCase()
    );

    if (!crypto) {
      return res
        .status(404)
        .json(createResponse(false, null, "Cryptocurrency not found"));
    }

    res.json(
      createResponse(
        true,
        crypto,
        null,
        "Cryptocurrency data retrieved successfully"
      )
    );
  } catch (error) {
    res
      .status(500)
      .json(
        createResponse(false, null, "Failed to retrieve cryptocurrency data")
      );
  }
};

/**
 * Get all stocks
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllStocks = (req, res) => {
  try {
    const { limit = 10, sort = "symbol", sector } = req.query;
    let data = [...stocksData];

    // Apply sector filter
    if (sector) {
      data = data.filter(
        (stock) => stock.sector.toLowerCase() === sector.toLowerCase()
      );
    }

    // Apply sorting
    if (sort === "price") {
      data.sort((a, b) => b.price - a.price);
    } else if (sort === "change_percent") {
      data.sort((a, b) => b.change_percent - a.change_percent);
    } else if (sort === "market_cap") {
      data.sort((a, b) => b.market_cap - a.market_cap);
    } else {
      data.sort((a, b) => a.symbol.localeCompare(b.symbol));
    }

    // Apply limit
    const limitNum = parseInt(limit, 10);
    if (limitNum > 0) {
      data = data.slice(0, limitNum);
    }

    res.json(
      createResponse(true, data, null, "Stock data retrieved successfully")
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Failed to retrieve stock data"));
  }
};

/**
 * Get stock by symbol
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getStockBySymbol = (req, res) => {
  try {
    const { symbol } = req.params;
    const stock = stocksData.find(
      (s) => s.symbol.toLowerCase() === symbol.toLowerCase()
    );

    if (!stock) {
      return res
        .status(404)
        .json(createResponse(false, null, "Stock not found"));
    }

    res.json(
      createResponse(true, stock, null, "Stock data retrieved successfully")
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Failed to retrieve stock data"));
  }
};

/**
 * Convert currency
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const convertCurrency = (req, res) => {
  try {
    const { from = "USD", to = "EUR", amount = 1 } = req.query;

    // Mock exchange rates (in a real app, you'd fetch from an API)
    const exchangeRates = {
      USD: { EUR: 0.85, GBP: 0.73, JPY: 110.0, INR: 74.5, CAD: 1.25 },
      EUR: { USD: 1.18, GBP: 0.86, JPY: 129.5, INR: 87.8, CAD: 1.47 },
      GBP: { USD: 1.37, EUR: 1.16, JPY: 150.2, INR: 101.8, CAD: 1.71 },
      INR: { USD: 0.013, EUR: 0.011, GBP: 0.0098, JPY: 1.48, CAD: 0.017 },
      CAD: { USD: 0.8, EUR: 0.68, GBP: 0.58, JPY: 88.0, INR: 59.6 },
    };

    const fromUpper = from.toUpperCase();
    const toUpper = to.toUpperCase();
    const amountNum = parseFloat(amount);

    if (isNaN(amountNum) || amountNum <= 0) {
      return res
        .status(400)
        .json(createResponse(false, null, "Invalid amount"));
    }

    if (!exchangeRates[fromUpper] || !exchangeRates[fromUpper][toUpper]) {
      return res
        .status(400)
        .json(createResponse(false, null, "Currency pair not supported"));
    }

    const rate = exchangeRates[fromUpper][toUpper];
    const convertedAmount = amountNum * rate;

    const result = {
      from: fromUpper,
      to: toUpper,
      amount: amountNum,
      rate: rate,
      converted_amount: convertedAmount,
      timestamp: new Date().toISOString(),
      note: "Exchange rates are for demonstration purposes only",
    };

    res.json(
      createResponse(
        true,
        result,
        null,
        "Currency conversion completed successfully"
      )
    );
  } catch (error) {
    res
      .status(500)
      .json(createResponse(false, null, "Failed to convert currency"));
  }
};
