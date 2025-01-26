import { makeMove,matchPlayer } from '../services/xoGameService.js';

export default (io,socket)=>{
    socket.on('join',({playerId})=>{
        matchPlayer(io,socket,socket.id,playerId);
    },
    socket.on('make_move',({pos,gameId})=>{
        console.log("pos",pos);
        makeMove(io,gameId, pos);
    }),
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
      })
)




}