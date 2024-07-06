import { Point } from "../../../../shared/point";
import { Set } from "../../../../shared/set";
import { Stack } from "../../../../shared/stack";
import { MovementModel } from "../../../Interfaces/movementModel";
import { PathFindingModel } from "../../../Interfaces/pathfindingModel";
import { Board } from "../../board/board";
import { Cell } from "../../Cell";

export abstract class PathFindingHelper implements PathFindingModel {
  protected grid: Array<Array<Cell>> | undefined;
  protected board: Board | undefined;
  protected visited: Set<Cell> = new Set<Cell>();
  protected path: Array<Cell> = [];
  protected startP: Cell | undefined;
  protected endP: Cell | undefined;
  protected currentP: Stack<Cell> = new Stack<Cell>();
  abstract setMovementModel(movementModel: MovementModel): void;
  abstract start(): void;
  backtrackPath(end: Cell): Array<Cell> {
    let path: Array<Cell> = new Array<Cell>();
    let current: Cell = end;

    while (current != this.startP) {
      path.push(current);
      if (current.previousCell != undefined) {
        current.previousCell.nextCell = current;
      }
      current = current.previousCell as Cell;
    }
    path.push(this.startP as Cell);
    return path;
  }
  ifNull(object: any): any {
    if (object) {
      return object;
    }

    throw new Error("Object is null or undefined");
  }

  setBoard(board: Board): void {
    this.board = board;
    this.grid = board.grid;
  }
  setCurrentPoint(x: number, y: number): void {
    this.currentP = this.ifNull(this.grid).board[x][y];
  }
  setWallPositions(wallP: Array<Point>): void {
    for (let i = 0; i < wallP.length; i++) {
      this.ifNull(this.grid)[wallP[i].x][wallP[i].y].isWall = true;
    }
  }
  setStartPoint(pos: Point): void {
    this.setAllOtherCellsToFalse("start");
    this.ifNull(this.grid)[pos.x][pos.y].isStart = true;
    this.startP = this.ifNull(this.grid)[pos.x][pos.y];
  }
  setAllOtherCellsToFalse(startOrEnd: String): void {
    if (startOrEnd == "start") {
      for (let i = 0; i < this.ifNull(this.grid).length; i++) {
        for (let j = 0; j < this.ifNull(this.grid)[i].length; j++) {
          if (this.ifNull(this.grid)[i][j].isStart) {
            this.ifNull(this.grid)[i][j].isStart = false;
          }
        }
      }
    } else {
      for (let i = 0; i < this.ifNull(this.grid).length; i++) {
        for (let j = 0; j < this.ifNull(this.grid)[i].length; j++) {
          if (this.ifNull(this.grid)[i][j].isEnd) {
            this.ifNull(this.grid)[i][j].isEnd = false;
          }
        }
      }
    }
  }
  setEndPoint(pos: Point): void {
    this.setAllOtherCellsToFalse("end");
    this.ifNull(this.grid)[pos.x][pos.y].isEnd = true;
    this.endP = this.ifNull(this.grid)[pos.x][pos.y];
  }
  toggleWall(pos: Point): void {
    let cell: Cell = this.ifNull(this.grid)[pos.x][pos.y];
    cell.isWall = !cell.isWall;
  }
  getPath(): Array<Cell> {
    return this.ifNull(this.path);
  }
  getVisited(): Set<Cell> {
    return this.ifNull(this.visited);
  }
  getCurrentPoints(): Stack<Cell> {
    return this.ifNull(this.currentP);
  }
  getBoard(): Board {
    return this.ifNull(this.board);
  }
}
