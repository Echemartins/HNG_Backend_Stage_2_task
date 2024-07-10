const { User, Organisation } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone
    });

    const organisation = await Organisation.create({
      orgId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `${firstName}'s Organisation`,
      description: `This organnisation was created by ${firstName} `
    });

    await user.addOrganisation(organisation);

    const token = jwt.sign({ userId: user.userId, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      message: 'Registration unsuccessful',
      statusCode: 400,
      errors: error.errors.map(err => ({ field: err.path, message: err.message }))
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: 'Bad request',
        message: 'Authentication failed',
        statusCode: 401
      });
    }

    const token = jwt.sign({ userId: user.userId, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      statusCode: 500
    });
  }
};