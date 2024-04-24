import { PathfindingModel } from "../../../../../model/Interfaces/PathfindingModel";
import { Cell } from "../../../../../model/subject/Cell";
import { BfsModel } from "../../../../../model/subject/algorithms/pathFinding/bfsModel";
import { Board } from "../../../../../model/subject/board";
import { Point } from "../../../../../shared/point";
import { AlgorithmController } from "../algorithmController";
import { Set } from "../../../../../shared/set";
import { Grid } from "@mui/material";
import { Pathfinding } from "../../../../../model/subject/algorithms/pathFinding/Pathfinding";
import { Stack } from "../../../../../shared/stack";
import { useEffect, useState } from "react";
export class BfsController implements AlgorithmController {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  bfsModel: PathfindingModel | undefined;
  start: Point | undefined;
  end: Point | undefined;
  visited: Set<Cell> | undefined;
  path: Array<Cell> | undefined;
  currentPoints: Stack<Cell> | undefined;

  draw(): JSX.Element[][] {
    const [visitedState, setVisitedState] = useState<Cell[]>([]);
    const [pathState, setPathState] = useState<Cell[]>([]);
    this.getData();
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    let result: JSX.Element[][] = [];
    const animateCells = () => {
      this.ifNull(this.visited).forEach((cell: Cell, index: number) => {
        setTimeout(() => {
          setVisitedState((prevState) =>
            prevState.includes(cell) ? prevState : [...prevState, cell]
          );
        }, 0);
      });

      this.ifNull(this.path).forEach((cell: Cell, index: number) => {
        setTimeout(() => {
          setPathState((prevState) =>
            prevState.includes(cell) ? prevState : [...prevState, cell]
          );
        }, 0);
      });
    };
    useEffect(() => {
      animateCells();
    }, []);
    console.log(this.ifNull(this.visited));
    for (let i = 0; i < gridLength; i++) {
      let row: JSX.Element[] = [];
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.ifNull(this.grid)[i][j];
        const isWall = cell.isWall;
        const isStart = cell.isStart;
        const isEnd = cell.isEnd;
        const isVisited = this.visited?.includes(cell);
        const isPath = this.path?.includes(cell);
        const isCurrent = this.ifNull(this.currentPoints).peek() === cell;
        isCurrent ? this.ifNull(this.currentPoints).pop() : "";

        const style = `${
          isStart
            ? "bg-blue-500"
            : isEnd
              ? "bg-red-500"
              : isWall
                ? "bg-gray-500"
                : isPath
                  ? "bg-green-500"
                  : isVisited
                    ? "bg-yellow-500"
                    : isCurrent
                      ? "bg-purple-500"
                      : ""
        }`;
        row.push(
          <Grid
            item
            xs={0}
            key={j}
            data-row={i}
            data-col={j}
            className={style}
            style={{
              width: "20px",
              height: "20px",
              border: "1px solid black",
            }}
          />
        );
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
      this.ifNull(this.board)
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
