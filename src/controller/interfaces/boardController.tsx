import { Board } from "../../model/subject/board/board";
import { mainController } from "./mainController";

export interface BoardController extends mainController {
  animatePath(): void;
  addEventListeners(): void;
  setBoard(board: Board): void;
  setCellState(cellState: any, renderer: any, movementModel: any): void;
  setMovementModel(movementModel: any): void;
  ganarateMaze(): void;
  setAlgorithmController(algorithm: any): void;
  getBoard(): Board;
  getStart(): any;
  getEnd(): any;
  getWalls(): any;
}
