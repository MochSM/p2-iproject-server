const axios = require ('axios');

const midtrans = axios.create({
  baseURL: 'https://api.sandbox.midtrans.com/v2/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Basic ${Buffer.from(process.env.MIDTRANS_SERVER_KEY + ':').toString('base64')}`,
  },
});

module.exports = { midtrans };
