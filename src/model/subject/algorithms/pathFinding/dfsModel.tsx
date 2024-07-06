import { MovementModel } from "../../../Interfaces/movementModel";
import { Cell } from "../../Cell";
import { PathFindingHelper } from "./pathFindingHelper";

export class DfsModel extends PathFindingHelper {
  private movementStrategy: MovementModel | undefined;

  dfs(): void {
    let start: Cell = this.ifNull(this.startP);
    this.visited.add(start);
    this.currentP.push(start);
    this.dfsRecursive(start);
  }
  dfsRecursive(current: Cell): void {
    if (current.isEnd) {
      this.path = new Array<Cell>();
      this.path = this.backtrackPath(current);
      return;
    } else if (current.isWall) {
      return;
    }
    let neighbours: Array<Cell> = this.ifNull(
      this.movementStrategy
    ).getNeighbours(current);
    for (let i = 0; i < neighbours.length; i++) {
      if (!this.visited.contains(neighbours[i])) {
        this.visited.add(neighbours[i]);
        neighbours[i].previousCell = current;
        this.dfsRecursive(neighbours[i]);
      }
    }
  }
  setMovementModel(movementModel: MovementModel): void {
    this.movementStrategy = movementModel;
  }
  start(): void {
    this.dfs();
  }
}
