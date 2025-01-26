export default class GameXo {
    constructor(gameid, player1, player2) {
      this.gameid = gameid;
      this.p1 = player1;
      this.p2 = player2;
      this.currentTurn = player1.piece;
      this.status = "game started";
      this.winningLine ;
      this.moves = 0;
      this.winner  = "";
      this.timer =30;
      this.timerInterval;
      this.board = Array(9).fill("");
    }
  
    makeMove(position) {
      
      if (this.status !== "playing") {
        this.status = "playing";
      }
      console.log(this.p1,this.p2);
      if (position < 0 || position > 8 || this.board[position] !== "") {
        return false;
      }
  
      this.board[position] = this.currentTurn;
      
      // console.log(this.board);
      console.log(this.board);
      this.moves++;
      console.log("xoboard updated:",this.board);
      if (this.checkWinner()) {
        this.status = "game ended";
        if(this.currentTurn==this.p1.piece){
            this.winner=this.p1;
        }else{
            this.winner=this.p2;
        }
        return true;
      } else if (this.moves === 9) {
        this.status = "draw";
        return true;
      }
  
      this.currentTurn = this.currentTurn === "X" ? "O" : "X";
      return true;
    }
  
    
    checkWinner() {
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (this.board[a] === this.currentTurn && 
            this.board[a] === this.board[b] && 
            this.board[a] === this.board[c]) {
              this.winningLine = [a,b,c];
          
          return true;
        }
      }
      return false;
    
    }
  
    
  }
  