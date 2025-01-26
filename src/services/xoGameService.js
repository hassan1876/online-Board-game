import GameXo from "../models/gameXo.js";
import generatId from '../utils/generateRoomId.js';
import Player from '../models/Player.js';
const waitingPlayers = [];
const games = {};


export function createGame(player1,player2,gameId){
    games[gameId] = new GameXo(gameId,player1,player2);
    
    return games[gameId];
}
export function matchPlayer(io,socket,socketId,playerId){
    waitingPlayers.push({socketId:socket.id,player:new Player(playerId)});
    if(waitingPlayers.length>=2){
        const player1 = waitingPlayers[0].player;
        const socket1 = waitingPlayers[0].socketId;
        player1.piece  ="X";
        waitingPlayers.shift();

        const player2 = waitingPlayers[0].player;
        const socket2 = waitingPlayers[0].socketId;
        player2.piece = "O";
        waitingPlayers.shift();

        const gameId = generatId();
        console.log("Generated gameId:", gameId);
        const player1Socket = io.sockets.sockets.get(socket1);
        const player2Socket = io.sockets.sockets.get(socket2);
        
        if (player1Socket && player2Socket) {
            player1Socket.join(gameId);
            player2Socket.join(gameId);
        } else {
            console.error("One or both player sockets could not be found");
            
        }
        const game =createGame(player1,player2,gameId);
        games[gameId] = game;
        // console.log("Game created with gameId:", gameId, "Current games:", games);

        io.to(gameId).emit('player_matched');
        io.to(gameId).emit('update_game',{error:"",game:game});
    }else{
        socket.emit('waiting_for_opponent');
    }
    
}

export function makeMove(io,gameId,position){
    const game = games[gameId];
    if (!game) {
        console.log("game not found");
        io.to(gameId).emit('game_not_found',{error:"game not found",game:game});
        return;
    }

    clearInterval(game.timerInterval);
    const result = game.makeMove(position);
    console.log("move made",position);
    games[gameId]=game;
    if(result){
        if(game.status !== "game ended"){
            // startTurnTimer(io,gameId);
        }
        io.to(gameId).emit('update_game',{error:"",game: game});
    }else{
        io.to(gameId).emit('update_game',{error:"invalid move",game: game});
    }
}

function startTurnTimer(io,gameId) {
    const game = games[gameId];

    let remainingTime = game.timer;

    game.timerInterval = setInterval(() => {
        remainingTime -= 1;
        io.to(gameId).emit('timer_update', { time: remainingTime });

        if (remainingTime <= 0) {
            clearInterval(game.timerInterval);
            io.to(gameId).emit('turn_time_out');
        }
    }, 1000);
}
