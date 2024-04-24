import { Cell } from "../subject/Cell";
import { Board } from "../subject/board";
import { Set } from "../../shared/set";
import { Point } from "../../shared/point";
import { Stack } from "../../shared/stack";
export interface PathfindingModel {
  setStartPoint(startP: Point): void;
  setEndPoint(endP: Point): void;
  toggleWall(point: Point): void;
  setBoard(board: Board): void;
  setWallPositions(wallP: Array<Point>): void;
  setCurrentPoint(x: number, y: number): void;
  getPath(): Array<Cell>;
  getCurrentPoints(): Stack<Cell>;
  getVisited(): Set<Cell>;
  getBoard(): Board;
  start(): void;
}
