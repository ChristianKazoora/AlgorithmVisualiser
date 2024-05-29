import { Stack } from "../../../../../shared/stack";
import { MazeMovementModel } from "../../../../Interfaces/mazeMovementModel";
import { MovementModel } from "../../../../Interfaces/movementModel";
import { Cell } from "../../../Cell";

export class MazeAutoMovement implements MazeMovementModel {
  visited = new Stack<Cell>();

  setVisited(cells: Stack<Cell>): void {
    this.visited = cells;
  }

  getNeighbour(cell: Cell): any {
    let neighbours: Cell[] = [];

    let top = cell.top;
    let bottom = cell.bottom;
    let left = cell.left;
    let right = cell.right;

    if (top && !this.visited.includes(top)) {
      neighbours.push(top);
    }
    if (bottom && !this.visited.includes(bottom)) {
      neighbours.push(bottom);
    }
    if (left && !this.visited.includes(left)) {
      neighbours.push(left);
    }
    if (right && !this.visited.includes(right)) {
      neighbours.push(right);
    }

    if (neighbours.length > 0) {
      let r = Math.floor(Math.random() * neighbours.length);
      return neighbours[r];
    }

    return null;
  }
}
