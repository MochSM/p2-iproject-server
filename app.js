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
// app.get('/', async (req, res, next) => {
//   try {
//     const data = {
//       payment_type: 'bank_transfer',
//       transaction_details: {
//         gross_amount: 21000,
//         order_id: `order-101c-${+ new Date()}`,
//       },
//       customer_details: {
//         email: 'noreply@example.com',
//         first_name: 'budi',
//         last_name: 'utomo',
//         phone: '+6281 1234 1234',
//       },
//       item_details: [
//         {
//           id: 'item01',
//           price: 21000,
//           quantity: 1,
//           name: 'Ayam Zozozo',
//         },
//       ],
//       bank_transfer: {
//         bank: 'bca',
//         va_number: '12345678901',
//         free_text: {
//           inquiry: [
//             {
//               id: 'Your Custom Text in ID language',
//               en: 'Your Custom Text in EN language',
//             },
//           ],
//           payment: [
//             {
//               id: 'Your Custom Text in ID language',
//               en: 'Your Custom Text in EN language',
//             },
//           ],
//         },
//       },
//     };
//     const response = await midtrans({
//       url: 'charge',
//       method: 'POST',
//       data,
//     });
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// });

module.exports = app;
