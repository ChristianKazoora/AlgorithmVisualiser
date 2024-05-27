import { Point } from "../../../shared/point";
import { MovementModel } from "../../../model/Interfaces/movementModel";
import { Board } from "../../../model/subject/board/board";
import { GetDataController } from "../../interfaces/getDataController";
import { Cell } from "../../../model/subject/Cell";
import { BfsModel } from "../../../model/subject/algorithms/pathFinding/bfsModel";
import { Pathfinding } from "../../../model/subject/algorithms/pathFinding/Pathfinding";
import { Stack } from "../../../shared/stack";
import { PathfindingModel } from "../../../model/Interfaces/pathfindingModel";

export class BfsData implements GetDataController {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  start: Point | undefined;
  end: Point | undefined;
  movementStrategy: MovementModel | undefined;
  walls: Array<Point> | undefined;
  visited: Set<Cell> | undefined;
  path: Array<Cell> | undefined;
  bfsModel: PathfindingModel | undefined;

  setBoard(board: Board): void {
    this.board = board;
  }
  setStart(pos: Point): void {
    this.start = pos;
  }
  setEnd(pos: Point): void {
    this.end = pos;
  }
  setMovementStrategy(strategy: MovementModel): void {
    this.movementStrategy = strategy;
  }
  setWalls(walls: Point[]): void {
    this.walls = walls;
  }
  getBoard(): Board {
    return this.bfsModel?.getBoard() as Board;
  }
  ifNull(object: any) {
    if (object) {
      return object;
    } else {
      throw new Error("object is undefined");
    }
  }
  getCurrentPoints(): Stack<Cell> {
    return this.bfsModel?.getCurrentPoints() as unknown as Stack<Cell>;
  }
  getData(): any {
    this.bfsModel = new Pathfinding(
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
    //todo: implement yeild one by one
    return this.bfsModel?.getVisited() as unknown as Set<Cell>;
  }
  getPath(): Array<Cell> {
    return this.bfsModel?.getPath() as unknown as Array<Cell>;
  }
}
