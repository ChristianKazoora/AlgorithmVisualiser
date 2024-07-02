import { Board } from "../../model/subject/board/board";
import { mainController } from "./mainController";
import { MovementModel } from "../../model/Interfaces/movementModel";
import { GridRenderer } from "./gridRenderer";
import { Point } from "../../shared/point";

export interface AlgorithmController extends mainController {
  animatePath(): void;
  setBoard(board: Board): void;
  setStart(pos: Point): void;
  removeStart(pos: Point): void;
  removeEnd(pos: Point): void;
  setEnd(pos: Point): void;
  setMovementStrategy(strategy: MovementModel): void;
  getMovementStrategy(): MovementModel;
  setWalls(walls: Array<Point>): void;
  getData(): void;
  reRenderCss(): void;
  setGridWallsToFalse(): void;
  setRenderer(renderer: GridRenderer): void;
  getRenderer(): GridRenderer;
}
