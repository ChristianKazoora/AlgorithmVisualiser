import { Cell } from "../../../model/subject/Cell";
import { Board } from "../../../model/subject/board/board";
import { GridRenderer } from "../../interfaces/gridRenderer";

import { Stack } from "../../../shared/stack";

import { ManualGridRenderer } from "./manualGridRender";
export class GridRenderManager implements GridRenderer {
  private renderer: GridRenderer;
  constructor(_renderer: GridRenderer = new ManualGridRenderer()) {
    this.renderer = _renderer;
  }
  animateMaze(): void {
    this.renderer?.animateMaze();
  }
  setMazeVisitedOrder(OrderVisited: Stack<Cell>): void {
    this.renderer?.setMazeVisitedOrder(OrderVisited);
  }
  reRunAnimatePath(): void {
    this.renderer?.reRunAnimatePath;
  }

  animatePath(): any {
    this.renderer?.animatePath();
  }
  render() {
    return this.renderer?.render();
  }
  setPath(path: Cell[]): void {
    this.renderer?.setPath(path);
  }
  setBoard(board: Board): void {
    this.renderer?.setBoard(board);
  }
  setCurrentPoints(points: Stack<Cell>): void {
    this.renderer?.setCurrentPoints(points);
  }
  reRenderBoard(): void {
    this.renderer?.reRenderBoard();
  }
}
