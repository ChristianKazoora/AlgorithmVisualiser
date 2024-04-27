import { mainController } from "./mainController";

export interface BoardController extends mainController {
  draw(): any;
  setBoard(board: any): void;
}
