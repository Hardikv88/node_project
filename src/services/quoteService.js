const quoteRepository = require('../repositories/quoteRepository');
const { buildQuery, buildPagination, buildMeta } = require('../utils/searchFilter');
const { NotFoundError, ForbiddenError } = require('../utils/errors');

class QuoteService {
  async createQuote(data, userId) {
    const quoteData = {
      ...data,
      userId,
      createdBy: userId,
    };
    return await quoteRepository.create(quoteData);
  }

  async getAllQuotes(queryParams) {
    const { page, limit, offset } = buildPagination(queryParams.page, queryParams.limit);
    const { where, order } = buildQuery({
      search: queryParams.search,
      searchFields: ['quotes', 'author'],
      sortBy: queryParams.sortBy,
      sortOrder: queryParams.sortOrder,
    });

    const { count, rows } = await quoteRepository.findAll({
      where,
      order,
      limit,
      offset,
    });

    const meta = buildMeta(count, page, limit);

    return { data: rows, meta };
  }

  async getQuoteById(id) {
    const quote = await quoteRepository.findById(id);
    if (!quote) {
      throw new NotFoundError('Quote not found');
    }
    return quote;
  }

  async updateQuote(id, data, userId, userRole) {
    const quote = await quoteRepository.findById(id);
    if (!quote) {
      throw new NotFoundError('Quote not found');
    }

    if (userRole !== 'super_admin' && userRole !== 'admin' && quote.userId !== userId) {
      throw new ForbiddenError('You are not authorized to update this quote');
    }

    const updateData = {
      ...data,
      updatedBy: userId,
    };

    return await quoteRepository.update(id, updateData);
  }

  async deleteQuote(id, userId, userRole) {
    const quote = await quoteRepository.findById(id);
    if (!quote) {
      throw new NotFoundError('Quote not found');
    }

    if (userRole !== 'super_admin' && userRole !== 'admin' && quote.userId !== userId) {
      throw new ForbiddenError('You are not authorized to delete this quote');
    }

    return await quoteRepository.softDelete(id, userId);
  }
}

module.exports = new QuoteService();
