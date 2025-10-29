import { Stack } from "../../shared/stack";
import { Board } from "../subject/board/board";
import { Cell } from "../subject/Cell";
/**
 * Interface representing the model of a Maze in the pathfinding visualizer.
 */
export interface MazeModel {
  /**
   * Generates a new maze.
   */
  generateMaze(): void;
  /**
   * Retrieves the board associated with the maze.
   * @returns The board instance.
   */
  getBoard(): Board;
  /**
   * Sets the board for the maze.
   * @param board - The board to be set.
   */
  setBoard(board: Board): void;
  /**
   * Retrieves the order of cells visited during maze generation.
   * @returns A stack of cells in the order they were visited.
   */
  getOrderVisited(): Stack<Cell>;
}
