import { Cell } from "../subject/Cell";
import { Board } from "../subject/board/board";
import { Set } from "../../shared/set";
import { Point } from "../../shared/point";
import { Stack } from "../../shared/stack";
import { MovementModel } from "./movementModel";
import { HuristicModel } from "./huristicModel";
/**
 * Interface representing the model of a Pathfinding algorithm in the pathfinding visualizer.
 */
export interface PathFindingModel {
  /**
   * Sets the start point for the pathfinding algorithm.
   * @param startP - The start point to be set.
   */
  setStartPoint(startP: Point): void;
  /**
   * Sets the end point for the pathfinding algorithm.
   * @param endP - The end point to be set.
   */
  setEndPoint(endP: Point): void;
  /**
   * Toggles the wall state of a cell.
   * @param point - The point representing the cell to toggle.
   */
  toggleWall(point: Point): void;
  /**
   * Sets the board for the pathfinding algorithm.
   * @param board - The board to be set.
   */
  setBoard(board: Board): void;
  /**
   * Sets the wall positions for the pathfinding algorithm.
   * @param wallP - The array of points representing the wall positions.
   */
  setWallPositions(wallP: Array<Point>): void;

  /**
   * Sets the current point for the pathfinding algorithm.
   * @param x - The x-coordinate of the current point.
   * @param y - The y-coordinate of the current point.
   */
  setCurrentPoint(x: number, y: number): void;
  /**
   * Sets the movement model for the pathfinding algorithm.
   * @param movementModel - The movement model to be set.
   */
  setMovementModel(movementModel: MovementModel): void;
  /**
   * Sets the heuristic model for the pathfinding algorithm.
   * @param huristicModel - The heuristic model to be set.
   */
  setHuristicModel(huristicModel: HuristicModel): void;
  /**
   * Retrieves the path found by the pathfinding algorithm.
   * @returns An array of cells representing the path.
   */
  getPath(): Array<Cell>;
  /**
   * Retrieves the current points for the pathfinding algorithm.
   * @returns A stack of cells representing the current points.
   */
  getCurrentPoints(): Stack<Cell>;
  /**
   * Retrieves the visited cells for the pathfinding algorithm.
   * @returns A set of cells representing the visited cells.
   */
  getVisited(): Set<Cell>;
  /**
   * Retrieves the board for the pathfinding algorithm.
   * @returns The board being used.
   */
  getBoard(): Board;
  /**
   * Starts the pathfinding algorithm.
   */
  start(): void;
  /**
   * Resets the algorithm's start variables.
   */
  resetHuristicVars(): void;
  /**
   * Resets the previous and next points.
   */
  resetPrevNext(): void;
  /**
   * Checks if the algorithm uses a heuristic.
   * @returns True if the algorithm uses a heuristic, false otherwise.
   */
  usesHeuristic(): boolean;
  /**
   * Gets the name of the algorithm.
   * @returns The name of the algorithm.
   */
  getAlgorithmName(): string;
}
