const { Quote, User } = require('../models');

class QuoteRepository {
  async create(data) {
    return await Quote.create(data);
  }

  async findAll(options = {}) {
    const { where = {}, order = [], limit, offset, include = [] } = options;
    return await Quote.findAndCountAll({
      where,
      order,
      limit,
      offset,
      include: include.length > 0 ? include : [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['userPassword'] },
        },
      ],
    });
  }

  async findById(id, options = {}) {
    const { include = [] } = options;
    return await Quote.findByPk(id, {
      include: include.length > 0 ? include : [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['userPassword'] },
        },
      ],
    });
  }

  async findOne(where = {}) {
    return await Quote.findOne({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['userPassword'] },
        },
      ],
    });
  }

  async update(id, data) {
    const quote = await Quote.findByPk(id);
    if (!quote) {
      return null;
    }
    await quote.update(data);
    return quote;
  }

  async softDelete(id, deletedBy = null) {
    const quote = await Quote.findByPk(id);
    if (!quote) {
      return null;
    }
    if (deletedBy) {
      quote.deletedBy = deletedBy;
      await quote.save();
    }
    await quote.destroy();
    return quote;
  }

  async count(where = {}) {
    return await Quote.count({ where });
  }
}

module.exports = new QuoteRepository();
