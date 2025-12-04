import { Point } from "../../../../shared/point";
import { Cell } from "../../Cell";
import { Set } from "../../../../shared/set";
import { Board } from "../../board/board";
import { BfsModel, BfsStepSnapshot } from "./bfsModel";
import { DfsModel, DfsStepSnapshot } from "./dfsModel";
import { A_StarModel, AStarStepSnapshot } from "./aStarModel";
import { Stack } from "../../../../shared/stack";
import { MovementModel } from "../../../Interfaces/movementModel";
import { MovementManager } from "../../board/movementManager";
import { PathFindingModel } from "../../../Interfaces/pathFindingModel";
import { GetManulNeigbourWD } from "../../board/strategies/manual/getManulNeigbourWD";
import { HuristicModel } from "../../../Interfaces/huristicModel";
import { manhattanDistance } from "../../board/huristics/manhattanDistance";
/**
 * PathFindingController class that implements the PathFindingModel interface.
 */
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
  resetHuristicVars(): void {
    this.algorithm.resetHuristicVars();
  }
  resetPrevNext(): void {
    this.algorithm.resetPrevNext();
  }
  getBoard(): Board {
    return this.algorithm.getBoard();
  }
  usesHeuristic(): boolean {
    return this.algorithm.usesHeuristic();
  }
  getAlgorithmName(): string {
    return this.algorithm.getAlgorithmName();
  }

  start(): void {
    this.algorithm.start();
  }

  /**
   * Async step-wise iteration over the underlying algorithm, if it supports it.
   * Consumers can use this to visualize progress without blocking the UI.
   */
  async *asyncSteps(): AsyncGenerator<AStarStepSnapshot, void, void> {
    // A* async steps
    if (this.algorithm instanceof A_StarModel) {
      for await (const step of (this.algorithm as A_StarModel).aStarAsyncSteps()) {
        yield step;
      }
      return;
    }

    // BFS async steps
    if (this.algorithm instanceof BfsModel) {
      for await (const step of (this.algorithm as BfsModel).bfsAsyncSteps()) {
        yield step as BfsStepSnapshot;
      }
      return;
    }

    // DFS async steps
    if (this.algorithm instanceof DfsModel) {
      for await (const step of (this.algorithm as DfsModel).dfsAsyncSteps()) {
        yield step as DfsStepSnapshot;
      }
    }
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
