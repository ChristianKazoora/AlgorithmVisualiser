import { Cell } from "../../Cell";
import { Queue } from "../../../../shared/queue";
import { MovementModel } from "../../../Interfaces/movementModel";
import { PathFindingHelper } from "./pathFindingHelper";
import { AStarStepSnapshot } from "./aStarModel";
import { Set as CellSet } from "../../../../shared/set";

/**
 * Per-step snapshot for BFS, reusing the same shape as A* snapshots where possible.
 */
export interface BfsStepSnapshot extends AStarStepSnapshot {}

/**
 * BfsModel class that extends PathFindingHelper to implement the Breadth-First Search algorithm.
 */
export class BfsModel extends PathFindingHelper {
  private movementStrategy: MovementModel | undefined;
  private queue: Queue<Cell> = new Queue<Cell>();

  /**
   * Performs the Breadth-First Search algorithm synchronously.
   * @returns void
   */
  bfs(): void {
    const start: Cell = this.ifNull(this.startP);
    this.queue = new Queue<Cell>();
    this.visited = new CellSet<Cell>();
    this.path = [];

    this.queue.enqueue(start);
    this.visited.add(start);
    this.currentP.push(start);
    while (!this.queue.isEmpty()) {
      const current: Cell = this.queue.dequeue() as Cell;
      if (current.isEnd) {
        this.visited.add(current);
        this.path = this.backtrackPath(current);
        return;
      } else if (current.isWall) {
        continue;
      }
      const neighbours: Array<Cell> = this.ifNull(
        this.movementStrategy
      ).getNeighbours(current);
      for (let i = 0; i < neighbours.length; i++) {
        if (!this.visited.contains(neighbours[i]) && !neighbours[i].isWall) {
          this.queue.enqueue(neighbours[i]);
          this.visited.add(neighbours[i]);
          neighbours[i].posFromStart = current.posFromStart + 1;
          neighbours[i].previousCell = current;
        }
      }
    }
  }

  /**
   * Async step-wise BFS implementation.
   * BFS does NOT have a "current path" during search - it explores level by level.
   * The path is only reconstructed when the goal is found.
   * During search, we yield an empty path (true to BFS behavior).
   */
  async *bfsAsyncSteps(): AsyncGenerator<BfsStepSnapshot, void, void> {
    const start: Cell = this.ifNull(this.startP);
    this.queue = new Queue<Cell>();
    this.visited = new CellSet<Cell>();
    this.path = [];

    this.queue.enqueue(start);
    this.visited.add(start);
    this.currentP.push(start);

    while (!this.queue.isEmpty()) {
      const current: Cell = this.queue.dequeue() as Cell;

      // Skip walls
      if (current.isWall) {
        continue;
      }

      // Yield current step BEFORE checking if it's the end
      // This shows the algorithm exploring the current cell
      if (!current.isStart) {
        yield {
          current,
          visited: this.getVisited(),
          path: [], // Empty path - BFS doesn't have a "current path" concept
          isComplete: false,
        };
        await Promise.resolve();
      }

      // Check if we found the goal AFTER yielding the step
      if (current.isEnd) {
        this.path = this.backtrackPath(current);
        yield {
          current,
          visited: this.getVisited(),
          path: this.getPath(), // Path only exists when goal is found
          isComplete: true,
        };
        return;
      }

      const neighbours: Array<Cell> = this.ifNull(
        this.movementStrategy
      ).getNeighbours(current);
      for (let i = 0; i < neighbours.length; i++) {
        const neighbour = neighbours[i];
        if (!this.visited.contains(neighbour) && !neighbour.isWall) {
          this.queue.enqueue(neighbour);
          this.visited.add(neighbour);
          neighbour.posFromStart = current.posFromStart + 1;
          neighbour.previousCell = current;
        }
      }
    }

    // No path found - yield final state
    yield {
      current: null,
      visited: this.getVisited(),
      path: [],
      isComplete: true,
    };
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
