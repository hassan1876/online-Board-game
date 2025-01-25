import GameXo from "../models/gameXo.js";
const games  = {};

export function createGame(player1,player2,gameId){
    games[gameId] = new GameXo(gameId,player1,player2);
    
    return games[gameId];
}

export function makeMove(gameId,position){
    const game = games[gameId];
    if (!game) {
        return { error: "Game not found" };
    }

    const result = game.makeMove(position);
    if(result){
        return {error:"",game: game};
    }else{
        return { error: "Wrong move",game: game };
    }


}
