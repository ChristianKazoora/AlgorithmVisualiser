import { Cell } from "../../model/subject/Cell";
import { Board } from "../../model/subject/board/board";
import { Stack } from "../../shared/stack";
import { Set } from "../../shared/set";
/**
 * Interface for Grid Renderers in the pathfinding visualizer.
 */
export interface GridRenderer {
  /**
   * Animates the pathfinding process.
   * @param onComplete - Callback function to be called when the animation is complete.
   */
  animatePath(onComplete?: () => void): void;

  /**
   * Completes the pathfinding process immediately.
   */
  completePathImmediately(): void;

  /**
   * Animates the maze generation process.
   * @param onComplete - Callback function to be called when the animation is complete.
   */
  animateMaze(onComplete?: () => void): void;

  /**
   * Completes the maze generation process immediately.
   */
  completeMazeImmediately(): void;

  /**
   * Renders the grid.
   * @returns The rendered grid.
   */
  render(): any;
  /**
   * Sets the path to be animated.
   * @param path - The path as an array of cells.
   */
  setPath(path: Array<Cell>): void;
  /**
   * Sets the board for the renderer.
   * @param board - The board to be set.
   */
  setBoard(board: Board): void;
  /**
   * Sets the current searched points to be animated.
   * @param points - The current points as a stack of cells in the order they were searched.
   */
  setCurrentPoints(points: Stack<Cell>): void;
  /**
   * Re-renders the board.
   */
  reRenderBoard(): void;
  /**
   * Re-runs the pathfinding animation.
   */
  reRunAnimatePath(): void;
  /**
   * Sets the order of cells visited during maze generation for animation.
   * @param OrderVisited - The order of visited cells.
   */
  setMazeVisitedOrder(OrderVisited: Stack<Cell>): void;

  /**
   * Optional hook to apply a single async algorithm step snapshot.
   */
  applyStep?(snapshot: {
    current: Cell | null;
    visited: Set<Cell>;
    path: Array<Cell>;
    isComplete: boolean;
  }): void;

  /**
   * Animates the path line step-by-step.
   * @param onComplete - Callback function to be called when the animation is complete.
   */
  animateLinePath(onComplete?: () => void): void;
}
