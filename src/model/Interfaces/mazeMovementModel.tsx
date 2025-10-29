import { Stack } from "../../shared/stack";
import { Cell } from "../subject/Cell";

/**
 * Interface representing the movement model used in maze generation.
 */
export interface MazeMovementModel {
  /**
   * Retrieves the neighboring cell of the given cell.
   * @param cell The cell for which to find the neighbor.
   * @returns The neighboring cells or null if none found.
   */
  getNeighbour(cell: any): Cell | null;
  /**
   * Sets the visited cells stack.
   * @param cell The stack of visited cells to set.
   */
  setVisited(cell: Stack<Cell>): void;
}
