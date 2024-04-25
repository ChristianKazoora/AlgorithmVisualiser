import { Cell } from "../../../../../model/subject/Cell";
import { BfsModel } from "../../../../../model/subject/algorithms/pathFinding/bfsModel";
import { Board } from "../../../../../model/subject/board/board";
import { Point } from "../../../../../shared/point";
import { AlgorithmController } from "../algorithmController";
import { Set } from "../../../../../shared/set";
import { Grid } from "@mui/material";
import { Pathfinding } from "../../../../../model/subject/algorithms/pathFinding/Pathfinding";
import { Stack } from "../../../../../shared/stack";
import { WestEastAnimation } from "../../../../cellDecorations/westEastAnimation";
import { NorthSouthAnimation } from "../../../../cellDecorations/northSouthAnimation";
import { NorthEastTurnAnimation } from "../../../../cellDecorations/northEastTurnAnimation";
import { SouthEastTurnAnimation } from "../../../../cellDecorations/southEastTurnAnimation";
import { NorthWestTurnAnimation } from "../../../../cellDecorations/northWestTurnAnimation";
import { SouthWestTurnAnimation } from "../../../../cellDecorations/southWestTurnAnimation";
import { EndCellAnimation } from "../../../../cellDecorations/endCellAnimation";
import { StartCellAnimation } from "../../../../cellDecorations/startCellAnimation";
import { WallCellAnimation } from "../../../../cellDecorations/wallCellAnimation";
import { EmptyCellAnimation } from "../../../../cellDecorations/emptyCellAnimation";
import { PathfindingModel } from "../../../../../model/Interfaces/pathfindingModel";
import { MainPath } from "../../../../cellDecorations/paths/mainPath";
import { VisitedPath } from "../../../../cellDecorations/paths/visitedPath";
import { GetNeigbourWD } from "../../../../../model/subject/board/strategies/getNeigbourWD";
import { GetNeigbour } from "../../../../../model/subject/board/strategies/getNeighbours";
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
    this.getData();
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    let result: JSX.Element[][] = [];
    for (let i = 0; i < gridLength; i++) {
      let row: JSX.Element[] = [];
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.ifNull(this.grid)[i][j];
        const isVisited = this.visited?.includes(cell);
        const isCurrent = this.ifNull(this.currentPoints).peek() === cell;
        isCurrent ? this.ifNull(this.currentPoints).pop() : "";

        let pos: JSX.Element | undefined;
        pos = new EmptyCellAnimation(cell).animate();
        isVisited ? (pos = new VisitedPath(cell).animate()) : "";

        //Path
        if (this.westEastMove(cell)) {
          pos = new WestEastAnimation(cell).animate();
        } else if (this.northSouthMove(cell)) {
          pos = new NorthSouthAnimation(cell).animate();
        } else if (this.northEastTurn(cell)) {
          pos = new NorthEastTurnAnimation(cell).animate();
        } else if (this.southEastTurn(cell)) {
          pos = new SouthEastTurnAnimation(cell).animate();
        } else if (this.northWestTurn(cell)) {
          pos = new NorthWestTurnAnimation(cell).animate();
        } else if (this.southWestTurn(cell)) {
          pos = new SouthWestTurnAnimation(cell).animate();
        }

        cell.isEnd ? (pos = new EndCellAnimation(cell).animate()) : "";
        cell.isStart ? (pos = new StartCellAnimation(cell).animate()) : "";
        cell.isWall ? (pos = new WallCellAnimation(cell).animate()) : "";

        if (pos) {
          row.push(pos);
        }
      }
      result.push(row);
    }

    return result;
  }
  getData(): void {
    const walls = [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ];
    this.bfsModel = new Pathfinding(
      new BfsModel(),
      this.ifNull(this.start),
      this.ifNull(this.end),
      this.ifNull(this.board),
      walls,
      new GetNeigbour()
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
  westEastMove(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined) {
      if (cell.nextCell == cell.right) {
        result = true;
      }
    }
    return result;
  }
  northSouthMove(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined) {
      if (cell.nextCell == cell.bottom) {
        result = true;
      }
    }
    return result;
  }
  northEastTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined) {
      if (cell.nextCell == cell.topRight) {
        result = true;
      }
    }
    return result;
  }
  southEastTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined) {
      if (cell.nextCell == cell.bottomRight) {
        result = true;
      }
    }
    return result;
  }
  northWestTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined) {
      if (cell.nextCell == cell.topLeft) {
        result = true;
      }
    }
    return result;
  }
  southWestTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined) {
      if (cell.nextCell == cell.bottomLeft) {
        result = true;
      }
    }
    return result;
  }
}
