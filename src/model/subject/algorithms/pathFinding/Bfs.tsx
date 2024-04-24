import { Cell } from "../../Cell";
import { Board } from "../../board";
import { Queue } from "../../../../shared/queue";
import { PathfindingModel } from "../../../Interfaces/PathfindingModel";
import { Point } from "../../../../shared/point";
export class Bfs implements PathfindingModel {
  private grid: Array<Array<Cell>> | undefined;
  private board: Board | undefined;
  private queue: Queue<Cell> = new Queue<Cell>();
  private visited: Set<Cell> = new Set<Cell>();
  private path: Array<Cell> | undefined;
  private startP: Cell | undefined;
  private endP: Cell | undefined;
  private currentP: Cell | undefined;

  bfs(): void {
    let start: Cell = this.ifNull(this.startP);
    this.queue.enqueue(start);
    this.visited.add(start);
    while (!this.queue.isEmpty()) {
      let current: Cell = this.queue.dequeue() as Cell;
      if (current.isEnd) {
        this.path = new Array<Cell>();
        this.path = this.backtrackPath(current);
        return;
      } else if (current.isWall) {
        return;
      }
      let neighbours: Array<Cell> = this.ifNull(this.board).getNeighbours(
        current
      );
      for (let i = 0; i < neighbours.length; i++) {
        if (!this.visited.has(neighbours[i])) {
          this.queue.enqueue(neighbours[i]);
          this.visited.add(neighbours[i]);
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
    while (current !== this.startP) {
      path.push(current);
      current = current.previousCell as Cell;
    }
    return path;
  }
  count: number = 0;
  ifNull(object: any): any {
    if (object) {
      return object;
    }

    throw new Error("Object is null or undefined");
  }
  setBoard(board: Board): void {
    this.board = board;
    this.grid = board.board;
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
    this.ifNull(this.grid)[pos.x][pos.y].isStart = true;
    this.startP = this.ifNull(this.grid)[pos.x][pos.y];
    //this.setCurrentPoint(pos.x, pos.y);
  }
  setEndPoint(pos: Point): void {
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
  getCurrentPoint(): Cell {
    return this.ifNull(this.currentP);
  }
  getBoard(): Board {
    return this.ifNull(this.grid);
  }
}
