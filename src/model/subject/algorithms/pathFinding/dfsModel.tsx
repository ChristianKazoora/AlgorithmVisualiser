import { MovementModel } from "../../../Interfaces/movementModel";
import { Cell } from "../../Cell";
import { PathFindingHelper } from "./pathFindingHelper";
import { AStarStepSnapshot } from "./aStarModel";
import { Set as CellSet } from "../../../../shared/set";
import { Stack } from "../../../../shared/stack";

/**
 * Per-step snapshot for DFS, reusing the same shape as A* snapshots where possible.
 */
export interface DfsStepSnapshot extends AStarStepSnapshot {}

/**
 * DfsModel class that extends PathFindingHelper to implement the Depth-First Search algorithm.
 */
export class DfsModel extends PathFindingHelper {
  private movementStrategy: MovementModel | undefined;

  /**
   * Performs the Depth-First Search algorithm synchronously.
   * @returns void
   */
  dfs(): void {
    const start: Cell = this.ifNull(this.startP);
    this.visited = new CellSet<Cell>();
    this.path = [];
    this.currentP = new Stack<Cell>();

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
      this.path = this.backtrackPath(current);
      return;
    } else if (current.isWall) {
      return;
    }
    const neighbours: Array<Cell> = this.ifNull(
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

  /**
   * Async step-wise DFS implementation using an explicit stack.
   * DFS path = current exploration branch (backtracked from current node).
   * The path grows/shrinks as DFS explores and backtracks.
   */
  async *dfsAsyncSteps(): AsyncGenerator<DfsStepSnapshot, void, void> {
    const start: Cell = this.ifNull(this.startP);
    const movement = this.ifNull(this.movementStrategy) as MovementModel;

    const stack = new Stack<Cell>();
    this.visited = new CellSet<Cell>();
    this.path = [];
    this.currentP = stack;

    stack.push(start);
    this.visited.add(start);

    while (!stack.isEmpty()) {
      const current = stack.pop() as Cell;

      // DFS: the "path" is the current exploration branch
      // Reconstruct it by backtracking from current node
      const currentBranch = this.backtrackPath(current);

      if (current.isEnd) {
        this.path = currentBranch;
        yield {
          current,
          visited: this.getVisited(),
          path: this.path,
          isComplete: true,
        };
        return;
      } else if (current.isWall) {
        continue;
      }

      const neighbours: Array<Cell> = movement.getNeighbours(current);
      for (let i = 0; i < neighbours.length; i++) {
        const neighbour = neighbours[i];
        if (!this.visited.contains(neighbour) && !neighbour.isWall) {
          this.visited.add(neighbour);
          neighbour.previousCell = current;
          stack.push(neighbour);
        }
      }

      // Yield with current exploration branch as path
      yield {
        current,
        visited: this.getVisited(),
        path: currentBranch,
        isComplete: false,
      };
      await Promise.resolve();
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
