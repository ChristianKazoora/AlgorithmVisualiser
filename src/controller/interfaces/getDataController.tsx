import { Point } from "../../shared/point";
import { Board } from "../../model/subject/board/board";
import { MovementModel } from "../../model/Interfaces/movementModel";
import { Cell } from "../../model/subject/Cell";
import { Stack } from "../../shared/stack";
import { HuristicModel } from "../../model/Interfaces/huristicModel";

export interface GetDataController {
  setBoard(board: Board): void;
  setStart(pos: Point): void;
  setEnd(pos: Point): void;
  setHuristicModel(huristicModel: HuristicModel): void;
  setMovementStrategy(strategy: MovementModel): void;
  setWalls(walls: Array<Point>): void;
  getBoard(): Board;
  getCurrentPoints(): Stack<Cell>;
  getVisited(): Set<Cell>;
  getPath(): Array<Cell>;
  getData(): void;
}
