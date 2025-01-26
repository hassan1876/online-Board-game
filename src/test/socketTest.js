// import { io } from 'socket.io-client';

// const socket1 = io("http://localhost:3333");
// let gameid;
// socket1.on('waiting_for_opponent', () => {
//   console.log("p1 received: waiting_for_opponent");
// });

// socket1.on('connect', () => {
//   console.log("p1 connected to server:", socket1.id);
// });

// socket1.emit('join',({playerId:"p1"}));

// socket1.on('player_matched', (data) => {
//     gameid=data;
//     socket1.on('update_game',(data)=>{
//       // gameid = data.game;
//       // console.log(gameid);
//       socket1.emit('make_move', { gameId: gameid, position: 0 });
//     })
// });

// const socket2 = io("http://localhost:3333");

// socket2.on('waiting_for_opponent', () => {
//   console.log("p2 received: waiting_for_opponent");
// });

// socket2.on('connect', () => {
//   console.log("p2 connected to server:", socket1.id);
// });

// socket2.emit('join',({playerId:"p2"}));
// // socket2.emit('make_move', { gameId: gameid, position: 2 });

// socket2.on('player_matched', () => {
//   console.log("p2 joined");
// });



// // socket1.on('timer_update',(data)=>{
//   //   console.log(data.time);
//   // })
  
//   // socket1.on('turn_time_out',()=>{
//     //   console.log("time out");
//     // })
import { io } from 'socket.io-client';

const socket1 = io("http://localhost:3333");
let gameid;

// Player 1 (p1)
socket1.on('waiting_for_opponent', () => {
  console.log("p1 received: waiting_for_opponent");
});

socket1.on('connect', () => {
  console.log("p1 connected to server:", socket1.id);
});

// Emit join event to the server with playerId
socket1.emit('join', { playerId: "p1" });

socket1.on('player_matched', (data) => {
  gameid = data.gameId; // Assign the gameId received from the server
  console.log("Game matched with gameId:", gameid);

  // Now you can start making moves once the gameId is received
  socket1.on('update_game', (data) => {
    console.log("Game updated:", data.game);
    socket1.emit('make_move', { gameId: gameid, pos: 0 }); // Make the first move
  });
});

// Player 2 (p2)
const socket2 = io("http://localhost:3333");

socket2.on('waiting_for_opponent', () => {
  console.log("p2 received: waiting_for_opponent");
});

socket2.on('connect', () => {
  console.log("p2 connected to server:", socket2.id);
});

socket2.emit('join', { playerId: "p2" });

socket2.on('player_matched', (data) => {
  console.log("p2 joined, gameId:", data.gameId);
});

