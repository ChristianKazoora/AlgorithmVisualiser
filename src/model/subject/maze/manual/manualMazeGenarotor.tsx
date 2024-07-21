import { MazeModel } from "../../../Interfaces/mazeModel";
import { Board } from "../../board/board";
import { Cell } from "../../Cell";
import { Stack } from "../../../../shared/stack";

export class manualMazeGenarotor implements MazeModel {
  getOrderVisited(): Stack<Cell> {
    throw new Error("Method not implemented.");
  }
  board: Board | undefined;
  grid: any | undefined;
  generateMaze(): void {
    throw new Error("Method not implemented.");
  }
  getBoard(): Board {
    return this.ifNull(this.board);
  }
  setBoard(board: Board): void {
    this.board = board;
    this.grid = this.board.grid;
  }
  ifNull(data: any): any {
    if (data) {
      return data;
    } else {
      throw new Error("Method not implemented.");
    }
  }
}
