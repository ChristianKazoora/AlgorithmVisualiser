import { MovementModel } from "../../../../Interfaces/movementModel";
import { Cell } from "../../../Cell";

export class GetAutoNeigbour implements MovementModel {
  getNeighbours(cell: Cell): Array<Cell> {
    let neighbours: Array<Cell> = [];
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
    return neighbours;
  }
}
