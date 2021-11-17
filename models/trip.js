'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Trip.init({
    UserId: DataTypes.INTEGER,
    DriverId: DataTypes.INTEGER,
    pickupLang: DataTypes.STRING,
    pickupLong: DataTypes.STRING,
    pickupLocation: DataTypes.STRING,
    destinationLang: DataTypes.STRING,
    destinationLong: DataTypes.STRING,
    destinationLocation: DataTypes.STRING,
    tripStart: DataTypes.DATE,
    tripEnd: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};