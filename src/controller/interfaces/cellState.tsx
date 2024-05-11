import { Point } from "framer-motion";
import { MovementModel } from "../../model/Interfaces/movementModel";
import { Board } from "../../model/subject/board/board";
import { mainController } from "../interfaces/mainController";
import { AlgorithmController } from "./algorithmController";

export interface CellState extends mainController {
  setBoard(board: Board): void;
  setStart(pos: Point): void;
  setEnd(pos: Point): void;
  setMovementStrategy(strategy: MovementModel): void;
  setWalls(walls: Array<Point>): void;
  getData(): void;
  setAlgorithmController(algorithmController: AlgorithmController): void;
}
