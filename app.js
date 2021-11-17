if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');

const app = express();

app.use([
  cors(), 
  express.json(), 
  express.urlencoded({ extended: true })
]);


module.exports = app;
