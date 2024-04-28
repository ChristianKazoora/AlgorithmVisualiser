import { Cell } from "../../../../../model/subject/Cell";
import { BfsModel } from "../../../../../model/subject/algorithms/pathFinding/bfsModel";
import { Board } from "../../../../../model/subject/board/board";
import { Point } from "../../../../../shared/point";
import { AlgorithmController } from "../../../../interfaces/algorithmController";
import { Set } from "../../../../../shared/set";
import { Pathfinding } from "../../../../../model/subject/algorithms/pathFinding/Pathfinding";
import { Stack } from "../../../../../shared/stack";
import { PathfindingModel } from "../../../../../model/Interfaces/pathfindingModel";
import { MainPath } from "../../../../cellDecorations/paths/mainPath";
import { VisitedPath } from "../../../../cellDecorations/paths/visitedPath";
import { MovementModel } from "../../../../../model/Interfaces/movementModel";
import { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";
import { EmptyCellAnimation } from "../../../../cellDecorations/decorators/emptyCellAnimation";
import { EndCellAnimation } from "../../../../cellDecorations/decorators/endCellAnimation";
import { StartCellAnimation } from "../../../../cellDecorations/decorators/startCellAnimation";
import { WallCellAnimation } from "../../../../cellDecorations/decorators/wallCellAnimation";

export class BfsController implements AlgorithmController {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  bfsModel: PathfindingModel | undefined;
  start: Point | undefined;
  end: Point | undefined;
  visited: Set<Cell> | undefined;
  path: Array<Cell> | undefined;
  currentPoints: Stack<Cell> | undefined;
  neighbourStrategy: MovementModel | undefined;
  walls: Array<Point> | undefined;
  draw(): any {
    const [currentCell, setCurrentCell] = useState(0);

    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    let result: JSX.Element[][] = [];
    for (let i = 0; i < gridLength; i++) {
      let row: JSX.Element[] = [];
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.ifNull(this.grid)[i][j];
        const isVisited = this.visited?.includes(cell);
        const isCurrent = this.ifNull(this.currentPoints).peek() === cell;
        const isPath = this.path?.includes(cell);
        isCurrent ? this.ifNull(this.currentPoints).pop() : "";

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
        isVisited ? (pos = new VisitedPath(cell, controls).animate()) : "";
        isPath ? (pos = new MainPath(cell, controls).animate()) : "";

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
  getData(): void {
    this.bfsModel = new Pathfinding(
      new BfsModel(),
      this.ifNull(this.start),
      this.ifNull(this.end),
      this.ifNull(this.board),
      this.walls,
      this.neighbourStrategy
    );
    this.bfsModel.start();
    this.visited = this.ifNull(this.bfsModel).getVisited();
    this.path = this.ifNull(this.bfsModel).getPath();
    this.currentPoints = this.ifNull(this.bfsModel).getCurrentPoints();
  }
  setBoard(board: any): void {
    this.board = board;
    this.grid = this.ifNull(this.board).board;
  }
  setMovementStrategy(strategy: MovementModel): void {
    this.neighbourStrategy = strategy;
  }
  setWalls(walls: Array<Point>): void {
    this.walls = walls;
  }
  ifNull(object: any) {
    if (object) {
      return object;
    } else {
      throw new Error("object is undefined");
    }
  }
  setStart(pos: Point): void {
    this.start = pos;
    this.ifNull(this.grid)[pos.x][pos.y].isStart = true;
  }
  setEnd(pos: Point): void {
    this.end = pos;
    this.ifNull(this.grid)[pos.x][pos.y].isEnd = true;
  }
}
