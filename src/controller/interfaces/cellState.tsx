import { MovementModel } from "../../model/Interfaces/movementModel";
import { Board } from "../../model/subject/board/board";
import { Point } from "../../shared/point";
import { mainController } from "./mainController";
import { AlgorithmController } from "./algorithmController";

export interface CellState extends mainController {
  draw(): JSX.Element[][];
  setAlgorithmController(algorithmController: AlgorithmController): void;
  setBoard(board: Board): void;
  setStart(pos: Point): void;
  setEnd(pos: Point): void;
  setWalls(walls: Array<Point>): void;
  setMovementStrategy(strategy: MovementModel): void;
}
