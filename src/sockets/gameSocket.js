import generatId from '../utils/generateRoomId.js';
import Player from '../models/Player.js';
import { createGame,makeMove } from '../services/xoGameService.js';
const waitingPlayers = [];
const games = {};

export default (io,socket)=>{
    socket.on('join',({playerId})=>{

        waitingPlayers.push({socketId:socket.id,player:new Player(playerId)});

        if(waitingPlayers.length>=2){

            const player1 = waitingPlayers[0].player;
            player1.piece  ="X";
            const socket1 = waitingPlayers[0].socketId;

            waitingPlayers.shift();
            const player2 = waitingPlayers[0].player;
            player2.piece = "O";
            const socket2 = waitingPlayers[0].socketId;
            waitingPlayers.shift();

            const gameId = generatId();

            socket.to(socket1).socketsJoin(gameId);
            socket.to(socket2).socketsJoin(gameId);
            
            const game =createGame(player1,player2,gameId);

            io.to(gameId).emit('game_found',{game});
            
        }else{
            socket.emit('waiting_for_opponent');
        }
    },
    socket.on('make_move',({pos,gameId})=>{
        const result = makeMove(gameId, pos);
        
        if (result.error) {
            socket.emit("error", { error: result.error });
        } else {
            socket.emit("move_made", result);
        }
    })
)




}