export default class GameXo {
    constructor(gameid, player1, player2) {
      this.gameid = gameid;
      this.p1 = player1;
      this.p2 = player2;
      this.currentTurn = player1.piece;
      this.status = "playing";
      this.moves = 0;
      this.winner  = "";
      this.board = Array(9).fill("");
    }
  
    makeMove(position) {
      if (this.status !== "playing") {
        return false;
      }
  
      if (position < 0 || position > 8 || this.board[position] !== "") {
        return false;
      }
  
      this.board[position] = this.currentTurn;
      this.moves++;
  
      if (this.checkWinner()) {
        this.status = "won";
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
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal from top-left to bottom-right
        [2, 4, 6], // Diagonal from top-right to bottom-left
      ];
  
      return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return (
          this.board[a] === this.currentTurn &&
          this.board[a] === this.board[b] &&
          this.board[a] === this.board[c]
        );
      });
    }
  
    
  }
  