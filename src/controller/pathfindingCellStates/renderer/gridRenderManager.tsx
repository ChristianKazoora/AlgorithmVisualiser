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
export class GridRenderManager implements GridRenderer {
  private grid: Array<Array<Cell>> | undefined;
  private board: Board | undefined;
  private path: Array<Cell> | undefined;
  private currentPoints: Stack<Cell> | undefined;
  private renderCellPoints: Set<CellDecorator> = new Set();
  private currentCell: Cell | undefined;
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
    // console.log(this.currentPoints);

    for (let i = 0; i < gridLength; i++) {
      let row: JSX.Element[] = [];
      for (let j = 0; j < gridWidth; j++) {
        let cell = this.ifNull(this.grid)[i][j];
        const isCurrent = this.currentPoints?.includes(cell);
        let pos: JSX.Element | undefined;
        const yControls = useAnimation();
        const xControls = useAnimation();
        const controls = { y: yControls, x: xControls };

        pos = new EmptyCellAnimation(cell, controls).animate();
        isCurrent ? (cell = new VisitedPath(cell, controls)) : "";
        isCurrent
          ? this.renderCellPoints?.add(new VisitedPath(cell, controls))
          : "";
        isCurrent ? (pos = new VisitedPath(cell, controls).animate()) : "";

        // isCurrent ? (pos = new MainPath(cell, controls).animate()) : "";
        cell.isEnd
          ? (pos = new EndCellAnimation(cell, controls).animate())
          : "";
        cell.isStart
          ? (pos = new StartCellAnimation(cell, controls).animate())
          : "";
        cell.isWall
          ? (pos = new WallCellAnimation(cell, controls).animate())
          : "";
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
  SPEED = 1;
  animatePath(): void {
    const points = this.ifNull(this.currentPoints);

    for (let i = 0; i < points.size(); i++) {
      if (i === points.size() - 1) {
        setTimeout(
          () => {
            this.animateLinePath();
          },
          this.SPEED * 1.55 * i
        );
        return;
      }
      setTimeout(
        () => {
          const cell = points.get(i);
          if (!cell.isStart && !cell.isEnd) {
            const cellElement = this.ifNull(document).getElementById(
              `cell-${cell.x}-${cell.y}-animation`
            );
            cellElement.className = "mt-[1px] bg-yellow-500 h-[1rem]"; // Temporarily make the cell yellow
            setTimeout(() => {
              cellElement.className =
                "mt-[1px] bg-slate-500 h-[1rem] rounded-full";
            }, this.SPEED);
          }
        },
        this.SPEED * 1.55 * i
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
          const element = this.ifNull(
            document.getElementById(`cell-${cell.x}-${cell.y}-animation`)
          );

          if (element) {
            let toAdd = new MainPath(cell, undefined).animate();
            const root = createRoot(element);
            root.render(toAdd);
          }
        }
      }, this.SPEED * i);
    }
  }
  animateLine(): void {
    const path = this.ifNull(this.renderCellPoints) as Set<Cell>;

    for (let i = 0; i < path.size(); i++) {
      setTimeout(() => {
        const cell = path.get(i) as CellDecorator;

        const element = this.ifNull(
          document.getElementById(`cell-${cell.x}-${cell.y}-animation`)
        );

        if (element) {
          let toAdd = (
            <div
              id={`cell-${cell.x}-${cell.y}-animation`}
              className=" text-green-300 rounded-full"
            >
              $
            </div>
          );

          ReactDOM.render(toAdd, element);
        }
      }, this.SPEED * i);
    }
  }
  // animateLine(): void {
  //   const path = this.ifNull(this.renderCellPoints) as Set<Cell>;
  // let toAdd = <div       style={{
  //           width: "20px",
  //           height: "20px",
  //           border: "1px solid black",
  //         }} ><div className=" bg-red-950 rounded-full" > $</div></div>;
  //   for (let i = 0; i < path.size(); i++) {
  //     setTimeout(() => {
  //       const cell = path.get(i) as CellDecorator;

  //       // cell.animate();
  //       const element = this.ifNull(
  //         document.getElementById(`cell-${cell.x}-${cell.y}-animation`)
  //       );
  //       element.className = "bg-yellow-500 h[13rem] rounded-full";
  //     }, this.SPEED * i);
  //   }
  // }
}
