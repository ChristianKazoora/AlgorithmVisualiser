import { Point } from "framer-motion";
import { MovementModel } from "../../../../../model/Interfaces/movementModel";
import { Board } from "../../../../../model/subject/board/board";
import { AlgorithmController } from "../../../../interfaces/algorithmController";
import { GridRenderer } from "../../../../interfaces/gridRenderer";

export class DfsController implements AlgorithmController {
  getMovementStrategy(): MovementModel {
    throw new Error("Method not implemented.");
  }
  animatePath(): void {
    throw new Error("Method not implemented.");
  }
  setBoard(board: Board): void {
    throw new Error("Method not implemented.");
  }
  setStart(pos: Point): void {
    throw new Error("Method not implemented.");
  }
  removeStart(pos: Point): void {
    throw new Error("Method not implemented.");
  }
  removeEnd(pos: Point): void {
    throw new Error("Method not implemented.");
  }
  setEnd(pos: Point): void {
    throw new Error("Method not implemented.");
  }
  setMovementStrategy(strategy: MovementModel): void {
    throw new Error("Method not implemented.");
  }
  setWalls(walls: Point[]): void {
    throw new Error("Method not implemented.");
  }
  getData(): void {
    throw new Error("Method not implemented.");
  }
  reRenderCss(): void {
    throw new Error("Method not implemented.");
  }
  setGridWallsToFalse(): void {
    throw new Error("Method not implemented.");
  }
  setRenderer(renderer: GridRenderer): void {
    throw new Error("Method not implemented.");
  }
  draw() {
    throw new Error("Method not implemented.");
  }
}
