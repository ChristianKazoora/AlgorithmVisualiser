import { Point } from "../../../shared/point";
import { Cell } from "../Cell";

export class Board {
  board: Array<Array<Cell>>;

  constructor(size: Point) {
    const row = size.x;
    const col = size.y;
    this.board = new Array(row);
    for (let i = 0; i < row; i++) {
      this.board[i] = new Array(col);
    }
    this.initializeBoard(row, col);
    this.settingNeighbors();
  }

  initializeBoard(row: number, col: number): void {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        this.board[i][j] = new Cell(
          false, // isWall
          false, // isStart
          false, // isEnd
          undefined,
          i, // x
          j, // y
          undefined, // previousCell
          undefined, // nextCell
          undefined, // top
          undefined, // bottom
          undefined, // left
          undefined, // right
          undefined, // topRight
          undefined, // topLeft
          undefined, // bottomLeft
          undefined, // bottomRight
          false, // northW
          false, // southW
          false, // westW
          false // eastW
        );
      }
    }
  }

  settingNeighbors(): void {
    const row = this.board.length;
    const col = this.board[0].length;

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (i > 0) {
          this.board[i][j].top = this.board[i - 1][j];
        }
        if (i < row - 1) {
          this.board[i][j].bottom = this.board[i + 1][j];
        }
        if (j > 0) {
          this.board[i][j].left = this.board[i][j - 1];
        }
        if (j < col - 1) {
          this.board[i][j].right = this.board[i][j + 1];
        }
        if (i > 0 && j > 0) {
          this.board[i][j].topLeft = this.board[i - 1][j - 1];
        }
        if (i > 0 && j < col - 1) {
          this.board[i][j].topRight = this.board[i - 1][j + 1];
        }
        if (i < row - 1 && j > 0) {
          this.board[i][j].bottomLeft = this.board[i + 1][j - 1];
        }
        if (i < row - 1 && j < col - 1) {
          this.board[i][j].bottomRight = this.board[i + 1][j + 1];
        }
      }
    }
  }
}
