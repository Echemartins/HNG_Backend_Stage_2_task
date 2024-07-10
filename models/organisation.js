'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organisation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organisation.belongsToMany(models.User, {
        through: 'UserOrganisation',
        foreignKey: 'orgId'
      });
    }
  }
  Organisation.init({
    orgId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Organisation',
  });
  return Organisation;
};