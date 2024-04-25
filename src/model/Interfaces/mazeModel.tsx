import { Board } from "../subject/board";

interface Maze {
  generateMaze(): void;
  getBoard(): Board;
  setBoard(board: Board): void;
}
