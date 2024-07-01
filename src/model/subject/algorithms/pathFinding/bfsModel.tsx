import { Cell } from "../../Cell";
import { Board } from "../../board/board";
import { Queue } from "../../../../shared/queue";
import { Set } from "../../../../shared/set";
import { Point } from "../../../../shared/point";
import { Stack } from "../../../../shared/stack";
import { MovementModel } from "../../../Interfaces/movementModel";
import { PathfindingModel } from "../../../Interfaces/pathfindingModel";
export class BfsModel implements PathfindingModel {
  private grid: Array<Array<Cell>> | undefined;
  private board: Board | undefined;
  private movementStrategy: MovementModel | undefined;
  private queue: Queue<Cell> = new Queue<Cell>();
  private visited: Set<Cell> = new Set<Cell>();
  private path: Array<Cell> = [];
  private startP: Cell | undefined;
  private currentP: Stack<Cell> = new Stack<Cell>();
  bfs(): void {
    let start: Cell = this.ifNull(this.startP);
    this.queue.enqueue(start);
    this.visited.add(start);
    this.currentP.push(start);
    while (!this.queue.isEmpty()) {
      let current: Cell = this.queue.dequeue() as Cell;
      if (current.isEnd) {
        this.visited.add(current);
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
          this.queue.enqueue(neighbours[i]);
          this.visited.add(neighbours[i]);
          neighbours[i].posFromStart = current.posFromStart + 1;
          neighbours[i].previousCell = current;
        }
      }
    }
  }
  start(): void {
    this.bfs();
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
  count: number = 0;
  ifNull(object: any): any {
    if (object) {
      return object;
    }

    throw new Error("Object is null or undefined");
  }
  setMovementModel(movementModel: MovementModel): void {
    this.movementStrategy = movementModel;
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
