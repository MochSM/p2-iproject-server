const { Trip, User } = require('../models');
const { Op } = require("sequelize");

class TripController {
  static async postTrip(req, res, next) {
    try {
      const { pickup, pickupLocation, destination, destinationLocation } = req.body;
      // Only allow one trip, cancel first to create other.
      const [trip, isCreated] = await Trip.findOrCreate({
        where: {
          UserId: req.user.id,
          status: 'pending',
        },
        defaults: {
          pickupLat: pickup[1],
          pickupLong: pickup[0],
          pickupLocation,
          destinationLat: destination[1],
          destinationLong: destination[0],
          destinationLocation,
        },
      });
      if (isCreated) {
        res.status(201).json(trip);
      } else {
        throw { name: 'Exist' }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getTrips(req, res, next) {
    try {
      const conditions = req.user.isDriver ? { status: ['pending', 'accepted', 'payment_pending', 'paid'] } : { status: ['pending', 'accepted', 'payment_pending', 'paid'], UserId: req.user.id };
      console.log(req.user.isDriver, '? driverr');
      const result = await Trip.findAll({
        where: conditions,
        attributes: {
          exclude: ['createdAt'],
        },
        include: [
          {
            model: User,
            required: false,
            attributes: ['firstName', 'lastName'],
          },
          {
            model: User,
            required: false,
            attributes: ['firstName', 'lastName'],
            as: 'Driver'
          },
        ],
      });
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateTrip(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const params = {
        status
      }
      
      if (status === 'accepted' && req.user.isDriver) {
        params['DriverId'] = req.user.id;
      } else {
        throw { name: 'onlyDriver' }
      }

      if (status === 'done' && req.user.isDriver) {
        params['tripEnd'] = new Date();
      }

      console.log(params);
      const updated = await Trip.update(params, {
        where: {
          id,
        }
      })
      res.status(200).json({
        message: 'success',
      })
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = TripController;
