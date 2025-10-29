import { HuristicModel } from "../../model/Interfaces/huristicModel";
import { Board } from "../../model/subject/board/board";
import { mainController } from "./mainController";
/**
 * Interface for Board Controllers in the pathfinding visualizer.
 */
export interface BoardController extends mainController {
  /**
   * Animates the pathfinding process.
   * @param onComplete - Callback function to be called when the animation is complete.
   */
  animatePath(onComplete?: () => void): void;

  /**
   * Adds event listeners for user interactions.
   */
  addEventListeners(): void;

  /**
   * Sets the board for the controller.
   * @param board - The board to be set.
   */
  setBoard(board: Board): void;

  /**
   * Resizes the board.
   * @param width - The new width of the board.
   * @param height - The new height of the board.
   */
  resize(width: number, height: number): void;

  /**
   * Sets the state of a cell.
   * @param cellState - The state to be set.
   * @param renderer - The renderer to be used.
   * @param movementModel - The movement model to be used.
   */
  setCellState(cellState: any, renderer: any, movementModel: any): void;

  /**
   * Sets the heuristic model.
   * @param huristicModel - The heuristic model to be set.
   */
  setHuristicModel(huristicModel: HuristicModel): void;
  /**
   * Sets the movement model.
   * @param movementModel - The movement model to be set.
   */
  setMovementModel(movementModel: any): void;
  /**
   * Generates a maze on the board.
   */
  generateMaze(): void;
  /**
   * Sets the algorithm controller.
   * @param algorithm The algorithm controller to be set.
   */
  setAlgorithmController(algorithm: any): void;
  /**
   * Gets the algorithm controller.
   */
  getAlgorithmController(): any;
  /**
   * Clears the board.
   */
  clearBoard(): void;
  /**
   * Gets the current board.
   */
  getBoard(): Board;
  /**
   * Gets the start position.
   */
  getStart(): any;
  /**
   * Gets the end position.
   */
  getEnd(): any;
  /**
   * Gets the walls.
   */
  getWalls(): any;
  /**
   *  Gets the movement model.
   */
  getMovementModel(): any;
  /**
   * Animates the maze generation process.
   * @param onComplete - Callback function to be called when the animation is complete.
   */
  animateMaze(onComplete?: () => void): void;
  /**
   * Resets the board to its initial state.
   */
  resetBoard(): void;
  /**
   * Checks if a maze has been generated.
   * @returns True if a maze has been generated, false otherwise.
   */
  isMazeGenerated(): boolean;
  /**
   * Sets the maze generated flag.
   * @param value - The value to set the maze generated flag to.
   */
  setMazeGenerated(value: boolean): void;
}
