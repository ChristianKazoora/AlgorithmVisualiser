import { HuristicModel } from "../../model/Interfaces/huristicModel";
import { Board } from "../../model/subject/board/board";
import { mainController } from "./mainController";

export interface BoardController extends mainController {
  animatePath(onComplete?: () => void): void;
  addEventListeners(): void;
  setBoard(board: Board): void;
  resize(width: number, height: number): void;
  setCellState(cellState: any, renderer: any, movementModel: any): void;
  setHuristicModel(huristicModel: HuristicModel): void;
  setMovementModel(movementModel: any): void;
  ganarateMaze(): void;
  setAlgorithmController(algorithm: any): void;
  getAlgorithmController(): any;
  clearBoard(): void;
  getBoard(): Board;
  getStart(): any;
  getEnd(): any;
  getWalls(): any;
  animateMaze(onComplete?: () => void): void;
  resetBoard(): void;
}
