const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    // Pagination parameters from request body
    const page = parseInt(req.body.page, 10) || 1;
    const limit = parseInt(req.body.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      where: {
        userId: {
          [require('sequelize').Op.ne]: req.user.userId,
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
      data: rows,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: count,
        totalPages: totalPages,
        hasNextPage: hasNext,
        hasPreviousPage: hasPrevious,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
