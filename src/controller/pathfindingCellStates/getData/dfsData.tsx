import { Board } from "../../../model/subject/board/board";
import { Cell } from "../../../model/subject/Cell";
import {
  DfsModel,
  DfsStepSnapshot,
} from "../../../model/subject/algorithms/pathFinding/dfsModel";
import { PathFindingController } from "../../../model/subject/algorithms/pathFinding/pathFindingController";
import { Stack } from "../../../shared/stack";
import { Set as CellSet } from "../../../shared/set";
import { PathFindingModel } from "../../../model/Interfaces/pathFindingModel";
import { DataHelper } from "./dataHelper";
import { PathConfig } from "../../cellDecorations/pathConfig";

/** Helper to create a delay for animation timing */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Data class for the DFS pathfinding algorithm.
 */
export class DfsData extends DataHelper {
  dfsModel: PathFindingModel | undefined;

  getBoard(): Board {
    return this.dfsModel?.getBoard() as Board;
  }

  usesHeuristic(): boolean {
    return new DfsModel().usesHeuristic();
  }
  getCurrentPoints(): Stack<Cell> {
    return this.dfsModel?.getCurrentPoints() as unknown as Stack<Cell>;
  }
  getData(): any {
    this.dfsModel = new PathFindingController(
      new DfsModel(),
      this.ifNull(this.start),
      this.ifNull(this.end),
      this.ifNull(this.board),
      this.walls,
      this.movementStrategy
    );
    this.dfsModel?.start();
  }
  getVisited(): CellSet<Cell> {
    //todo: implement yeild one by one
    return this.dfsModel?.getVisited() as unknown as CellSet<Cell>;
  }
  getPath(): Array<Cell> {
    return this.dfsModel?.getPath() as unknown as Array<Cell>;
  }
  getAlgorithmName(): string {
    return new DfsModel().getAlgorithmName();
  }

  /**
   * Async variant that consumes the DFS async step generator for incremental updates.
   * @param onStep Callback for each step snapshot
   * @param isAborted Optional function to check if animation should be aborted (skip)
   */
  async getDataAsync(
    onStep?: (snapshot: DfsStepSnapshot) => void,
    isAborted?: () => boolean
  ): Promise<void> {
    this.dfsModel = new PathFindingController(
      new DfsModel(),
      this.ifNull(this.start),
      this.ifNull(this.end),
      this.ifNull(this.board),
      this.walls,
      this.movementStrategy
    );

    const controller = this.dfsModel as PathFindingController;
    let lastStep: DfsStepSnapshot | null = null;

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
