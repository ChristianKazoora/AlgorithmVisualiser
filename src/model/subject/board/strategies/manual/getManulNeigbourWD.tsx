import { MovementModel } from "../../../../Interfaces/movementModel";
import { Cell } from "../../../Cell";

export class GetManulNeigbourWD implements MovementModel {
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
    if (cell.topLeft !== undefined && !cell.topLeft.isWall) {
      neighbours.push(cell.topLeft);
    }
    if (cell.topRight !== undefined && !cell.topRight.isWall) {
      neighbours.push(cell.topRight);
    }
    if (cell.bottomLeft !== undefined && !cell.bottomLeft.isWall) {
      neighbours.push(cell.bottomLeft);
    }
    if (cell.bottomRight !== undefined && !cell.bottomRight.isWall) {
      neighbours.push(cell.bottomRight);
    }
    return neighbours;
  }
}
