import { useEffect } from "react";
import { Cell } from "../../../model/subject/Cell";
import { Board } from "../../../model/subject/board/board";
import { EmptyCellAnimation } from "../../cellDecorations/decorators/emptyCellAnimation";
import { GridRenderer } from "../../interfaces/gridRenderer";
import { useAnimation } from "framer-motion";
import { EndCellAnimation } from "../../cellDecorations/decorators/endCellAnimation";
import { StartCellAnimation } from "../../cellDecorations/decorators/startCellAnimation";
import { WallCellAnimation } from "../../cellDecorations/decorators/wallCellAnimation";
import { MainPath } from "../../cellDecorations/paths/mainPath";
import { Stack } from "../../../shared/stack";
import { VisitedPath } from "../../cellDecorations/paths/visitedPath";
import { Set } from "../../../shared/set";
import { CellDecorator } from "../../cellDecorations/cellDecorator";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
export class mainGridRenderer implements GridRenderer {
  private grid: Array<Array<Cell>> | undefined;
  private board: Board | undefined;
  private path: Array<Cell> | undefined;
  private currentPoints: Stack<Cell> | undefined;
  private renderCellPoints: Set<CellDecorator> = new Set();
  private currentCell: Cell | undefined;
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
        const isCurrent = this.currentPoints?.includes(cell);
        const isPath = this.path?.includes(cell);
        let pos: JSX.Element | undefined;

        pos = new EmptyCellAnimation(cell).animate();

        isCurrent ? (pos = new VisitedPath(cell).animate()) : "";
        // isPath ? (pos = new MainPath(cell).animate()) : "";

        cell.isEnd ? (pos = new EndCellAnimation(cell).animate()) : "";
        cell.isStart ? (pos = new StartCellAnimation(cell).animate()) : "";
        // cell.isWall ? (pos = new WallCellAnimation(cell).animate()) : "";
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
    // console.log("rerendering", this.ifNull(this.grid));
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        let cell = this.ifNull(this.grid)[i][j];
        let currentElement = document.getElementById(
          `cell-${cell.x}-${cell.y}-animation`
        );
        let visetedElement = document.getElementById(
          `cell-${cell.x}-${cell.y}-visited`
        );
        if (currentElement) {
          let toAdd: any;
          // currentElement.className = "hidden";

          if (cell.isWall) {
            toAdd = new WallCellAnimation(cell).animate();
            // currentElement.className = " block";

            // currentElement.className = "bg-black ";
          }
          if (cell.isStart) {
            // toAdd = new StartCellAnimation(cell).animate();
            currentElement.className = " block";
          }
          if (cell.isEnd) {
            // toAdd = new EndCellAnimation(cell).animate();
            currentElement.className = " block";
          }
          if (cell.isVisited) {
            if (visetedElement) {
              visetedElement.className = "block ";
            }
          }

          if (toAdd) {
            const root = createRoot(currentElement);

            root.render(toAdd);
          }
          // ReactDOM.render(toAdd, currentElement);
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
              // let toAdd = new VisitedPath(cell).animate();
              // const root = createRoot(cellElement);
              // root.render(toAdd);
              currentElement.className = " block ";
            }
            // .className = "mt-[1px] bg-yellow-500 h-[1rem]"; // Temporarily make the cell yellow
            setTimeout(() => {
              // .className =
              // "mt-[1px] bg-slate-500 h-[1rem] rounded-full";
              if (visitedElement) {
                // let toAdd = new VisitedPath(cell).animate();
                // const root = createRoot(cellElement);
                // root.render(toAdd);
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
          // console.log(element);
          if (pathElelement) {
            // let toAdd = new MainPath(cell).animate();
            // const root = createRoot(element);
            // root.render(toAdd);
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
