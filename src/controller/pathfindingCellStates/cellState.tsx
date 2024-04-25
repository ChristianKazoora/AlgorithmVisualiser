import { Board } from "../../model/subject/board/board";
import { Point } from "../../shared/point";
import { mainController } from "../mainController";
import { AlgorithmController } from "./manual/algorithmControllers/algorithmController";

export interface CellState extends mainController {
  draw(): JSX.Element[][];
  setAlgorithmController(algorithmController: AlgorithmController): void;
  setBoard(board: Board): void;
  setStart(pos: Point): void;
  setEnd(pos: Point): void;
}
