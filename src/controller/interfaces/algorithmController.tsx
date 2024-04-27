import { MovementModel } from "../../model/Interfaces/movementModel";
import { Point } from "../../shared/point";
import { mainController } from "./mainController";

export interface AlgorithmController extends mainController {
  setBoard(board: any): void;
  setStart(pos: Point): void;
  setEnd(pos: Point): void;
  setMovementStrategy(strategy: MovementModel): void;
  setWalls(walls: Array<Point>): void;
  getData(): void;
}
