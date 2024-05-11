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

export class GridRenderManager implements GridRenderer {
  private grid: Array<Array<Cell>> | undefined;
  private board: Board | undefined;
  private currentCell: Cell | undefined;
  setBoard(board: Board): void {
    this.board = board;
    this.grid = board.board;
  }
  setCurrentCell(cell: Cell): void {
    this.currentCell = cell;
  }
  clear(): void {
    throw new Error("Method not implemented.");
  }
  render(): JSX.Element[][] {
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    let result: JSX.Element[][] = [];
    // console.log(this.currentCell);

    for (let i = 0; i < gridLength; i++) {
      let row: JSX.Element[] = [];
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.ifNull(this.grid)[i][j];
        const isCurrent = this.currentCell === cell;
        let pos: JSX.Element | undefined;
        const yControls = useAnimation();
        const xControls = useAnimation();
        const cellDuration = 0.5;
        const duration = 20;
        useEffect(() => {
          const sequence = async () => {
            await yControls.start({
              scaleY: 0,
              transition: { duration: cellDuration },
            });
            await yControls.start({
              scaleY: 1,
              transition: { duration: cellDuration },
            });
          };
          const timeoutId = setTimeout(sequence, cell.posFromStart * duration);
          return () => clearTimeout(timeoutId); // cleanup on unmount
        }, [cell]);
        useEffect(() => {
          const sequence = async () => {
            await xControls.start({
              scaleX: 0, // changed from scaleY to scaleX
              transition: { duration: cellDuration },
            });
            await xControls.start({
              scaleX: 1, // changed from scaleY to scaleX
              transition: { duration: cellDuration },
            });
          };
          const timeoutId = setTimeout(sequence, cell.posFromStart * duration);
          return () => clearTimeout(timeoutId); // cleanup on unmount
        }, [cell]);
        const controls = { y: yControls, x: xControls };
        pos = new EmptyCellAnimation(cell, controls).animate();
        isCurrent ? (pos = new MainPath(cell, controls).animate()) : "";
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
}
