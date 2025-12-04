import { Board } from "../../../model/subject/board/board";
import { Cell } from "../../../model/subject/Cell";
import { Stack } from "../../../shared/stack";
import { Set as CellSet } from "../../../shared/set";
import { PathFindingModel } from "../../../model/Interfaces/pathFindingModel";
import { PathFindingController } from "../../../model/subject/algorithms/pathFinding/pathFindingController";
import {
  A_StarModel,
  AStarStepSnapshot,
} from "../../../model/subject/algorithms/pathFinding/aStarModel";
import { DataHelper } from "./dataHelper";
import { PathConfig } from "../../cellDecorations/pathConfig";

/** Helper to create a delay for animation timing */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Data class for the A* pathfinding algorithm.
 */
export class A_StarData extends DataHelper {
  A_StarModel: PathFindingModel | undefined;

  getBoard(): Board {
    return this.A_StarModel?.getBoard() as Board;
  }
  usesHeuristic(): boolean {
    return new A_StarModel().usesHeuristic();
  }
  getAlgorithmName(): string {
    return new A_StarModel().getAlgorithmName() ?? "";
  }

  getCurrentPoints(): Stack<Cell> {
    return this.A_StarModel?.getCurrentPoints() as unknown as Stack<Cell>;
  }
  getData(): any {
    this.A_StarModel = new PathFindingController(
      new A_StarModel(),
      this.ifNull(this.start),
      this.ifNull(this.end),
      this.ifNull(this.board),
      this.walls,
      this.movementStrategy,
      this.huristicModel
    );
    this.A_StarModel?.start();
  }
  getVisited(): CellSet<Cell> {
    return this.A_StarModel?.getVisited() as unknown as CellSet<Cell>;
  }
  getPath(): Array<Cell> {
    return this.A_StarModel?.getPath() as unknown as Array<Cell>;
  }

  /**
   * Async variant that consumes the A* async step generator for incremental updates.
   * @param onStep Callback for each step snapshot
   * @param isAborted Optional function to check if animation should be aborted (skip)
   */
  async getDataAsync(
    onStep?: (snapshot: AStarStepSnapshot) => void,
    isAborted?: () => boolean
  ): Promise<void> {
    this.A_StarModel = new PathFindingController(
      new A_StarModel(),
      this.ifNull(this.start),
      this.ifNull(this.end),
      this.ifNull(this.board),
      this.walls,
      this.movementStrategy,
      this.huristicModel
    );

    const controller = this.A_StarModel as PathFindingController;
    let lastStep: AStarStepSnapshot | null = null;

    for await (const step of controller.asyncSteps()) {
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

    // If we were aborted, still send the final state
    if (isAborted?.() && lastStep && onStep) {
      onStep(lastStep);
    }
  }
}
