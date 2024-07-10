const { Organisation, User } = require('../models');
const { Op } = require('sequelize');

exports.getOrganisations = async (req, res) => {
  try {
    const organisations = await req.user.getOrganisations();
    res.status(200).json({
      status: 'success',
      message: 'Organisations retrieved successfully',
      data: {
        organisations
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

exports.getOrganisation = async (req, res) => {
  try {
    const organisation = await Organisation.findOne({
      where: {
        orgId: req.params.orgId,
        '$Users.userId$': req.user.userId
      },
      include: [User]
    });

    if (!organisation) {
      return res.status(404).json({
        status: 'error',
        message: 'Organisation not found',
        statusCode: 404
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Organisation retrieved successfully',
      data: organisation
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      statusCode: 500
    });
  }
};

exports.createOrganisation = async (req, res) => {
  try {
    const { name, description } = req.body;
    const organisation = await Organisation.create({
      orgId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description
    });

    await req.user.addOrganisation(organisation);

    res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: organisation
    });
  } catch (error) {
    res.status(422).json({
      status: 'Bad Request',
      message: 'Client error',
      statusCode: 422,
      errors: error.errors.map(err => ({ field: err.path, message: err.message }))
    });
  }
};

exports.addUserToOrganisation = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ where: { userId } });
    const organisation = await Organisation.findOne({
      where: {
        orgId: req.params.orgId,
        '$Users.userId$': req.user.userId
      },
      include: [User]
    });

    if (!user || !organisation) {
      return res.status(404).json({
        status: 'error',
        message: 'User or Organisation not found',
        statusCode: 404
      });
    }

    await organisation.addUser(user);

    res.status(200).json({
      status: 'success',
      message: 'User added to organisation successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      statusCode: 500
    });
  }
};