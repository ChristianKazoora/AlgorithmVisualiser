import { Cell } from "../../model/subject/Cell";
import { Board } from "../../model/subject/board/board";
import { Stack } from "../../shared/stack";

export interface GridRenderer {
  animatePath(): unknown;
  render(): any;
  setPath(path: Array<Cell>): void;
  clear(): void;
  setBoard(board: Board): void;
  setCurrentPoints(points: Stack<Cell>): void;
  reRenderCss(): void;
}
