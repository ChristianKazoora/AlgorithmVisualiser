import { Cell } from "./Cell";

export class Board {
  board: Array<Array<Cell>>;

  constructor(size: number) {
    this.board = new Array(size);
    for (let i = 0; i < size; i++) {
      this.board[i] = new Array(size);
    }
    this.initializeBoard(size);
    this.settingNeighbors();
  }

  initializeBoard(size: number): void {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.board[i][j] = new Cell(
          i * size + j,
          i,
          j,
          undefined, //top
          undefined, //bottom
          undefined, //left
          undefined, //right
          undefined, //topRight
          undefined, //topLeft
          undefined, //bottomLeft
          undefined //bottomRight
        );
      }
    }
  }
  settingNeighbors(): void {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (i > 0) {
          this.board[i][j].top = this.board[i - 1][j];
        }
        if (i < this.board.length - 1) {
          this.board[i][j].bottom = this.board[i + 1][j];
        }
        if (j > 0) {
          this.board[i][j].left = this.board[i][j - 1];
        }
        if (j < this.board[i].length - 1) {
          this.board[i][j].right = this.board[i][j + 1];
        }
        if (i > 0 && j > 0) {
          this.board[i][j].topLeft = this.board[i - 1][j - 1];
        }
        if (i > 0 && j < this.board[i].length - 1) {
          this.board[i][j].topRight = this.board[i - 1][j + 1];
        }
        if (i < this.board.length - 1 && j > 0) {
          this.board[i][j].bottomLeft = this.board[i + 1][j - 1];
        }
        if (i < this.board.length - 1 && j < this.board[i].length - 1) {
          this.board[i][j].bottomRight = this.board[i + 1][j + 1];
        }
      }
    }
  }
  getNeighbours(cell: Cell): Array<Cell> {
    let neighbours: Array<Cell> = [];
    if (cell.top !== undefined && !cell.top.isWall) {
      neighbours.push(cell.top);
    }
    if (cell.bottom !== undefined && !cell.bottom.isWall) {
      neighbours.push(cell.bottom);
    }
    if (cell.left !== undefined && !cell.left.isWall) {
      neighbours.push(cell.left);
    }
    if (cell.right !== undefined && !cell.right.isWall) {
      neighbours.push(cell.right);
    }
    return neighbours;
  }
  getNeighboursDiagonal(cell: Cell): Array<Cell> {
    let neighbours: Array<Cell> = this.getNeighbours(cell);
    if (cell.topLeft !== undefined && !cell.topLeft.isWall) {
      neighbours.push(cell.topLeft);
    }
    if (cell.topRight !== undefined && !cell.topRight.isWall) {
      neighbours.push(cell.topRight);
    }
    if (cell.bottomLeft !== undefined && !cell.bottomLeft.isWall) {
      neighbours.push(cell.bottomLeft);
    }
    if (cell.bottomRight !== undefined && !cell.bottomRight.isWall) {
      neighbours.push(cell.bottomRight);
    }
    return neighbours;
  }
}
