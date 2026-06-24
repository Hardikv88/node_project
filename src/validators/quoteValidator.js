const Joi = require('joi');

const createQuoteSchema = Joi.object({
  quotes: Joi.string().required().messages({
    'string.empty': 'Quotes text is required',
    'any.required': 'Quotes text is required',
  }),
  author: Joi.string().required().messages({
    'string.empty': 'Author is required',
    'any.required': 'Author is required',
  }),
});

const updateQuoteSchema = Joi.object({
  quotes: Joi.string().optional(),
  author: Joi.string().optional(),
}).min(1).messages({
  'object.min': 'At least one field is required for update',
});

const getQuotesQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().optional().allow(''),
  sortBy: Joi.string().valid('quotes', 'author', 'created_at', 'updated_at').default('created_at'),
  sortOrder: Joi.string().valid('ASC', 'DESC').default('DESC'),
});

const getQuoteByIdParamsSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.uuid': 'Invalid quote ID',
    'any.required': 'Quote ID is required',
  }),
});

const validateCreateQuote = (req, res, next) => {
  const { error } = createQuoteSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map((detail) => ({
        field: detail.path[0],
        message: detail.message,
      })),
    });
  }
  next();
};

const validateUpdateQuote = (req, res, next) => {
  const { error } = updateQuoteSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map((detail) => ({
        field: detail.path[0],
        message: detail.message,
      })),
    });
  }
  next();
};

const validateGetQuotesQuery = (req, res, next) => {
  const { error, value } = getQuotesQuerySchema.validate(req.query, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map((detail) => ({
        field: detail.path[0],
        message: detail.message,
      })),
    });
  }
  req.query = value;
  next();
};

const validateGetQuoteByIdParams = (req, res, next) => {
  const { error } = getQuoteByIdParamsSchema.validate(req.params, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map((detail) => ({
        field: detail.path[0],
        message: detail.message,
      })),
    });
  }
  next();
};

module.exports = {
  validateCreateQuote,
  validateUpdateQuote,
  validateGetQuotesQuery,
  validateGetQuoteByIdParams,
};
