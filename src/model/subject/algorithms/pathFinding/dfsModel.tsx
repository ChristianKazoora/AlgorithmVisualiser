import { MovementModel } from "../../../Interfaces/movementModel";
import { Cell } from "../../Cell";
import { PathFindingHelper } from "./pathFindingHelper";
/**
 * DfsModel class that extends PathFindingHelper to implement the Depth-First Search algorithm.
 */
export class DfsModel extends PathFindingHelper {
  private movementStrategy: MovementModel | undefined;
  /**
   * Performs the Depth-First Search algorithm.
   * @returns void
   */
  dfs(): void {
    let start: Cell = this.ifNull(this.startP);
    this.visited.add(start);
    this.currentP.push(start);
    this.dfsRecursive(start);
  }
  /**
   * Recursive helper function for DFS.
   * @param current The current cell being explored.
   */
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
  getAlgorithmName(): string {
    return "Depth-First Search";
  }
  start(): void {
    this.resetPrevNext();

    this.dfs();
  }
}
