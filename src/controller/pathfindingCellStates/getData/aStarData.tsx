import { Board } from "../../../model/subject/board/board";
import { Cell } from "../../../model/subject/Cell";
import { Stack } from "../../../shared/stack";
import { PathFindingModel } from "../../../model/Interfaces/pathFindingModel";
import { PathFindingController } from "../../../model/subject/algorithms/pathFinding/pathFindingController";
import { A_StarModel } from "../../../model/subject/algorithms/pathFinding/aStarModel";
import { DataHelper } from "./dataHelper";

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
  getVisited(): Set<Cell> {
    return this.A_StarModel?.getVisited() as unknown as Set<Cell>;
  }
  getPath(): Array<Cell> {
    return this.A_StarModel?.getPath() as unknown as Array<Cell>;
  }
}
