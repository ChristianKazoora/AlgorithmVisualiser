import { MazeModel } from "../../../Interfaces/mazeModel";
import { Board } from "../../board/board";
import { MazeAutoMovement } from "../../board/strategies/maze/mazeAutoMovement";
import { Cell } from "../../Cell";
import { Stack } from "../../../../shared/stack";

export class autoMazeGenarator implements MazeModel {
  board: Board | undefined;
  grid: any | undefined;
  visited = new Stack<Cell>();
  stack = new Stack<Cell>();
  movement = new MazeAutoMovement();
  generateMaze(): void {
    let current = this.grid[0][0] as Cell;

    this.visited.push(current);

    do {
      this.movement.setVisited(this.visited);
      let next = this.movement.getNeighbour(current);
      if (next) {
        this.visited.push(next);
        this.stack.push(current);
        this.removeWall(current, next);
        current = next;
      } else {
        current = this.stack.pop() as Cell;
      }
    } while (this.stack.size() !== 0);
  }
  getBoard(): Board {
    return this.ifNull(this.board);
  }
  setBoard(board: Board): void {
    this.board = board;
    this.grid = this.board.grid;
  }
  removeWall(cell: Cell, next: Cell): void {
    if (cell.top == next) {
      cell.northW = false;
      next.southW = false;
    }
    if (cell.bottom == next) {
      cell.southW = false;
      next.northW = false;
    }
    if (cell.left == next) {
      cell.westW = false;
      next.eastW = false;
    }
    if (cell.right == next) {
      cell.eastW = false;
      next.westW = false;
    }
  }
  ifNull(data: any): any {
    if (data) {
      return data;
    } else {
      throw new Error("Method not implemented.");
    }
  }
}
