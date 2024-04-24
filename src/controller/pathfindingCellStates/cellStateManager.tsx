import { Board } from "../../model/subject/board";
import { Point } from "../../shared/point";
import { CellState } from "./cellState";
import { ManualCellState } from "./manual/manualCellState";
import { AlgorithmController } from "./manual/algorithmControllers/algorithmController";
import { BfsController } from "./manual/algorithmControllers/algorithms/bfsController";

export class CellStateManager implements CellState {
  private cellState: CellState;
  constructor(
    board: Board,
    _cellState: CellState = new ManualCellState(),
    _algorithmController: AlgorithmController = new BfsController(),
    _start: Point = { x: 0, y: 0 },
    _end: Point = { x: board.board.length - 1, y: board.board[0].length - 1 }
  ) {
    this.cellState = _cellState;
    this.setAlgorithmController(_algorithmController);
    this.setBoard(board);
    this.setStart(_start);
    this.setEnd(_end);
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
  setAlgorithmController(algorithm: AlgorithmController): void {
    this.cellState.setAlgorithmController(algorithm);
  }
  draw(): JSX.Element[][] {
    return this.cellState.draw();
  }
}
