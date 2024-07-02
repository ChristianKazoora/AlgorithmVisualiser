import { MovementModel } from "../../model/Interfaces/movementModel";
import { Board } from "../../model/subject/board/board";
import { Point } from "../../shared/point";
import { mainController } from "../interfaces/mainController";
import { AlgorithmController } from "./algorithmController";
import { GridRenderer } from "./gridRenderer";

export interface CellState extends mainController {
  animatePath(): void;
  setBoard(board: Board): void;
  setStart(pos: Point): void;
  setEnd(pos: Point): void;
  removeStart(pos: Point): void;
  removeEnd(pos: Point): void;
  setMovementStrategy(strategy: MovementModel): void;
  setWalls(walls: Array<Point>): void;
  getData(): void;
  setAlgorithmController(algorithmController: AlgorithmController): void;
  // addWalls(pos: Point): void;
  // removeWalls(pos: Point): void;
  addEventListeners(): void;
  setRenderer(renderer: GridRenderer): void;
  ganarateMaze(): void;
  getMovementStrategy(): MovementModel;
  getAlgorithmController(): AlgorithmController;
  getRenderer(): GridRenderer;
  getStart(): Point;
  getEnd(): Point;
}
