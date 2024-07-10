'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserOrganisation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserOrganisation.init({
    userId: DataTypes.STRING,
    orgId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserOrganisation',
  });
  return UserOrganisation;
};