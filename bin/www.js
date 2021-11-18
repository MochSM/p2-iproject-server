const { createServer } = require("http");
const { Server } = require("socket.io");
const app = require('../app');

const port = process.env.PORT || 3000;

// app.listen(port, (_) => console.log('listen on', port));
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origins: [process.env.SOCKET_ORIGIN]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  // KETIKA CUSTOMER SUBMIT NEW TRIP.
  socket.on('new trip', () => {
    console.log('listening gak sih');
    io.emit('fetch trips');
  });
  socket.on('update trip', () => {
    console.log('listening gak sih');
    io.emit('fetch trips');
  });
  // update from driver
  socket.on('run trip', () => {
    io.emit('sync running trip');
  });
});

httpServer.listen(port, (_) => console.log('listen on', port));