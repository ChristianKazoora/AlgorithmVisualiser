import { Point } from "../../../../shared/point";
import { Set } from "../../../../shared/set";
import { Stack } from "../../../../shared/stack";
import { MovementModel } from "../../../Interfaces/movementModel";
import { PathfindingModel } from "../../../Interfaces/PathfindingModel";
import { Cell } from "../../Cell";
import { Board } from "../../board/board";
import { Queue } from "../../../../shared/queue";

export class DfsModel implements PathfindingModel {
  private grid: Array<Array<Cell>> | undefined;
  private board: Board | undefined;
  private movementStrategy: MovementModel | undefined;
  private queue: Queue<Cell> = new Queue<Cell>();
  private visited: Set<Cell> = new Set<Cell>();
  private path: Array<Cell> = [];
  private startP: Cell | undefined;
  private currentP: Stack<Cell> = new Stack<Cell>();
  dfs(): void {
    //implement the dfs algorithm recursively
    let start: Cell = this.ifNull(this.startP);
    this.visited.add(start);
    this.currentP.push(start);
    this.dfsRecursive(start);
  }
  dfsRecursive(current: Cell): void {
    if (current.isEnd) {
      this.path = new Array<Cell>();
      this.path = this.backtrackPath(current);
      return;
    } else if (current.isWall) {
      return;
    }
    let neighbours: Array<Cell> = this.ifNull(
      this.movementStrategy
    ).getNeighbours(current);
    for (let i = 0; i < neighbours.length; i++) {
      if (!this.visited.contains(neighbours[i])) {
        this.visited.add(neighbours[i]);
        neighbours[i].previousCell = current;
        this.dfsRecursive(neighbours[i]);
      }
    }
  }
  setStartPoint(startP: Point): void {
    this.setAllOtherCellsToFalse("start");
    this.ifNull(this.grid)[startP.x][startP.y].isStart = true;
    this.startP = this.ifNull(this.grid)[startP.x][startP.y];
  }
  setEndPoint(endP: Point): void {
    this.setAllOtherCellsToFalse("end");
    this.ifNull(this.grid)[endP.x][endP.y].isEnd = true;
  }
  toggleWall(point: Point): void {
    let cell: Cell = this.ifNull(this.grid)[point.x][point.y];
    cell.isWall = !cell.isWall;
  }
  setBoard(board: Board): void {
    this.board = board;
    this.grid = board.grid;
  }
  setWallPositions(wallP: Point[]): void {
    for (let i = 0; i < wallP.length; i++) {
      this.ifNull(this.grid)[wallP[i].x][wallP[i].y].isWall = true;
    }
  }
  setCurrentPoint(x: number, y: number): void {
    this.currentP = this.ifNull(this.grid).board[x][y];
  }
  setMovementModel(movementModel: MovementModel): void {
    this.movementStrategy = movementModel;
  }
  getPath(): Cell[] {
    return this.ifNull(this.path);
  }
  getCurrentPoints(): Stack<Cell> {
    return this.ifNull(this.currentP);
  }
  getVisited(): Set<Cell> {
    return this.ifNull(this.visited);
  }
  getBoard(): Board {
    return this.ifNull(this.board);
  }
  start(): void {
    this.dfs();
  }
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
  ifNull(object: any): any {
    if (object) {
      return object;
    }

    throw new Error("Object is null or undefined");
  }
}
