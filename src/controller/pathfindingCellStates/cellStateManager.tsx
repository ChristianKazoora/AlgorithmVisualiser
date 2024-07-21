import { Board } from "../../model/subject/board/board";
import { Point } from "../../shared/point";
import { CellState } from "../interfaces/cellState";
import { ManualCellState } from "./manual/manualCellState";
import { AlgorithmController } from "../interfaces/algorithmController";
import { BfsController } from "./algoControllers/bfsController";
import { MovementModel } from "../../model/Interfaces/movementModel";
import { GetManulNeighbours } from "../../model/subject/board/strategies/manual/getManulNeighbours";
import { GridRenderer } from "../interfaces/gridRenderer";
import { AutoGridRenderer } from "./renderer/autoGridRender";
import { HuristicModel } from "../../model/Interfaces/huristicModel";

export class CellStateManager implements CellState {
  private cellState: CellState;
  constructor(
    board: Board,
    _start: Point = { x: 0, y: 0 },
    _end: Point = { y: board.grid.length - 1, x: board.grid[0].length - 1 },
    _movementStrategy: MovementModel = new GetManulNeighbours(),
    _cellState: CellState = new ManualCellState(),
    _walls: Point[] = [],
    _algorithmController: AlgorithmController = new BfsController(),
    _renderer: GridRenderer = new AutoGridRenderer()
  ) {
    this.cellState = _cellState;
    this.setAlgorithmController(_algorithmController);
    this.setBoard(board);
    this.setStart(_start);
    this.setEnd(_end);
    this.setWalls(_walls);
    this.setMovementStrategy(_movementStrategy);
    this.setRenderer(_renderer);
  }
  animateMazeGenaration(): void {
    this.cellState.animateMazeGenaration();
  }

  clearBoard(): void {
    this.cellState.clearBoard();
  }
  setHuristicModel(huristicModel: HuristicModel): void {
    this.cellState.setHuristicModel(huristicModel);
  }
  getStart(): Point {
    return this.cellState.getStart();
  }
  getEnd(): Point {
    return this.cellState.getEnd();
  }
  getRenderer(): GridRenderer {
    return this.cellState.getRenderer();
  }
  getAlgorithmController(): AlgorithmController {
    return this.cellState.getAlgorithmController();
  }
  ganarateMaze(): void {
    this.cellState.ganarateMaze();
  }
  setRenderer(renderer: GridRenderer): void {
    this.cellState.setRenderer(renderer);
  }

  removeStart(pos: Point): void {
    this.cellState.removeStart(pos);
  }
  removeEnd(pos: Point): void {
    this.cellState.removeEnd(pos);
  }
  addEventListeners(): void {
    this.cellState.addEventListeners();
  }
  animatePath(): void {
    this.cellState.animatePath();
  }
  setAlgorithmController(algorithmController: AlgorithmController): void {
    this.cellState.setAlgorithmController(algorithmController);
  }
  getData(): void {
    this.cellState.getData();
  }
  getMovementStrategy(): MovementModel {
    return this.cellState.getMovementStrategy();
  }
  setWalls(walls: Point[]): void {
    this.cellState.setWalls(walls);
  }
  setMovementStrategy(strategy: MovementModel): void {
    this.cellState.setMovementStrategy(strategy);
  }
  setEnd(pos: Point): void {
    this.cellState.setEnd(pos);
  }
  setStart(pos: Point): void {
    this.cellState.setStart(pos);
  }
  setBoard(board: Board): void {
    this.cellState.setBoard(board);
  }
  draw(): JSX.Element[][] {
    return this.cellState.draw();
  }
}
