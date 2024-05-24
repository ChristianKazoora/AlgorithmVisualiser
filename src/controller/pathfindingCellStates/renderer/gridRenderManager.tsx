import { Cell } from "../../../model/subject/Cell";
import { Board } from "../../../model/subject/board/board";
import { GridRenderer } from "../../interfaces/gridRenderer";

import { Stack } from "../../../shared/stack";

import { mainGridRenderer } from "./gridRender";
export class GridRenderManager implements GridRenderer {
  private renderer: GridRenderer = new mainGridRenderer();
  animatePath(): any {
    this.renderer?.animatePath();
  }
  render() {
    return this.renderer?.render();
  }
  setPath(path: Cell[]): void {
    this.renderer?.setPath(path);
  }
  clear(): void {
    throw new Error("Method not implemented.");
  }
  setBoard(board: Board): void {
    this.renderer?.setBoard(board);
  }
  setCurrentPoints(points: Stack<Cell>): void {
    this.renderer?.setCurrentPoints(points);
  }
  reRenderCss(): void {
    this.renderer?.reRenderCss();
  }
}
