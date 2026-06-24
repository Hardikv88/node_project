const quoteService = require('../services/quoteService');

class QuoteController {
  async createQuote(req, res, next) {
    try {
      const quote = await quoteService.createQuote(req.body, req.user.id);
      res.status(201).json({
        success: true,
        message: 'Quote created successfully',
        data: quote,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllQuotes(req, res, next) {
    try {
      const { data, meta } = await quoteService.getAllQuotes(req.query);
      res.status(200).json({
        success: true,
        message: 'Quotes retrieved successfully',
        data,
        meta,
      });
    } catch (error) {
      next(error);
    }
  }

  async getQuoteById(req, res, next) {
    try {
      const quote = await quoteService.getQuoteById(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Quote retrieved successfully',
        data: quote,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateQuote(req, res, next) {
    try {
      const quote = await quoteService.updateQuote(
        req.params.id,
        req.body,
        req.user.id,
        req.user.userRole
      );
      res.status(200).json({
        success: true,
        message: 'Quote updated successfully',
        data: quote,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteQuote(req, res, next) {
    try {
      await quoteService.deleteQuote(
        req.params.id,
        req.user.id,
        req.user.userRole
      );
      res.status(200).json({
        success: true,
        message: 'Quote deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new QuoteController();
