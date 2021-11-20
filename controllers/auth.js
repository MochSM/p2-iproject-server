const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { compare } = require('../helpers/bcrypt');

class AuthController {
  static async googleLogin(req, res, next) {
    try {
      const { id_token, type } = req.body;
      console.log('Sampeee ');
      const client = new OAuth2Client(process.env.GOOGLE_SIGNIN_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_SIGNIN_CLIENT_ID,
      });

      const { email, picture, given_name, family_name } = ticket.getPayload();

      const [user, isCreated] = await User.findOrCreate({
        where: { email },
        defaults: {
          firstName: given_name,
          lastName: family_name,
          pictureUrl: picture,
          password: 'RANDOM' + (Math.random() + 1).toString(36),
        },
      });

      if (user) {
        const status = isCreated ? 201 : 200;
        const access_token = generateToken({ id: user.id, email: user.email });

        res.status(status).json({ 
          message: 'Login successful', 
          access_token, 
          user_id: user.id, 
          is_driver: user.isDriver, 
        });
      } else throw { name: 'Invalid' };
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password, firstName, lastName, isDriver } = req.body;
      const result = await User.create({ email, password, firstName, lastName, isDriver });

      res.status(201).json({
        message: 'Register successful',
        email: result.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const user = await User.findOne({ where: { email } });
      if (user && password && compare(password, user.password)) {
        const payload = { id: user.id, email: user.email };
        const access_token = generateToken(payload);
        res.status(200).json({
          message: 'Login successful',
          access_token,
          user_id: user.id,
          is_driver: user.isDriver,
        });
      } else throw { name: 'Invalid' };
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AuthController;
