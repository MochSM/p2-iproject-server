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
  // check message.
  socket.on('my message', (msg) => {
    console.log('message: ' + msg);
    io.emit('my broadcast', `server: ${msg}`);
  });
});

httpServer.listen(port, (_) => console.log('listen on', port));