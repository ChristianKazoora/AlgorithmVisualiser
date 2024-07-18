import { Cell } from "../subject/Cell";
import { Board } from "../subject/board/board";
import { Set } from "../../shared/set";
import { Point } from "../../shared/point";
import { Stack } from "../../shared/stack";
import { MovementModel } from "./movementModel";
import { HuristicModel } from "./huristicModel";
export interface PathFindingModel {
  setStartPoint(startP: Point): void;
  setEndPoint(endP: Point): void;
  toggleWall(point: Point): void;
  setBoard(board: Board): void;
  setWallPositions(wallP: Array<Point>): void;
  setCurrentPoint(x: number, y: number): void;
  setMovementModel(movementModel: MovementModel): void;
  setHuristicModel(huristicModel: HuristicModel): void;
  getPath(): Array<Cell>;
  getCurrentPoints(): Stack<Cell>;
  getVisited(): Set<Cell>;
  getBoard(): Board;
  start(): void;
  resetA_startVars(): void;
  resetPrevNext(): void;
}
