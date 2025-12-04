import { Board } from "../../../model/subject/board/board";
import { Cell } from "../../../model/subject/Cell";
import {
  BfsModel,
  BfsStepSnapshot,
} from "../../../model/subject/algorithms/pathFinding/bfsModel";
import { Stack } from "../../../shared/stack";
import { Set as CellSet } from "../../../shared/set";
import { PathFindingModel } from "../../../model/Interfaces/pathFindingModel";
import { DataHelper } from "./dataHelper";
import { PathFindingController } from "../../../model/subject/algorithms/pathFinding/pathFindingController";
import { PathConfig } from "../../cellDecorations/pathConfig";

/** Helper to create a delay for animation timing */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Data class for the BFS pathfinding algorithm.
 */
export class BfsData extends DataHelper {
  bfsModel: PathFindingModel | undefined;
  getBoard(): Board {
    return this.bfsModel?.getBoard() as Board;
  }
  usesHeuristic(): boolean {
    return new BfsModel().usesHeuristic();
  }

  getAlgorithmName(): string {
    return new BfsModel().getAlgorithmName();
  }

  getCurrentPoints(): Stack<Cell> {
    return this.bfsModel?.getCurrentPoints() as unknown as Stack<Cell>;
  }
  getData(): any {
    this.bfsModel = new PathFindingController(
      new BfsModel(),
      this.ifNull(this.start),
      this.ifNull(this.end),
      this.ifNull(this.board),
      this.walls,
      this.movementStrategy
    );
    this.bfsModel?.start();
  }
  getVisited(): CellSet<Cell> {
    return this.bfsModel?.getVisited() as unknown as CellSet<Cell>;
  }
  getPath(): Array<Cell> {
    return this.bfsModel?.getPath() as unknown as Array<Cell>;
  }

  /**
   * Async variant that consumes the BFS async step generator for incremental updates.
   * @param onStep Callback for each step snapshot
   * @param isAborted Optional function to check if animation should be aborted (skip)
   */
  async getDataAsync(
    onStep?: (snapshot: BfsStepSnapshot) => void,
    isAborted?: () => boolean
  ): Promise<void> {
    this.bfsModel = new PathFindingController(
      new BfsModel(),
      this.ifNull(this.start),
      this.ifNull(this.end),
      this.ifNull(this.board),
      this.walls,
      this.movementStrategy
    );

    console.log(
      "[BFS Async] Starting with strategy:",
      this.movementStrategy?.constructor.name
    );
    console.log("[BFS Async] Start:", this.start, "End:", this.end);

    const controller = this.bfsModel as PathFindingController;
    let lastStep: BfsStepSnapshot | null = null;
    let stepCount = 0;

    for await (const step of controller.asyncSteps()) {
      stepCount++;
      lastStep = step;

      // Check if animation was aborted (user clicked skip)
      if (isAborted?.()) {
        // Continue iterating without delay to get final state
        continue;
      }

      if (onStep) {
        onStep(step);
      }
      // Add delay between steps for visible animation
      await delay(PathConfig.ANIMATION.STEP_DELAY);
    }

    console.log(
      "[BFS Async] Completed with",
      stepCount,
      "steps. Path length:",
      lastStep?.path?.length ?? 0
    );

    // If we were aborted, still send the final state
    if (isAborted?.() && lastStep && onStep) {
      onStep(lastStep);
    }
  }
}
