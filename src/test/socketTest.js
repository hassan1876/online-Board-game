import { io } from 'socket.io-client';

const socket1 = io("http://localhost:3333");
let gameid;
socket1.on('waiting_for_opponent', () => {
  console.log("Received: waiting_for_opponent");
});

socket1.on('connect', () => {
  console.log("Connected to server:", socket1.id);
});

socket1.emit('join',({playerId:"p1"}));

socket1.on('game_found', (data) => {
  gameid=data.gameId ;
  console.log("Player 1 Game started");
  socket1.emit('make_move', { gameId: gameid, position: 0 });
});

const socket2 = io("http://localhost:3333");

socket2.on('waiting_for_opponent', () => {
  console.log("Received: waiting_for_opponent");
});

socket2.on('connect', () => {
  console.log("Connected to server:", socket1.id);
});

socket2.emit('join',({playerId:"p2"}));

socket2.on('game_found', (data) => {
  gameid=data.gameId 
  console.log("Player 2 started game");
});


