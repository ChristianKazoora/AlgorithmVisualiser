import { Cell } from "../../Cell";
import { Queue } from "../../../../shared/queue";
import { MovementModel } from "../../../Interfaces/movementModel";
import { PathFindingHelper } from "./pathFindingHelper";
/**
 * BfsModel class that extends PathFindingHelper to implement the Breadth-First Search algorithm.
 */
export class BfsModel extends PathFindingHelper {
  private movementStrategy: MovementModel | undefined;
  private queue: Queue<Cell> = new Queue<Cell>();
  /**
   * Performs the Breadth-First Search algorithm.
   * @returns void
   */
  bfs(): void {
    let start: Cell = this.ifNull(this.startP);
    this.queue.enqueue(start);
    this.visited.add(start);
    this.currentP.push(start);
    while (!this.queue.isEmpty()) {
      let current: Cell = this.queue.dequeue() as Cell;
      if (current.isEnd) {
        this.visited.add(current);
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
          this.queue.enqueue(neighbours[i]);
          this.visited.add(neighbours[i]);
          neighbours[i].posFromStart = current.posFromStart + 1;
          neighbours[i].previousCell = current;
        }
      }
    }
  }
  getAlgorithmName(): string {
    return "Breadth-First Search";
  }
  start(): void {
    this.resetPrevNext();

    this.bfs();
  }

  setMovementModel(movementModel: MovementModel): void {
    this.movementStrategy = movementModel;
  }
}
