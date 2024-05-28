import { Board } from "../subject/board/board";

export interface MazeModel {
  generateMaze(): void;
  getBoard(): Board;
  setBoard(board: Board): void;
}
