import { Component } from '@angular/core';
import { Piece } from './piece';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly Piece = Piece;
  board!: Piece[][];
  userTurn!: boolean;
  gameOver!: boolean;
  winner!: Piece | null;
  winningTiles!: number[][];

  constructor() {
    this.newGame();
  }

  newGame() {
    this.board = [
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Empty, Piece.Empty],
    ];
    this.userTurn = true;
    this.gameOver = false;
    this.winner = Piece.Empty;
    this.winningTiles = [];
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  isWinning(row: number, col: number): boolean {
    for (let tile of this.winningTiles) {
      if (tile[0] == row && tile[1] == col) {
        return true;
      }
    }

    return false;
  }

  async onClick(row: number, column: number) {
    if (!this.userTurn || this.gameOver) return;

    this.board[row][column] = Piece.X;
    this.userTurn = false;
    this.checkWin();

    if (this.winner !== Piece.Empty || this.winner === null) {
      this.gameOver = true;

      if (this.winner !== null) {
        this.getWinningTiles(this.winner);
      }

      return;
    }

    await this.sleep(500);
    this.computerPlay();
    this.checkWin();

    if (this.winner !== Piece.Empty || this.winner === null) {
      this.gameOver = true;

      if (this.winner !== null) {
        this.getWinningTiles(this.winner);
      }

      return;
    }

    await this.sleep(500);
    this.userTurn = true;
  }

  private computerPlay() {
    const O_WINS = Piece.O + Piece.O;
    const X_WINS = Piece.X + Piece.X;
    let rowSum = 0;

    // Computer Winning

    // Row
    for (let i = 0; i < 3; i++) {
      rowSum = 0;
      for (let j = 0; j < 3; j++) {
        rowSum += this.board[i][j];
      }

      if (rowSum === O_WINS) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] === Piece.Empty) {
            this.board[i][j] = Piece.O;
            return;
          }
        }
      }
    }

    // Column
    for (let i = 0; i < 3; i++) {
      rowSum = 0;
      for (let j = 0; j < 3; j++) {
        rowSum += this.board[j][i];
      }

      if (rowSum === O_WINS) {
        for (let j = 0; j < 3; j++) {
          if (this.board[j][i] === Piece.Empty) {
            this.board[j][i] = Piece.O;
            return;
          }
        }
      }
    }

    // Principal diagonal
    rowSum = 0;
    for (let i = 0; i < 3; i++) {
      rowSum += this.board[i][i];
    }

    if (rowSum === O_WINS) {
      for (let i = 0; i < 3; i++) {
        if (this.board[i][i] === Piece.Empty) {
          this.board[i][i] = Piece.O;
          return;
        }
      }
    }

    // Secondary diagonal
    rowSum = this.board[0][2] + this.board[1][1] + this.board[2][0];
    if (rowSum === -2) {
      let j = 2;
      for (let i = 0; i < 3; i++) {
        if (this.board[i][j] === Piece.Empty) {
          this.board[i][j] = Piece.O;
          return;
        }
        j--;
      }
    }

    // User Winning

    // Row
    for (let i = 0; i < 3; i++) {
      rowSum = 0;
      for (let j = 0; j < 3; j++) {
        rowSum += this.board[i][j];
      }

      if (rowSum === X_WINS) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] === Piece.Empty) {
            this.board[i][j] = Piece.O;
            return;
          }
        }
      }
    }

    // Column
    for (let i = 0; i < 3; i++) {
      rowSum = 0;
      for (let j = 0; j < 3; j++) {
        rowSum += this.board[j][i];
      }

      if (rowSum === X_WINS) {
        for (let j = 0; j < 3; j++) {
          if (this.board[j][i] === Piece.Empty) {
            this.board[j][i] = Piece.O;
            return;
          }
        }
      }
    }

    // Principal diagonal
    rowSum = 0;
    for (let i = 0; i < 3; i++) {
      rowSum += this.board[i][i];
    }

    if (rowSum === X_WINS) {
      for (let i = 0; i < 3; i++) {
        if (this.board[i][i] === Piece.Empty) {
          this.board[i][i] = Piece.O;
          return;
        }
      }
    }

    // Secondary diagonal
    rowSum = this.board[0][2] + this.board[1][1] + this.board[2][0];
    if (rowSum === X_WINS) {
      let j = 2;
      for (let i = 0; i < 3; i++) {
        if (this.board[i][j] === Piece.Empty) {
          this.board[i][j] = Piece.O;
          return;
        }
        j--;
      }
    }

    // No Winning Move

    // Row
    for (let i = 0; i < 3; i++) {
      rowSum = 0;
      for (let j = 0; j < 3; j++) {
        rowSum += this.board[i][j];
      }

      if (rowSum === Piece.O) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] === Piece.Empty) {
            this.board[i][j] = Piece.O;
            return;
          }
        }
      }
    }

    // Column
    for (let i = 0; i < 3; i++) {
      rowSum = 0;
      for (let j = 0; j < 3; j++) {
        rowSum += this.board[j][i];
      }

      if (rowSum === Piece.O) {
        for (let j = 0; j < 3; j++) {
          if (this.board[j][i] === Piece.Empty) {
            this.board[j][i] = Piece.O;
            return;
          }
        }
      }
    }

    // Principal diagonal
    rowSum = 0;
    for (let i = 0; i < 3; i++) {
      rowSum += this.board[i][i];
    }

    if (rowSum === Piece.O) {
      for (let i = 0; i < 3; i++) {
        if (this.board[i][i] === Piece.Empty) {
          this.board[i][i] = Piece.O;
          return;
        }
      }
    }

    // Secondary diagonal
    rowSum = this.board[0][2] + this.board[1][1] + this.board[2][0];
    if (rowSum === Piece.O) {
      let j = 2;
      for (let i = 0; i < 3; i++) {
        if (this.board[i][j] === Piece.Empty) {
          this.board[i][j] = Piece.O;
          return;
        }
        j--;
      }
    }

    // Default Move
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === Piece.Empty) {
          this.board[i][j] = Piece.O;
          return;
        }
      }
    }
  }

  private checkWin() {
    const X_WINS = Piece.X + Piece.X + Piece.X;
    const O_WINS = Piece.O + Piece.O + Piece.O;
    let rowSum = 0;

    // Row
    for (let i = 0; i < 3; i++) {
      rowSum = 0;
      for (let j = 0; j < 3; j++) {
        rowSum += this.board[i][j];
      }

      if (rowSum == X_WINS) {
        this.winner = Piece.X;
        return;
      } else if (rowSum == O_WINS) {
        this.winner = Piece.O;
        return;
      }
    }

    // Column
    for (let i = 0; i < 3; i++) {
      rowSum = 0;
      for (let j = 0; j < 3; j++) {
        rowSum += this.board[j][i];
      }

      if (rowSum == X_WINS) {
        this.winner = Piece.X;
        return;
      } else if (rowSum == O_WINS) {
        this.winner = Piece.O;
        return;
      }
    }

    // Principal Diagonal
    rowSum = 0;
    for (let i = 0; i < 3; i++) {
      rowSum += this.board[i][i];
    }

    if (rowSum == X_WINS) {
      this.winner = Piece.X;
      return;
    } else if (rowSum == O_WINS) {
      this.winner = Piece.O;
      return;
    }

    // Secondary Diagonal
    rowSum = this.board[0][2] + this.board[1][1] + this.board[2][0];
    if (rowSum == X_WINS) {
      this.winner = Piece.X;
      return;
    } else if (rowSum == O_WINS) {
      this.winner = Piece.O;
      return;
    }

    // Empty Square
    rowSum = 0;
    for (let row of this.board) {
      for (let piece of row) {
        if (piece == Piece.Empty) {
          return;
        }
      }
    }

    this.winner = null;
  }

  getWinningTiles(winner: Piece.X | Piece.O) {
    const WIN_SUM = winner + winner + winner;
    let rowSum = 0;

    // Row
    for (let i = 0; i < 3; i++) {
      rowSum = 0;
      for (let j = 0; j < 3; j++) {
        rowSum += this.board[i][j];
      }

      if (rowSum == WIN_SUM) {
        this.winningTiles = [
          [i, 0],
          [i, 1],
          [i, 2],
        ];
        return;
      }
    }

    // Column
    for (let i = 0; i < 3; i++) {
      rowSum = 0;
      for (let j = 0; j < 3; j++) {
        rowSum += this.board[j][i];
      }

      if (rowSum == WIN_SUM) {
        this.winningTiles = [
          [0, i],
          [1, i],
          [2, i],
        ];
        return;
      }
    }

    // Principal Diagonal
    rowSum = 0;
    for (let i = 0; i < 3; i++) {
      rowSum += this.board[i][i];
    }

    if (rowSum == WIN_SUM) {
      this.winningTiles = [
        [0, 0],
        [1, 1],
        [2, 2],
      ];
      return;
    }

    // Secondary Diagonal
    rowSum = this.board[0][2] + this.board[1][1] + this.board[2][0];
    if (rowSum == WIN_SUM) {
      this.winningTiles = [
        [0, 2],
        [1, 1],
        [2, 0],
      ];
    }
  }
}
