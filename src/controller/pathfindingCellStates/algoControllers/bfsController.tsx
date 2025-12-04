import { Cell } from "../../../model/subject/Cell";
import { Board } from "../../../model/subject/board/board";
import { Stack } from "../../../shared/stack";
import { BfsData } from "../getData/bfsData";
import { ControllerHelper } from "./controllerHelper";

/**
 * Controller class for the BFS pathfinding algorithm.
 */
export class BfsController extends ControllerHelper {
  constructor() {
    super();
    this.data = new BfsData();
  }

  getData(): void {
    this.data?.setBoard(this.ifNull(this.board));
    this.data?.setEnd(this.ifNull(this.end));
    this.data?.setStart(this.ifNull(this.start));
    this.data?.setWalls(this.ifNull(this.walls));
    this.data?.setMovementStrategy(this.ifNull(this.neighbourStrategy));
    this.data?.getData();
    this.setData();
  }

  async getDataAsync(
    onStep?: (snapshot: {
      current: Cell | null;
      visited: import("../../../shared/set").Set<Cell>;
      path: Array<Cell>;
      isComplete: boolean;
    }) => void
  ): Promise<void> {
    // Reset abort flag before starting
    this.resetAsyncAbort();

    this.data?.setBoard(this.ifNull(this.board));
    this.data?.setEnd(this.ifNull(this.end));
    this.data?.setStart(this.ifNull(this.start));
    this.data?.setWalls(this.ifNull(this.walls));
    this.data?.setMovementStrategy(this.ifNull(this.neighbourStrategy));
    if (this.data?.getDataAsync) {
      await this.data.getDataAsync(onStep as any, () => this.isAsyncAborted());
    }
    this.setData();
  }
  private setData(): void {
    this.visited = this.data?.getVisited();
    this.currentPoints = new Stack<Cell>(); // Create a new Stack object
    this.visited?.forEach((cell) => this.currentPoints?.push(cell)); // Copy elements from the Set to the Stack
    this.currentPoints?.reverse(); // Reverse the order of the elements in the Stack
    this.path = this.data?.getPath() as Array<Cell> | undefined;
    this.board = this.data?.getBoard() as Board;
    this.renderer.setCurrentPoints(this.currentPoints);
    this.renderer.setPath(this.ifNull(this.path));
  }
}
