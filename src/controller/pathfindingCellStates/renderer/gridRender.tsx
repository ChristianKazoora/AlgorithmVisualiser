import { Cell } from "../../../model/subject/Cell";
import { Board } from "../../../model/subject/board/board";
import { GridRenderer } from "../../interfaces/gridRenderer";

import { Stack } from "../../../shared/stack";
import { VisitedPath } from "../../cellDecorations/paths/visitedPath";

import { createRoot } from "react-dom/client";
import { Line } from "../../cellDecorations/paths/line";
export class mainGridRenderer implements GridRenderer {
  private grid: Array<Array<Cell>> | undefined;
  private board: Board | undefined;
  private path: Array<Cell> | undefined;
  private currentPoints: Stack<Cell> | undefined;

  private ANIMATIONSPEED = 20;
  setBoard(board: Board): void {
    this.board = board;
    this.grid = board.board;
  }
  setCurrentPoints(points: Stack<Cell>): void {
    this.currentPoints = points;
  }
  setPath(path: Array<Cell>): void {
    this.path = path;
  }
  clear(): void {
    throw new Error("Method not implemented.");
  }
  render(): JSX.Element[][] {
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    let result: JSX.Element[][] = [];

    for (let i = 0; i < gridLength; i++) {
      let row: JSX.Element[] = [];
      for (let j = 0; j < gridWidth; j++) {
        let cell = this.ifNull(this.grid)[i][j];

        let pos: JSX.Element | undefined;
        pos = new VisitedPath(cell).animate();

        if (pos) {
          row.push(pos);
        }
      }
      result.push(row);
    }
    return result;
  }
  ifNull(object: any) {
    if (object) {
      return object;
    } else {
      throw new Error("object is undefined");
    }
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

  animatePath(): void {
    const points = this.ifNull(this.currentPoints);

    for (let i = 0; i < points.size(); i++) {
      if (i === points.size() - 1) {
        setTimeout(
          () => {
            this.animateLinePath();
          },
          this.ANIMATIONSPEED * 1.55 * i
        );
        return;
      }
      setTimeout(
        () => {
          const cell = points.get(i);

          if (!cell.isStart && !cell.isEnd) {
            const visitedElement = this.ifNull(document).getElementById(
              `cell-${cell.x}-${cell.y}-visited`
            );
            const currentElement = this.ifNull(document).getElementById(
              `cell-${cell.x}-${cell.y}-current`
            );

            if (currentElement) {
              currentElement.className = " block ";
            }
            setTimeout(() => {
              if (visitedElement) {
                currentElement.className = "hidden";
                visitedElement.className = "block";
              }
            }, this.ANIMATIONSPEED);
          }
        },
        this.ANIMATIONSPEED * 1.55 * i
      );
    }
  }
  animateLinePath(): void {
    const path = this.ifNull(this.path);
    path.reverse();
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const cell = path[i];
        if (!cell.isStart && !cell.isEnd) {
          const pathElelement = this.ifNull(document).getElementById(
            `cell-${cell.x}-${cell.y}-path`
          );
          const visitedElement = this.ifNull(document).getElementById(
            `cell-${cell.x}-${cell.y}-visited`
          );
          if (pathElelement) {
            let toAdd = new Line(cell).animate();
            const root = createRoot(pathElelement);
            root.render(toAdd);
            pathElelement.className = "block";
          }
          if (visitedElement) {
            visitedElement.className = "hidden";
          }
        }
      }, this.ANIMATIONSPEED * i);
    }
  }
}
