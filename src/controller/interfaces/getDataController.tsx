import { Point } from "../../shared/point";
import { Board } from "../../model/subject/board/board";
import { MovementModel } from "../../model/Interfaces/movementModel";
import { Cell } from "../../model/subject/Cell";
import { Stack } from "../../shared/stack";
import { HuristicModel } from "../../model/Interfaces/huristicModel";
import { Set } from "../../shared/set";
/**
 * Interface for getting (and setting some data) from the controller.
 */
export interface GetDataController {
  /**
   * sets the board for the controller.
   * @param board - The board to be set.
   */
  setBoard(board: Board): void;
  /**
   * sets the start position for the controller.
   * @param pos - The start position to be set.
   */
  setStart(pos: Point): void;
  /**
   * sets the end position for the controller.
   * @param pos - The end position to be set.
   */
  setEnd(pos: Point): void;
  /**
   * sets the heuristic model for the controller.
   * @param huristicModel - The heuristic model to be set.
   */
  setHuristicModel(huristicModel: HuristicModel): void;
  /**
   * sets the movement strategy for the controller.
   * @param strategy - The movement strategy to be set.
   */
  setMovementStrategy(strategy: MovementModel): void;
  /**
   * sets the walls for the controller.
   * @param walls - The walls to be set.
   */
  setWalls(walls: Array<Point>): void;
  /**
   * gets the current board.
   */
  getBoard(): Board;
  /**
   * get the current points stack.
   */
  getCurrentPoints(): Stack<Cell>;
  /**
   * get the visited set.
   */
  getVisited(): Set<Cell>;
  /**
   * get the path array.
   */
  getPath(): Array<Cell>;
  /**
   * Fetch and prepare data required for the algorithm's execution
   */
  getData(): void;

  /**
   * Optional async variant that yields step snapshots during execution.
   */
  getDataAsync?(
    onStep?: (snapshot: {
      current: Cell | null;
      visited: Set<Cell>;
      path: Array<Cell>;
      isComplete: boolean;
    }) => void,
    shouldAbort?: () => boolean
  ): Promise<void>;
  /**
   * Check if the algorithm uses heuristic
   * @returns true if uses heuristic, false otherwise
   */
  usesHeuristic(): boolean;
  /**
   * Get the name of the algorithm
   * @returns The name of the algorithm
   */
  getAlgorithmName(): string;
}
