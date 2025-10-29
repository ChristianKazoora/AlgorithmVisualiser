import { Board } from "../../model/subject/board/board";
import { mainController } from "./mainController";
import { MovementModel } from "../../model/Interfaces/movementModel";
import { GridRenderer } from "./gridRenderer";
import { Point } from "../../shared/point";
import { HuristicModel } from "../../model/Interfaces/huristicModel";
import { Stack } from "../../shared/stack";
import { Cell } from "../../model/subject/Cell";

/**
 * Interface for Algorithm Controllers in the pathfinding visualizer.
 */
export interface AlgorithmController extends mainController {
  /**
   * Store the order of cells visited during maze generation for animation
   * @param OrderVisited  The order of visited cells
   */
  setMazeVisitedOrder(OrderVisited: Stack<Cell>): void;
  /**
   * Check if the algorithm uses a heuristic
   * @returns boolean indicating if heuristic is used
   */
  usesHeuristic(): boolean;
  /**
   * Animate the maze generation process
   * @param onComplete  Callback function to be called when animation is complete
   */
  animateMaze(onComplete?: () => void): void;
  /**
   * Complete the maze generation animation immediately
   */
  completeMazeImmediately(): void;
  /**
   * Animate the pathfinding process
   * @param onComplete  Callback function to be called when animation is complete
   */
  animatePath(onComplete?: () => void): void;
  /**
   * Complete the pathfinding animation immediately
   */
  completePathImmediately(): void;
  /**
   * Re-run the pathfinding animation
   */
  reRunAnimatePath(): void;
  /**
   * Set the board for the algorithm
   * @param board The board to be set
   */
  setBoard(board: Board): void;
  /**
   * Set the start position for the algorithm
   * @param pos The position to be set as start
   */
  setStart(pos: Point): void;
  /**
   * Set the heuristic model for the algorithm
   * @param huristicModel The heuristic model to be set
   */
  setHuristicModel(huristicModel: HuristicModel): void;
  /**
   * Remove the start position for the algorithm
   * @param pos The position to be removed as start
   */
  removeStart(pos: Point): void;
  /**
   * Remove the end position for the algorithm
   * @param pos The position to be removed as end
   */
  removeEnd(pos: Point): void;
  /**
   * Set the end position for the algorithm
   * @param pos The position to be set as end
   */
  setEnd(pos: Point): void;

  /**
   * Set the movement strategy for the algorithm
   * @param strategy The movement strategy to be set
   */
  setMovementStrategy(strategy: MovementModel): void;
  /**
   * Get the movement strategy for the algorithm
   * @returns The current movement strategy
   */
  getMovementStrategy(): MovementModel;
  /**
   * Set the walls for the algorithm
   * @param walls The walls to be set
   */
  setWalls(walls: Array<Point>): void;
  /**
   * Fetch and prepare data required for the algorithm's execution
   */
  getData(): void;
  /**
   * Get the name of the algorithm
   * @returns The name of the algorithm
   */
  getAlgorithmName(): string;
  /**
   * Re-render the board to reflect any changes
   */
  reRenderBoard(): void;
  /**
   * Set the grid walls to false
   */
  setGridWallsToFalse(): void;
  /**
   * Set the renderer for the algorithm
   * @param renderer The renderer to be set
   */
  setRenderer(renderer: GridRenderer): void;
  /**
   * Get the renderer for the algorithm
   * @returns The current renderer
   */
  getRenderer(): GridRenderer;
}
