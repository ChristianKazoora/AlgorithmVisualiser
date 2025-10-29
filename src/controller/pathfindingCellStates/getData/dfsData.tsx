import { Board } from "../../../model/subject/board/board";
import { Cell } from "../../../model/subject/Cell";
import { DfsModel } from "../../../model/subject/algorithms/pathFinding/dfsModel";
import { PathFindingController } from "../../../model/subject/algorithms/pathFinding/pathFindingController";
import { Stack } from "../../../shared/stack";
import { PathFindingModel } from "../../../model/Interfaces/pathFindingModel";
import { DataHelper } from "./dataHelper";

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
  getVisited(): Set<Cell> {
    //todo: implement yeild one by one
    return this.dfsModel?.getVisited() as unknown as Set<Cell>;
  }
  getPath(): Array<Cell> {
    return this.dfsModel?.getPath() as unknown as Array<Cell>;
  }
  getAlgorithmName(): string {
    return new DfsModel().getAlgorithmName();
  }
}
