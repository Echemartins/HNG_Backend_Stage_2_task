const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { userId: decodedToken.userId } });


    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized',
        statusCode: 401
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
      statusCode: 401
    });
  }
};

module.exports = authMiddleware;