import { MovementModel } from "../../../Interfaces/movementModel";
import { Cell } from "../../Cell";
import { PathFindingHelper } from "./pathFindingHelper";
import { Set as CellSet } from "../../../../shared/set";

/**
 * Snapshot of a single algorithm step used by async iteration.
 */
export interface AStarStepSnapshot {
  current: Cell | null;
  visited: CellSet<Cell>;
  path: Array<Cell>;
  isComplete: boolean;
}

/**
 * A_StarModel class that extends PathFindingHelper to implement the A* Search algorithm.
 */
export class A_StarModel extends PathFindingHelper {
  private movementStrategy: MovementModel | undefined;

  /**
   * Original synchronous A* implementation used by existing data/controllers.
   */
  aStar(): void {
    const start = this.ifNull(this.startP) as Cell;
    const end = this.ifNull(this.endP) as Cell;
    const movement = this.ifNull(this.movementStrategy) as MovementModel;

    const openSet = new Set<Cell>();
    openSet.add(start);

    while (openSet.size > 0) {
      const current = this.lowestFscore(openSet);
      openSet.delete(current);
      this.ifNull(this.visited).add(current);

      if (current.isEnd) {
        this.path = this.backtrackPath(current);
        return;
      }

      const neighbors = movement.getNeighbours(current) as Cell[];

      for (const neighbor of neighbors) {
        if (neighbor.isWall) {
          continue;
        }

        const tempGScore = current.gScore + 1;

        if (neighbor.gScore >= tempGScore) {
          continue;
        }

        if (openSet.has(neighbor) && neighbor.fScore >= current.fScore) {
          continue;
        }

        if (this.ifNull(this.visited).contains(neighbor)) {
          continue;
        } else {
          neighbor.previousCell = current;
        }

        if (neighbor.previousCell != undefined) {
          neighbor.previousCell.nextCell = undefined;
        }

        neighbor.gScore = tempGScore;
        neighbor.hScore = this.ifNull(this.huristicModel).huristic(
          { x: neighbor.x, y: neighbor.y },
          { x: end.x, y: end.y }
        );
        neighbor.fScore = neighbor.gScore + neighbor.hScore;

        openSet.add(neighbor);
      }
    }
  }

  /**  * Resets the fScore, gScore, and hScore of all cells in the grid.
   */
  resetAllCellFscroreGscoreHscore(): void {
    this.grid?.forEach((row) => {
      row.forEach((cell) => {
        cell.fScore = 0;
        cell.gScore = 0;
        cell.hScore = 0;
      });
    });
  }

  /**
   * Finds the cell in the open set with the lowest fScore.
   * @param openSet The set of cells to search.
   * @returns The cell with the lowest fScore.
   */
  lowestFscore(openSet: Set<Cell>): Cell {
    return Array.from(openSet).reduce((min, point) =>
      point.fScore < min.fScore ? point : min
    );
  }

  setMovementModel(movementModel: MovementModel): void {
    this.movementStrategy = movementModel;
  }
  usesHeuristic(): boolean {
    return true;
  }
  getAlgorithmName(): string {
    return "A* Search";
  }
  /**
   * Async step-wise A* algorithm implementation.
   * Yields a snapshot after each main-loop iteration so callers can visualize progress.
   * A* maintains and yields the "current best path" - reconstructed from the current node.
   */
  async *aStarAsyncSteps(): AsyncGenerator<AStarStepSnapshot, void, void> {
    const start = this.ifNull(this.startP) as Cell;
    const end = this.ifNull(this.endP) as Cell;
    const movement = this.ifNull(this.movementStrategy) as MovementModel;

    const openSet = new Set<Cell>();
    openSet.add(start);

    // Reset state for a fresh run
    this.resetAllCellFscroreGscoreHscore();
    this.visited = new CellSet<Cell>();
    this.path = [];

    while (openSet.size > 0) {
      const current = this.lowestFscore(openSet);
      openSet.delete(current);
      this.ifNull(this.visited).add(current);

      // A* reconstructs current best path from current node each step
      // This shows how the "best path so far" evolves during search
      const currentPath = this.backtrackPath(current);

      if (current.isEnd) {
        this.path = currentPath;
        yield {
          current,
          visited: this.getVisited(),
          path: this.path,
          isComplete: true,
        };
        return;
      }

      const neighbors = movement.getNeighbours(current) as Cell[];

      for (const neighbor of neighbors) {
        if (neighbor.isWall) continue;

        const tempGScore = current.gScore + 1;
        if (neighbor.gScore >= tempGScore) continue;

        if (openSet.has(neighbor) && neighbor.fScore >= current.fScore) {
          continue;
        }

        if (this.ifNull(this.visited).contains(neighbor)) {
          continue;
        } else {
          neighbor.previousCell = current;
        }

        if (neighbor.previousCell != undefined) {
          neighbor.previousCell.nextCell = undefined;
        }

        neighbor.gScore = tempGScore;
        neighbor.hScore = this.ifNull(this.huristicModel).huristic(
          { x: neighbor.x, y: neighbor.y },
          { x: end.x, y: end.y }
        );
        neighbor.fScore = neighbor.gScore + neighbor.hScore;

        openSet.add(neighbor);
      }

      // Yield current state with evolving "best path so far"
      yield {
        current,
        visited: this.getVisited(),
        path: currentPath,
        isComplete: false,
      };
      await Promise.resolve();
    }
  }
  start(): void {
    this.resetPrevNext();
    this.resetHuristicVars();
    this.resetAllCellFscroreGscoreHscore();
    this.aStar();
  }
}
