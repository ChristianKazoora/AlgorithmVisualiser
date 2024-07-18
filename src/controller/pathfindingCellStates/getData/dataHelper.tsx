import { Point } from "../../../shared/point";
import { MovementModel } from "../../../model/Interfaces/movementModel";
import { Board } from "../../../model/subject/board/board";
import { GetDataController } from "../../interfaces/getDataController";
import { Cell } from "../../../model/subject/Cell";
import { Stack } from "../../../shared/stack";
import { HuristicModel } from "../../../model/Interfaces/huristicModel";

export abstract class DataHelper implements GetDataController {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  start: Point | undefined;
  end: Point | undefined;
  movementStrategy: MovementModel | undefined;
  walls: Array<Point> | undefined;
  visited: Set<Cell> | undefined;
  path: Array<Cell> | undefined;
  huristicModel: HuristicModel | undefined;

  abstract getBoard(): Board;
  abstract getCurrentPoints(): Stack<Cell>;
  abstract getData(): any;
  abstract getVisited(): Set<Cell>;
  abstract getPath(): Array<Cell>;
  setHuristicModel(huristicModel: HuristicModel): void {
    this.huristicModel = huristicModel;
  }
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
  ifNull(object: any) {
    if (object) {
      return object;
    } else {
      throw new Error("object is undefined");
    }
  }
}
