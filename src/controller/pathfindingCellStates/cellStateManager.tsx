import { Board } from "../../model/subject/board/board";
import { Point } from "../../shared/point";
import { CellState } from "../interfaces/cellState";
import { ManualCellState } from "./manual/manualCellState";
import { AlgorithmController } from "../interfaces/algorithmController";
import { BfsController } from "./manual/algorithmControllers/algorithms/bfsController";
import { MovementModel } from "../../model/Interfaces/movementModel";
import { GetNeigbour } from "../../model/subject/board/strategies/getNeighbours";

export class CellStateManager implements CellState {
  private cellState: CellState;
  constructor(
    board: Board,
    _start: Point = { x: 0, y: 0 },
    _end: Point = { x: board.board.length - 1, y: board.board[0].length - 1 },
    _movementStrategy: MovementModel = new GetNeigbour(),
    _cellState: CellState = new ManualCellState(),
    _walls: Point[] = [],
    _algorithmController: AlgorithmController = new BfsController()
  ) {
    this.cellState = _cellState;
    this.setAlgorithmController(_algorithmController);
    this.setBoard(board);
    this.setStart(_start);
    this.setEnd(_end);
    this.setWalls(_walls);
    this.setMovementStrategy(_movementStrategy);
    // this.getData();
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
