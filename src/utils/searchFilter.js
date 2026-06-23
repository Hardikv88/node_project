const { Op } = require('sequelize');

const buildQuery = (options = {}) => {
  const { search = '', searchFields = [], filters = {}, sortBy = 'created_at', sortOrder = 'DESC' } = options;

  const where = {};

  if (search && searchFields.length > 0) {
    where[Op.or] = searchFields.map((field) => ({
      [field]: {
        [Op.iLike]: `%${search}%`,
      },
    }));
  }

  Object.keys(filters).forEach((key) => {
    if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
      where[key] = filters[key];
    }
  });

  const order = [[sortBy, sortOrder]];

  return { where, order };
};

const buildPagination = (page = 1, limit = 10) => {
  const parsedPage = parseInt(page, 10) || 1;
  const parsedLimit = parseInt(limit, 10) || 10;
  const offset = (parsedPage - 1) * parsedLimit;

  return {
    page: parsedPage,
    limit: parsedLimit,
    offset,
  };
};

const buildMeta = (count, page, limit) => {
  const totalPages = Math.ceil(count / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    currentPage: page,
    itemsPerPage: limit,
    totalItems: count,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};

module.exports = {
  buildQuery,
  buildPagination,
  buildMeta,
};
