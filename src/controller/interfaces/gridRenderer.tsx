import { Cell } from "../../model/subject/Cell";
import { Board } from "../../model/subject/board/board";

export interface GridRenderer {
  render(): any;
  clear(): void;
  setBoard(board: Board): void;
  setCurrentCell(cell: Cell): void;
}
