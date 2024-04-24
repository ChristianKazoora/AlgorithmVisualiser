import { Point } from "../../../../shared/point";
import { mainController } from "../../../mainController";

export interface AlgorithmController extends mainController {
  setBoard(board: any): void;
  setStart(pos: Point): void;
  setEnd(pos: Point): void;
  getData(): void;
}
