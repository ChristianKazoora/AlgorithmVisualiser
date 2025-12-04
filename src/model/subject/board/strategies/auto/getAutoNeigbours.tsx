import { MovementModel } from "../../../../Interfaces/movementModel";
import { Cell } from "../../../Cell";
/**
 * GetAutoNeigbour class that implements the MovementModel interface.
 * Only returns neighbors where the wall between cells is DOWN (broken).
 */
export class GetAutoNeigbour implements MovementModel {
  getNeighbours(cell: Cell): Array<Cell> {
    let neighbours: Array<Cell> = [];

    // Only add neighbor if wall is DOWN (false)
    if (cell.top !== undefined && !cell.northW) {
      neighbours.push(cell.top);
    }
    if (cell.bottom !== undefined && !cell.southW) {
      neighbours.push(cell.bottom);
    }
    if (cell.left !== undefined && !cell.westW) {
      neighbours.push(cell.left);
    }
    if (cell.right !== undefined && !cell.eastW) {
      neighbours.push(cell.right);
    }

    // Debug: Log if we're finding no neighbors when we should have some
    if (neighbours.length === 0) {
      console.log(
        `[AutoNeighbour] Cell (${cell.x},${cell.y}) has no passable neighbors. Walls: N=${cell.northW}, S=${cell.southW}, E=${cell.eastW}, W=${cell.westW}`
      );
    }

    return neighbours;
  }
}
