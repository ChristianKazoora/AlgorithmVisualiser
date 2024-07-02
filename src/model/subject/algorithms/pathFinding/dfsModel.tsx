import { Point } from "../../../../shared/point";
import { Set } from "../../../../shared/set";
import { Stack } from "../../../../shared/stack";
import { MovementModel } from "../../../Interfaces/movementModel";
import { PathfindingModel } from "../../../Interfaces/PathfindingModel";
import { Cell } from "../../Cell";
import { Board } from "../../board/board";

export class DfsModel implements PathfindingModel {
  setStartPoint(startP: Point): void {
    throw new Error("Method not implemented.");
  }
  setEndPoint(endP: Point): void {
    throw new Error("Method not implemented.");
  }
  toggleWall(point: Point): void {
    throw new Error("Method not implemented.");
  }
  setBoard(board: Board): void {
    throw new Error("Method not implemented.");
  }
  setWallPositions(wallP: Point[]): void {
    throw new Error("Method not implemented.");
  }
  setCurrentPoint(x: number, y: number): void {
    throw new Error("Method not implemented.");
  }
  setMovementModel(movementModel: MovementModel): void {
    throw new Error("Method not implemented.");
  }
  getPath(): Cell[] {
    throw new Error("Method not implemented.");
  }
  getCurrentPoints(): Stack<Cell> {
    throw new Error("Method not implemented.");
  }
  getVisited(): Set<Cell> {
    throw new Error("Method not implemented.");
  }
  getBoard(): Board {
    throw new Error("Method not implemented.");
  }
  start(): void {
    throw new Error("Method not implemented.");
  }
}
