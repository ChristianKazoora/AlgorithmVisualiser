import { Cell } from "../subject/Cell";
import { Board } from "../subject/board";
import { Point } from "../../shared/point";
export interface PathfindingModel {
  setStartPoint(startP: Point): void;
  setEndPoint(endP: Point): void;
  toggleWall(point: Point): void;
  setBoard(board: Board): void;
  setWallPositions(wallP: Array<Point>): void;
  setCurrentPoint(x: number, y: number): void;
  getPath(): Array<Cell>;
  getVisited(): Set<Cell>;
  getBoard(): Board;
  start(): void;
}
