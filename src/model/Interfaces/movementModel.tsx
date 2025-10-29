import { Cell } from "../subject/Cell";
/**
 * Interface for Movement Models used to determine neighboring cells.
 */
export interface MovementModel {
  /**
   * Gets the neighboring cells of a given cell.
   * @param cell The cell for which to get neighbors.
   * @returns An array of neighboring cells.
   */
  getNeighbours(cell: Cell): Array<Cell>;
}
