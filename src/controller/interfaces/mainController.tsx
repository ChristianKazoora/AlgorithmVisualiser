import { Point } from "../../shared/point";
import { Board } from "../../model/subject/board/board";
import { MovementModel } from "../../model/Interfaces/movementModel";
import { AlgorithmController } from "./algorithmController";

export interface mainController {
  draw(): any;
  setBoard(board: Board): void;
  setStart(pos: Point): void;
  setEnd(pos: Point): void;
  setMovementStrategy(strategy: MovementModel): void;
  setWalls(walls: Array<Point>): void;
  getData(): void;
}
