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
      Trip.belongsTo(models.User, {
        foreignKey: 'UserId',
      })
      Trip.belongsTo(models.User, {
        foreignKey: 'DriverId',
        as: 'Driver'
      })
    }
  };
  Trip.init({
    UserId: DataTypes.INTEGER,
    DriverId: DataTypes.INTEGER,
    pickupLat: DataTypes.STRING,
    pickupLong: DataTypes.STRING,
    pickupLocation: DataTypes.STRING,
    destinationLat: DataTypes.STRING,
    destinationLong: DataTypes.STRING,
    destinationLocation: DataTypes.STRING,
    tripStart: DataTypes.DATE,
    tripEnd: DataTypes.DATE,
    status: DataTypes.STRING,
    redirectUrl: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};