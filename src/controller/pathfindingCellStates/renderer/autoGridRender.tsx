import { Cell } from "../../../model/subject/Cell";
import { Board } from "../../../model/subject/board/board";
import { Stack } from "../../../shared/stack";
import AutoCell from "../../cellDecorations/paths/autoCell";
import { GridRenderer } from "../../interfaces/gridRenderer";

export class AutoGridRenderer implements GridRenderer {
  private grid: Array<Array<Cell>> | undefined;
  private board: Board | undefined;
  private path: Array<Cell> | undefined;
  private currentPoints: Stack<Cell> | undefined;

  private ANIMATIONSPEED = 2;
  animatePath(): unknown {
    throw new Error("Method not implemented.");
  }
  render() {
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    let result: JSX.Element[][] = [];
    for (let i = 0; i < gridLength; i++) {
      let row: JSX.Element[] = [];
      for (let j = 0; j < gridWidth; j++) {
        let cell = this.ifNull(this.grid)[i][j];

        let pos: JSX.Element | undefined;
        pos = new AutoCell(cell).animate();
        if (pos) {
          row.push(pos);
        }
      }
      result.push(row);
    }
    return result;
  }
  setPath(path: Cell[]): void {
    this.path = path;
  }
  clear(): void {
    throw new Error("Method not implemented.");
  }
  setBoard(board: Board): void {
    this.board = board;
    this.grid = board.board;
  }
  setCurrentPoints(points: Stack<Cell>): void {
    throw new Error("Method not implemented.");
  }
  reRenderCss(): void {
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        let cell = this.ifNull(this.grid)[i][j];
        let visetedElement = document.getElementById(
          `cell-${cell.x}-${cell.y}-visited`
        );
        let wallElement = document.getElementById(
          `cell-${cell.x}-${cell.y}-wall`
        );
        let startElement = document.getElementById(
          `cell-${cell.x}-${cell.y}-start`
        );
        let endElement = document.getElementById(
          `cell-${cell.x}-${cell.y}-end`
        );
        let pathElement = document.getElementById(
          `cell-${cell.x}-${cell.y}-path`
        );

        if (wallElement) {
          if (cell.isWall) {
            wallElement.className = "block";
          } else {
            wallElement.className = "hidden";
          }
        }

        if (startElement) {
          if (cell.isStart) {
            startElement.className = "block";
          } else {
            startElement.className = "hidden";
          }
        }
        if (endElement) {
          if (cell.isEnd) {
            endElement.className = "block";
          } else {
            endElement.className = "hidden";
          }
        }
        if (visetedElement) {
          if (cell.isVisited) {
            visetedElement.className = "block ";
          } else {
            visetedElement.className = "hidden";
          }
        }
        if (pathElement) {
          if (cell.isPath) {
            pathElement.className = "block";
          } else {
            pathElement.className = "hidden";
          }
        }
      }
    }
  }
  ifNull(object: any) {
    if (object) {
      return object;
    } else {
      throw new Error("object is undefined");
    }
  }
}
