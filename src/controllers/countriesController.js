import { Country } from '../models/index.js';
import {
  createErrorResponse,
  createResponse,
  parseQueryParams,
} from '../utils/apiHelpers.js';

export const getAllCountries = async (req, res) => {
  try {
    const { page, limit, sort, search, filters } = parseQueryParams(req.query);

    // Build MongoDB query
    const query = {};

    // Apply search if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { capital: { $regex: search, $options: 'i' } },
        { languages: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Apply filters
    if (filters.region) {
      query.region = { $regex: filters.region, $options: 'i' };
    }
    if (filters.currency) {
      query.currency = filters.currency.toUpperCase();
    }
    if (filters.language) {
      query.languages = { $in: [new RegExp(filters.language, 'i')] };
    }

    // Get total count for pagination
    const total = await Country.countDocuments(query);

    // Build sort object
    let sortObj = {};
    if (sort) {
      const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
      const sortOrder = sort.startsWith('-') ? -1 : 1;
      sortObj[sortField] = sortOrder;
    } else {
      sortObj = { name: 1 }; // Default sort by name
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const countries = await Country.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .select('-__v'); // Exclude version field

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const pagination = {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };

    res.json(createResponse(countries, pagination));
  } catch (error) {
    console.error('Error in getAllCountries:', error);
    res.status(500).json(createErrorResponse('Failed to fetch countries data'));
  }
};

export const getCountryByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const country = await Country.findOne({
      code: { $regex: new RegExp(`^${code}$`, 'i') },
    }).select('-__v');

    if (!country) {
      return res
        .status(404)
        .json(
          createErrorResponse(`Country with code '${code}' not found`, 404)
        );
    }

    res.json(createResponse(country));
  } catch (error) {
    console.error('Error in getCountryByCode:', error);
    res.status(500).json(createErrorResponse('Failed to fetch country data'));
  }
};
