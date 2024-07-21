import { HuristicModel } from "../../model/Interfaces/huristicModel";
import { MovementModel } from "../../model/Interfaces/movementModel";
import { Board } from "../../model/subject/board/board";
import { Cell } from "../../model/subject/Cell";
import { Point } from "../../shared/point";
import { Stack } from "../../shared/stack";
import { AlgorithmController } from "../interfaces/algorithmController";
import { CellState } from "../interfaces/cellState";
import { GridRenderer } from "../interfaces/gridRenderer";

export abstract class CellStateHelper implements CellState {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  algorithmController: AlgorithmController | undefined;
  walls: Array<Point> = new Array<Point>();
  start: Point | undefined; //= { x: 0, y: 0 };
  end: Point | undefined; //= { x: 0, y: 1 };
  draggingStart_End = "";
  currentPressedCell: any;
  mazeVisitedOrder: Stack<Cell> | undefined;

  abstract addEventListeners(): void;
  abstract ganarateMaze(): void;
  abstract animateMazeGenaration(): void;

  clearBoard(): void {
    this.algorithmController?.reRenderBoard();
  }
  setHuristicModel(huristicModel: HuristicModel): void {
    this.algorithmController?.setHuristicModel(huristicModel);
  }
  animatePath(): void {
    this.getData();
    this.algorithmController?.animatePath();
  }
  setBoard(board: Board): void {
    this.algorithmController?.setBoard(board);
    this.board = board;
    this.grid = board.grid;
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

  setRenderer(renderer: GridRenderer): void {
    this.algorithmController?.setRenderer(renderer);
  }

  getMovementStrategy(): MovementModel {
    return this.algorithmController?.getMovementStrategy() as MovementModel;
  }
  getAlgorithmController(): AlgorithmController {
    return this.algorithmController as AlgorithmController;
  }
  getRenderer(): GridRenderer {
    return this.algorithmController?.getRenderer() as GridRenderer;
  }
  getStart(): Point {
    return this.ifNull(this.start);
  }
  getEnd(): Point {
    return this.ifNull(this.end);
  }
  draw() {
    return this.algorithmController?.draw();
  }
  ifNull(data: any): any {
    if (data) {
      return data;
    } else {
      throw new Error("Method not implemented.");
    }
  }
}
