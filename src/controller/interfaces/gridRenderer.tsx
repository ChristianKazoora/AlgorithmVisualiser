import { Cell } from "../../model/subject/Cell";
import { Board } from "../../model/subject/board/board";
import { Stack } from "../../shared/stack";

export interface GridRenderer {
  animatePath(): void;
  animateMaze(): void;
  render(): any;
  setPath(path: Array<Cell>): void;
  setBoard(board: Board): void;
  setCurrentPoints(points: Stack<Cell>): void;
  reRenderBoard(): void;
  reRunAnimatePath(): void;
  setMazeVisitedOrder(OrderVisited: Stack<Cell>): void;
}
