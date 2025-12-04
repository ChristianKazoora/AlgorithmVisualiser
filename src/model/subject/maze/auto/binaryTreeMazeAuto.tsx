import { MazeModel } from "../../../Interfaces/mazeModel";
import { Board } from "../../board/board";
import { Cell } from "../../Cell";
import { Stack } from "../../../../shared/stack";

/**
 * Binary Tree maze generator for auto mode.
 *
 * Algorithm:
 * For each cell, randomly carve a passage either North or West.
 * - Cells on the top row can only carve West
 * - Cells on the left column can only carve North
 * - Corner cell (0,0) has no walls to remove
 *
 * Produces mazes with a distinct diagonal bias (NW to SE corridor tendency).
 * Very fast O(n) algorithm - visits each cell exactly once.
 */
export class BinaryTreeMazeAuto implements MazeModel {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  orderOfVisited = new Stack<Cell>();

  generateMaze(): void {
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;

    // Process each cell
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.grid![i][j];
        const canGoNorth = i > 0;
        const canGoWest = j > 0;

        if (canGoNorth && canGoWest) {
          // Randomly choose North or West
          if (Math.random() < 0.5) {
            this.carveNorth(cell);
          } else {
            this.carveWest(cell);
          }
        } else if (canGoNorth) {
          // Top row (except corner) - can only go North
          this.carveNorth(cell);
        } else if (canGoWest) {
          // Left column (except corner) - can only go West
          this.carveWest(cell);
        }
        // Corner cell (0,0) - no walls to remove, but still record visit

        this.orderOfVisited.push(cell);
      }
    }
  }

  /**
   * Carve passage to the North (remove wall between this cell and top neighbor)
   */
  private carveNorth(cell: Cell): void {
    const topNeighbor = cell.top;
    if (topNeighbor) {
      cell.northW = false;
      topNeighbor.southW = false;
    }
  }

  /**
   * Carve passage to the West (remove wall between this cell and left neighbor)
   */
  private carveWest(cell: Cell): void {
    const leftNeighbor = cell.left;
    if (leftNeighbor) {
      cell.westW = false;
      leftNeighbor.eastW = false;
    }
  }

  getOrderVisited(): Stack<Cell> {
    return this.orderOfVisited;
  }

  getBoard(): Board {
    return this.ifNull(this.board);
  }

  setBoard(board: Board): void {
    this.board = board;
    this.grid = board.grid;
  }

  ifNull(data: any): any {
    if (data) {
      return data;
    } else {
      throw new Error("Data is null or undefined");
    }
  }
}
