import { Point } from "../../../../shared/point";
import { PathfindingModel } from "../../../Interfaces/PathfindingModel";
import { Cell } from "../../Cell";
import { Set } from "../../../../shared/set";
import { Board } from "../../board";
import { BfsModel } from "./bfsModel";
import { Stack } from "../../../../shared/stack";

export class Pathfinding implements PathfindingModel {
  algorithm: PathfindingModel;
  constructor(
    _algo: PathfindingModel = new BfsModel(),
    startP: Point,
    endP: Point,
    board: Board,
    wallP: Array<Point> = new Array<Point>()
  ) {
    this.algorithm = _algo;
    this.setBoard(board);
    this.setStartPoint(startP);
    this.setEndPoint(endP);
    this.setWallPositions(wallP);
    // this.setCurrentPoint(current.x, current.y);
  }
  getBoard(): Board {
    return this.algorithm.getBoard();
  }

  start(): void {
    this.algorithm.start();
  }
  setWallPositions(wallP: Array<Point>): void {
    this.algorithm.setWallPositions(wallP);
  }
  setStartPoint(pos: Point): void {
    this.algorithm.setStartPoint(pos);
  }
  setEndPoint(pos: Point): void {
    this.algorithm.setEndPoint(pos);
  }
  toggleWall(pos: Point): void {
    this.algorithm.toggleWall(pos);
  }
  setBoard(board: Board): void {
    this.algorithm.setBoard(board);
  }
  setCurrentPoint(x: number, y: number): void {
    this.algorithm.setCurrentPoint(x, y);
  }
  getPath(): Cell[] {
    return this.algorithm.getPath();
  }
  getVisited(): Set<Cell> {
    return this.algorithm.getVisited();
  }
  getCurrentPoints(): Stack<Cell> {
    return this.algorithm.getCurrentPoints();
  }
}
