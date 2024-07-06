import { Board } from "../../../model/subject/board/board";
import { Cell } from "../../../model/subject/Cell";
import { DfsModel } from "../../../model/subject/algorithms/pathFinding/dfsModel";
import { PathFindingController } from "../../../model/subject/algorithms/pathFinding/pathFindingController";
import { Stack } from "../../../shared/stack";
import { PathFindingModel } from "../../../model/Interfaces/pathfindingModel";
import { DataHelper } from "./dataHelper";

export class DfsData extends DataHelper {
  bfsModel: PathFindingModel | undefined;

  getBoard(): Board {
    return this.bfsModel?.getBoard() as Board;
  }

  getCurrentPoints(): Stack<Cell> {
    return this.bfsModel?.getCurrentPoints() as unknown as Stack<Cell>;
  }
  getData(): any {
    this.bfsModel = new PathFindingController(
      new DfsModel(),
      this.ifNull(this.start),
      this.ifNull(this.end),
      this.ifNull(this.board),
      this.walls,
      this.movementStrategy
    );
    this.bfsModel?.start();
  }
  getVisited(): Set<Cell> {
    //todo: implement yeild one by one
    return this.bfsModel?.getVisited() as unknown as Set<Cell>;
  }
  getPath(): Array<Cell> {
    return this.bfsModel?.getPath() as unknown as Array<Cell>;
  }
}
