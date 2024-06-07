import { Point } from "../../../shared/point";
import { Cell } from "../Cell";

export class Board {
  public grid: Array<Array<Cell>>;

  constructor(size: Point) {
    const row = size.y;
    const col = size.x;
    this.grid = new Array(row);
    for (let i = 0; i < row; i++) {
      this.grid[i] = new Array(col);
    }
    this.initializeBoard(row, col);
    this.settingNeighbors();
  }
  private initializeBoard(row: number, col: number): void {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        this.grid[i][j] = new Cell(
          false, // isWall
          false, // isStart
          false, // isEnd
          undefined,
          i, // x
          j, // y
          i * col + j, // pos
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
          true, // northW
          true, // southW
          true, // westW
          true // eastW
        );
      }
    }
  }

  private settingNeighbors(): void {
    const row = this.grid.length;
    const col = this.grid[0].length;

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (i > 0) {
          this.grid[i][j].top = this.grid[i - 1][j];
        }
        if (i < row - 1) {
          this.grid[i][j].bottom = this.grid[i + 1][j];
        }
        if (j > 0) {
          this.grid[i][j].left = this.grid[i][j - 1];
        }
        if (j < col - 1) {
          this.grid[i][j].right = this.grid[i][j + 1];
        }
        if (i > 0 && j > 0) {
          this.grid[i][j].topLeft = this.grid[i - 1][j - 1];
        }
        if (i > 0 && j < col - 1) {
          this.grid[i][j].topRight = this.grid[i - 1][j + 1];
        }
        if (i < row - 1 && j > 0) {
          this.grid[i][j].bottomLeft = this.grid[i + 1][j - 1];
        }
        if (i < row - 1 && j < col - 1) {
          this.grid[i][j].bottomRight = this.grid[i + 1][j + 1];
        }
      }
    }
  }
}
