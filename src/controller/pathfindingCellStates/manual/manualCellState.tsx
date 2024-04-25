import { Cell } from "../../../model/subject/Cell";
import { Board } from "../../../model/subject/board/board";
import { Point } from "../../../shared/point";
import { CellState } from "../cellState";
import { AlgorithmController } from "./algorithmControllers/algorithmController";
export class ManualCellState implements CellState {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  algorithmController: AlgorithmController | undefined;
  draw(): JSX.Element[][] {
    return this.algorithmController?.draw();
  }

  setBoard(board: any): void {
    this.algorithmController?.setBoard(board);
  }
  setAlgorithmController(algorithm: AlgorithmController): void {
    this.algorithmController = algorithm;
  }
  setStart(pos: Point): void {
    this.algorithmController?.setStart(pos);
  }
  setEnd(pos: Point): void {
    this.algorithmController?.setEnd(pos);
  }
}
