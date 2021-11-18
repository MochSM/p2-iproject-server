const { Trip, User } = require('../models');
const  { midtrans } = require('../apis/midtrans');

class PaymentController {
  static async makePayment(req, res, next) {
    try {
 
      const { card_number, card_exp_month, card_exp_year, card_cvv, price } = req.body;
      const { id } = req.params;
      console.log(req.params, 'ini params');
      const trip = await Trip.findOne({
        where: {
          id
        },
        include: [
          {
            model: User,
            required: false,
            attributes: ['email', 'firstName', 'lastName'],
          },
          {
            model: User,
            required: false,
            attributes: ['firstName', 'lastName'],
            as: 'Driver'
          },
        ],
      })

      console.log(trip.User, 'ini trip');

      const getToken = await midtrans({
        url: 'token?client_key=SB-Mid-client-zIEiiU47dCJ5jF5E&card_number=4811111111111114&card_exp_month=12&card_exp_year=24&card_cvv=123',
        method: 'GET',
        params: {
          client_key: 'SB-Mid-client-zIEiiU47dCJ5jF5E',
          card_number,
          card_exp_month,
          card_exp_year,
          card_cvv,
        }
      })

      if (getToken.data.status_code === '200' && trip) {
        const data = {
          payment_type: 'credit_card',
          transaction_details: {
            gross_amount: price, // ini darimana ?
            order_id: `trip-order-${+ new Date()}`,
          },
          credit_card: {
            token_id: getToken.data.token_id,
            authentication: true
          },
          customer_details: { // ambil dari user
            email: trip.User.email,
            first_name: trip.User.firstName,
            last_name: trip.User.lastName,
            phone: '+6281 1234 1234',
          },
          item_details: [{
            id: trip.id,
            price: price,
            quantity: 1,
            name: `Trip with ${trip.Driver.firstName} ${trip.Driver.lastName}`,
            brand: "ride-ride",
            category: "services",
            merchant_name: "ride-sharing"
          }],
          customer_details: {
            email: trip.User.email,
            first_name: trip.User.firstName,
            last_name: trip.User.lastName,
            phone: '+6281 1234 1234',
            billing_address: {
              first_name: trip.User.firstName,
              last_name: trip.User.lastName,
            },
            shipping_address: {
              first_name: trip.User.firstName,
              last_name: trip.User.lastName,
            }
          }
        };
        const chargeUser = await midtrans({
          method: 'POST',
          url: 'charge',
          data
        })
        if (chargeUser) {
          console.log(chargeUser.data, 'tokenya dapet?');

          trip.update({
            status: 'payment_pending',
            redirectUrl: chargeUser.data.redirect_url,
          })

          res.status(chargeUser.data.status_code).json({
            message: chargeUser.data.status_message,
          })
        } else {
          throw { name: 'error' }
        }
      } else {
        throw { name: 'error' }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

}

module.exports = PaymentController;
