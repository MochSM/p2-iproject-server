'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      DriverId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      pickupLang: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pickupLong: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pickupLocation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      destinationLang: {
        allowNull: false,
        type: Sequelize.STRING
      },
      destinationLong: {
        allowNull: false,
        type: Sequelize.STRING
      },
      destinationLocation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tripStart: {
        type: Sequelize.DATE
      },
      tripEnd: {
        type: Sequelize.DATE
      },
      status: {
        defaultValue: 'pending',
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Trips');
  }
};