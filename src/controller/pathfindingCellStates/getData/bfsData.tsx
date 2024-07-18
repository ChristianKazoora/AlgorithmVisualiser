import { Board } from "../../../model/subject/board/board";
import { Cell } from "../../../model/subject/Cell";
import { BfsModel } from "../../../model/subject/algorithms/pathFinding/bfsModel";
import { Stack } from "../../../shared/stack";
import { PathFindingModel } from "../../../model/Interfaces/pathfindingModel";
import { DataHelper } from "./dataHelper";
import { PathFindingController } from "../../../model/subject/algorithms/pathFinding/pathFindingController";

export class BfsData extends DataHelper {
  bfsModel: PathFindingModel | undefined;
  getBoard(): Board {
    return this.bfsModel?.getBoard() as Board;
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
  getVisited(): Set<Cell> {
    return this.bfsModel?.getVisited() as unknown as Set<Cell>;
  }
  getPath(): Array<Cell> {
    return this.bfsModel?.getPath() as unknown as Array<Cell>;
  }
}
