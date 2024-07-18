import { Point } from "../../../../shared/point";
import { Cell } from "../../Cell";
import { Set } from "../../../../shared/set";
import { Board } from "../../board/board";
import { BfsModel } from "./bfsModel";
import { Stack } from "../../../../shared/stack";
import { MovementModel } from "../../../Interfaces/movementModel";
import { MovementManager } from "../../board/movementManager";
import { PathFindingModel } from "../../../Interfaces/pathfindingModel";
import { GetManulNeigbourWD } from "../../board/strategies/manual/getManulNeigbourWD";
import { HuristicModel } from "../../../Interfaces/huristicModel";
import { manhattanDistance } from "../../board/huristics/manhattanDistance";

export class PathFindingController implements PathFindingModel {
  algorithm: PathFindingModel;
  constructor(
    _algo: PathFindingModel = new BfsModel(),
    startP: Point,
    endP: Point,
    board: Board,
    wallP: Array<Point> = new Array<Point>(),
    _movementStrategy: MovementModel = new GetManulNeigbourWD(),
    _huristicModel: HuristicModel = new manhattanDistance()
  ) {
    this.algorithm = _algo;
    this.setBoard(board);
    this.setStartPoint(startP);
    this.setEndPoint(endP);
    this.setWallPositions(wallP);
    this.setMovementModel(_movementStrategy);
    this.setHuristicModel(_huristicModel);
    // this.setCurrentPoint(current.x, current.y);
  }
  setHuristicModel(huristicModel: HuristicModel): void {
    this.algorithm.setHuristicModel(huristicModel);
  }
  resetA_startVars(): void {
    this.algorithm.resetA_startVars();
  }
  resetPrevNext(): void {
    this.algorithm.resetPrevNext();
  }
  getBoard(): Board {
    return this.algorithm.getBoard();
  }

  start(): void {
    this.algorithm.start();
  }
  setMovementModel(movementModel: MovementModel): void {
    this.algorithm.setMovementModel(new MovementManager(movementModel));
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
