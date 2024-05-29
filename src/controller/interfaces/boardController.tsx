import { Board } from "../../model/subject/board/board";
import { mainController } from "./mainController";

export interface BoardController extends mainController {
  animatePath(): void;
  addEventListeners(): void;
  setBoard(board: Board): void;
  setCellState(cellState: any, renderer: any, movementModel: any): void;
  ganarateMaze(): void;
}
