import { HuristicModel } from "../../model/Interfaces/huristicModel";
import { MovementModel } from "../../model/Interfaces/movementModel";
import { Board } from "../../model/subject/board/board";
import { Point } from "../../shared/point";
import { mainController } from "../interfaces/mainController";
import { AlgorithmController } from "./algorithmController";
import { GridRenderer } from "./gridRenderer";
/**
 * Interface for Cell State management in the pathfinding visualizer.
 */
export interface CellState extends mainController {
  /**
   * Animates the cell state.
   * @param onComplete - Callback function to be called when the animation is complete.
   */
  animatePath(onComplete?: () => void): void;

  /**
   * Animates the pathfinding process asynchronously with step-by-step visualization.
   * @param onComplete - Callback function to be called when the animation is complete.
   */
  animatePathAsync?(onComplete?: () => void): Promise<void>;

  /**
   * Sets the board for the cell state.
   * @param board - The board to be set.
   */
  setBoard(board: Board): void;

  /**
   * Sets the start position.
   * @param pos - The start position to be set.
   */
  setStart(pos: Point): void;

  /**
   * Sets the end position.
   * @param pos - The end position to be set.
   */
  setEnd(pos: Point): void;

  /**
   * Removes the start position.
   * @param pos - The start position to be removed.
   */
  removeStart(pos: Point): void;

  /**
   * Removes the end position.
   * @param pos - The end position to be removed.
   */
  removeEnd(pos: Point): void;

  /**
   * Sets the movement strategy.
   * @param strategy - The movement strategy to be set.
   */
  setMovementStrategy(strategy: MovementModel): void;

  /**
   * Clears the board.
   */
  clearBoard(): void;

  /**
   * Resets the board to original state.
   */
  resetBoard(): void;

  /**
   * Sets the walls.
   * @param walls - The walls to be set.
   */
  setWalls(walls: Array<Point>): void;

  /**
   * Gets the data for the algorithm's execution.
   */
  getData(): void;
  /**
   * Sets the algorithm controller.
   * @param algorithmController - The algorithm controller to be set.
   */
  setAlgorithmController(algorithmController: AlgorithmController): void;
  /**
   * Generates a maze on the board.
   */
  generateMaze(): void;
  /**
   * Animates the maze generation.
   * @param onComplete - Callback function to be called when the animation is complete.
   */
  animateMazeGeneration(onComplete?: () => void): void;
  /**
   * Sets the renderer for the grid.
   * @param renderer - The grid renderer to be set.
   */
  setRenderer(renderer: GridRenderer): void;
  /**
   * Sets the heuristic model.
   * @param huristicModel - The heuristic model to be set.
   */
  setHuristicModel(huristicModel: HuristicModel): void;
  /**
   * Adds event listeners for user interactions.
   */
  addEventListeners(): void;
  /**   * Sets the board for the cell state.
   * @param board The board to be set.
   */
  setBoard(board: Board): void;
  /**
   * Sets the start position.
   * @param pos The start position to be set.
   */
  setStart(pos: Point): void;
  /**
   * Sets the end position.
   * @param pos The end position to be set.
   */
  setRenderer(renderer: GridRenderer): void;

  /**
   * Sets the movement strategy.
   * @param strategy The movement strategy to be set.
   */
  setMovementStrategy(strategy: MovementModel): void;
  /**
   * Gets the movement strategy.
   * @returns The current movement strategy.
   */
  getMovementStrategy(): MovementModel;
  /**
   * Gets the algorithm controller.
   * @returns The current algorithm controller.
   */
  getAlgorithmController(): AlgorithmController;
  /**
   * Gets the grid renderer.
   * @returns The current grid renderer.
   */
  getRenderer(): GridRenderer;
  /**
   * Gets the start position.
   * @returns The current start position.
   */
  getStart(): Point;
  /**
   * Gets the end position.
   * @returns The current end position.
   */
  getEnd(): Point;
}
