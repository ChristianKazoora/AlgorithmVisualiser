import { MovementModel } from "../../../../Interfaces/movementModel";
import { Cell } from "../../../Cell";

export class GetManulNeighbours implements MovementModel {
  getNeighbours(cell: Cell): Array<Cell> {
    let neighbours: Array<Cell> = [];
    if (cell.top !== undefined && !cell.top.isWall) {
      neighbours.push(cell.top);
    }
    if (cell.bottom !== undefined && !cell.bottom.isWall) {
      neighbours.push(cell.bottom);
    }
    if (cell.left !== undefined && !cell.left.isWall) {
      neighbours.push(cell.left);
    }
    if (cell.right !== undefined && !cell.right.isWall) {
      neighbours.push(cell.right);
    }
    return neighbours;
  }
}
