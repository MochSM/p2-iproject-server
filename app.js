if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const { midtrans } = require('./apis/midtrans');
const router = require('./routers');

const app = express();

app.use([
  cors(), 
  express.json(), 
  express.urlencoded({ extended: true })
]);

app.use(router);
app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'ok',
  })
});

module.exports = app;
