import { Point } from "framer-motion";
import { Board } from "../../model/subject/board/board";
import { mainController } from "./mainController";
import { MovementModel } from "../../model/Interfaces/movementModel";

export interface AlgorithmController extends mainController {
  setBoard(board: Board): void;
  setStart(pos: Point): void;
  setEnd(pos: Point): void;
  setMovementStrategy(strategy: MovementModel): void;
  setWalls(walls: Array<Point>): void;
  getData(): void;
}