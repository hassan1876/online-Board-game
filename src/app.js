import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import socketLogic from '../src/sockets/gameSocket.js';

const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socketLogic(io, socket);

    socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Server Setup
const PORT = process.env.PORT || 3333;
httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
