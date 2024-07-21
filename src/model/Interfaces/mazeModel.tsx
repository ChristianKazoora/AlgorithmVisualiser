import { Stack } from "../../shared/stack";
import { Board } from "../subject/board/board";
import { Cell } from "../subject/Cell";

export interface MazeModel {
  generateMaze(): void;
  getBoard(): Board;
  setBoard(board: Board): void;
  getOrderVisited(): Stack<Cell>;
}
