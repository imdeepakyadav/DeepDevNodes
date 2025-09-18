/**
 * Helper functions for API filtering, sorting, pagination, and search
 */

/**
 * Apply filters to data array based on query parameters
 * @param {Array} data - The data array to filter
 * @param {Object} filters - Object containing filter criteria
 * @returns {Array} Filtered data
 */
export const applyFilters = (data, filters) => {
  let filteredData = [...data];

  Object.keys(filters).forEach((key) => {
    if (
      filters[key] !== undefined
      && filters[key] !== null
      && filters[key] !== ''
    ) {
      filteredData = filteredData.filter((item) => {
        const itemValue = item[key];
        const filterValue = filters[key];

        if (typeof itemValue === 'string' && typeof filterValue === 'string') {
          return itemValue.toLowerCase().includes(filterValue.toLowerCase());
        }

        if (Array.isArray(itemValue)) {
          return itemValue.some((val) =>
            val.toLowerCase().includes(filterValue.toLowerCase())
          );
        }

        return itemValue === filterValue;
      });
    }
  });

  return filteredData;
};

/**
 * Search data by keyword across multiple fields
 * @param {Array} data - The data array to search
 * @param {string} searchTerm - The search keyword
 * @param {Array} searchFields - Fields to search in
 * @returns {Array} Filtered data matching search
 */
export const applySearch = (data, searchTerm, searchFields) => {
  if (!searchTerm || !searchFields || searchFields.length === 0) {
    return data;
  }

  return data.filter((item) => {
    return searchFields.some((field) => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (Array.isArray(value)) {
        return value.some((val) =>
          val.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return false;
    });
  });
};

/**
 * Sort data array by field
 * @param {Array} data - The data array to sort
 * @param {string} sortBy - Field to sort by (prefix with - for descending)
 * @returns {Array} Sorted data
 */
export const applySorting = (data, sortBy) => {
  if (!sortBy) return data;

  const isDescending = sortBy.startsWith('-');
  const field = isDescending ? sortBy.substring(1) : sortBy;

  return [...data].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    // Handle string comparison
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return isDescending ? -comparison : comparison;
    }

    // Handle numeric comparison
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return isDescending ? bValue - aValue : aValue - bValue;
    }

    // Handle null/undefined values
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return isDescending ? -1 : 1;
    if (bValue == null) return isDescending ? 1 : -1;

    return 0;
  });
};

/**
 * Apply pagination to data array
 * @param {Array} data - The data array to paginate
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Items per page
 * @returns {Object} Paginated result with data and pagination info
 */
export const applyPagination = (data, page = 1, limit = 10) => {
  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const offset = (currentPage - 1) * limit;

  const paginatedData = data.slice(offset, offset + limit);

  return {
    data: paginatedData,
    pagination: {
      page: currentPage,
      limit,
      total,
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    },
  };
};

/**
 * Parse query parameters for filtering, sorting, pagination
 * @param {Object} query - Express query object
 * @returns {Object} Parsed parameters
 */
export const parseQueryParams = (query) => {
  const { page = 1, limit = 10, sort, search, ...filters } = query;

  return {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort,
    search,
    filters,
  };
};

/**
 * Create standardized API response
 * @param {Array|Object} data - The response data
 * @param {Object} pagination - Pagination info (optional)
 * @param {string} message - Success message (optional)
 * @returns {Object} Standardized response
 */
export const createResponse = (data, pagination = null, message = null) => {
  const response = {
    success: true,
    data,
  };

  if (pagination) {
    response.pagination = pagination;
  }

  if (message) {
    response.message = message;
  }

  return response;
};

/**
 * Create standardized error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @returns {Object} Standardized error response
 */
export const createErrorResponse = (message, statusCode = 500) => {
  return {
    success: false,
    error: {
      message,
      statusCode,
    },
  };
};
