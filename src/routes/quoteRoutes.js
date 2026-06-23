const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  validateCreateQuote,
  validateUpdateQuote,
  validateGetQuotesQuery,
  validateGetQuoteByIdParams,
} = require('../validators/quoteValidator');

router.post('/', authenticateToken, validateCreateQuote, quoteController.createQuote);
router.get('/', authenticateToken, validateGetQuotesQuery, quoteController.getAllQuotes);
router.get('/:id', authenticateToken, validateGetQuoteByIdParams, quoteController.getQuoteById);
router.put('/:id', authenticateToken, validateGetQuoteByIdParams, validateUpdateQuote, quoteController.updateQuote);
router.delete('/:id', authenticateToken, validateGetQuoteByIdParams, quoteController.deleteQuote);

module.exports = router;
