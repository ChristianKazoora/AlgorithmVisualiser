import { Point } from "framer-motion";
import { MovementModel } from "../../../model/Interfaces/movementModel";
import { Board } from "../../../model/subject/board/board";
import { AlgorithmController } from "../../interfaces/algorithmController";
import { CellState } from "../../interfaces/cellState";
import { Cell } from "../../../model/subject/Cell";
import { GridRenderer } from "../../interfaces/gridRenderer";

export class AutoCellState implements CellState {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  algorithmController: AlgorithmController | undefined;
  walls: Array<Point> = new Array<Point>();
  start: Point = { x: 0, y: 0 };
  end: Point = { x: 0, y: 1 };
  draggingStart_End = "";
  animatePath(): void {
    this.getData();
    this.algorithmController?.animatePath();
  }
  setRenderer(renderer: GridRenderer): void {
    this.algorithmController?.setRenderer(renderer);
  }
  setBoard(board: Board): void {
    this.algorithmController?.setBoard(board);
    this.board = board;
    this.grid = board.board;
  }
  setStart(pos: Point): void {
    this.start = pos;
    this.algorithmController?.setStart(pos);
  }
  setEnd(pos: Point): void {
    this.end = pos;
    this.algorithmController?.setEnd(pos);
  }
  removeStart(pos: Point): void {
    this.algorithmController?.removeStart(pos);
  }
  removeEnd(pos: Point): void {
    this.algorithmController?.removeEnd(pos);
  }
  setMovementStrategy(strategy: MovementModel): void {
    this.algorithmController?.setMovementStrategy(strategy);
  }
  setWalls(walls: Point[]): void {
    this.algorithmController?.setWalls(walls);
  }
  getData(): void {
    this.algorithmController?.getData();
  }
  setAlgorithmController(algorithmController: AlgorithmController): void {
    this.algorithmController = algorithmController;
  }
  addEventListeners(): void {
    throw new Error("Method not implemented.");
  }
  draw() {
    return this.algorithmController?.draw();
  }
  removeWalls(pos: Point): void {
    for (let i = 0; i < this.walls.length; i++) {
      for (let j = 0; j < this.walls.length; j++) {
        if (this.walls[i].x === pos.x && this.walls[i].y === pos.y) {
          this.walls.splice(i, 1);
        }
      }
    }
    this.setWalls(this.walls);
  }
  addWalls(pos: Point): void {
    this.walls.push(pos);
    this.setWalls(this.walls);
  }
}
