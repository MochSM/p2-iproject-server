const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');

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
}

module.exports = AuthController;
