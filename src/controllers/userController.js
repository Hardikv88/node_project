const { User } = require('../models');

exports.getAllUsers = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || '10', 10)));
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      where: {
        id: {
          [require('sequelize').Op.ne]: req.user.id,
        },
      },
      attributes: {
        exclude: ['userPassword'],
      },
      order: [['created_at', 'DESC']],
      limit: limit,
      offset: offset,
    });

    const totalPages = Math.ceil(count / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: rows,
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: count,
        totalPages: totalPages,
        hasNextPage: hasNext,
        hasPreviousPage: hasPrevious,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
