import { HuristicModel } from "../../model/Interfaces/huristicModel";
import { MovementModel } from "../../model/Interfaces/movementModel";
import { Board } from "../../model/subject/board/board";
import { Cell } from "../../model/subject/Cell";
import { Point } from "../../shared/point";
import { Stack } from "../../shared/stack";
import { AlgorithmController } from "../interfaces/algorithmController";
import { CellState } from "../interfaces/cellState";
import { GridRenderer } from "../interfaces/gridRenderer";
/**
 * Abstract helper class for Cell State management in the pathfinding visualizer.
 */
export abstract class CellStateHelper implements CellState {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  algorithmController: AlgorithmController | undefined;
  walls: Array<Point> = new Array<Point>();
  start: Point | undefined; //= { x: 0, y: 0 };
  end: Point | undefined; //= { x: 0, y: 1 };
  draggingStart_End = "";
  currentPressedCell: any;
  mazeVisitedOrder: Stack<Cell> | undefined;

  abstract addEventListeners(): void;
  abstract generateMaze(): void;
  abstract animateMazeGeneration(onComplete?: () => void): void;
  abstract resetBoard(): void;

  clearBoard(): void {
    // For AUTO mode: Only clear path/visited states, preserve maze walls
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.ifNull(this.grid)[i][j];

        // Clear ONLY animation states, preserve walls
        (cell as any).isVisited = false;
        (cell as any).isPath = false;
        (cell as any).isCurrent = false;

        // Reset pathfinding scores
        cell.fScore = 0;
        cell.gScore = 0;
        cell.hScore = 0;

        // Reset previousCell to avoid stale path data
        cell.previousCell = undefined;
        cell.nextCell = undefined;

        // DO NOT reset northW, southW, eastW, westW - preserve maze structure
      }
    }

    // Reset renderer state (tracked path cells, timeouts)
    const renderer = this.algorithmController?.getRenderer() as any;
    if (renderer?.resetState) {
      renderer.resetState();
    }

    // Trigger re-render
    this.algorithmController?.reRenderBoard();
  }

  // resetBoard(): void {
  //   // Clear walls array
  //   this.walls = [];

  //   // Clear all cell properties (visited, path, walls)
  //   const gridLength = this.ifNull(this.grid).length;
  //   const gridWidth = this.ifNull(this.grid)[0].length;
  //   for (let i = 0; i < gridLength; i++) {
  //     for (let j = 0; j < gridWidth; j++) {
  //       const cell = this.ifNull(this.grid)[i][j];
  //       // Clear all cell states except start and end
  //       if (!cell.isStart && !cell.isEnd) {
  //         cell.isWall = false;
  //       }
  //       // Clear dynamic properties that may not be in the type definition
  //       (cell as any).isVisited = false;
  //       (cell as any).isPath = false;
  //       (cell as any).isCurrent = false;

  //       // Clear maze walls for auto mode
  //       cell.northW = false;
  //       cell.southW = false;
  //       cell.eastW = false;
  //       cell.westW = false;

  //       // Reset pathfinding scores
  //       cell.fScore = 0;
  //       cell.gScore = 0;
  //       cell.hScore = 0;
  //     }
  //   }

  //   // Update the algorithm controller with empty walls
  //   this.setWalls([]);

  //   // DON'T call reRenderBoard() here - the board version increment
  //   // will trigger a full React re-render which is what we want
  // }
  setHuristicModel(huristicModel: HuristicModel): void {
    this.algorithmController?.setHuristicModel(huristicModel);
  }
  animatePath(onComplete?: () => void): void {
    this.getData();
    this.algorithmController?.animatePath(onComplete);
  }

  /**
   * Async variant that streams algorithm steps into the renderer if supported.
   * Falls back to the existing synchronous path if async is not implemented.
   */
  async animatePathAsync(onComplete?: () => void): Promise<void> {
    const controller = this.algorithmController;
    const renderer = controller?.getRenderer();

    if (
      controller &&
      controller.getDataAsync &&
      renderer &&
      renderer.applyStep
    ) {
      let lastSnapshot: any = null;

      await controller.getDataAsync((snapshot) => {
        // applyStep now handles all visual updates directly
        renderer.applyStep?.(snapshot);
        lastSnapshot = snapshot;
      });

      // For algorithms like BFS that only have path at the end,
      // animate the final path step by step (not all at once)
      if (lastSnapshot?.isComplete && lastSnapshot?.path?.length > 0) {
        // Set the path data first
        renderer.setPath(lastSnapshot.path);

        // Animate the path step-by-step using animateLinePath
        await new Promise<void>((resolve) => {
          renderer.animateLinePath(() => {
            resolve();
          });
        });
      }

      if (onComplete) onComplete();
    } else {
      // Fallback to existing synchronous behavior
      this.animatePath(onComplete);
    }
  }
  setBoard(board: Board): void {
    this.algorithmController?.setBoard(board);
    this.board = board;
    this.grid = board.grid;
  }
  setStart(pos: Point): void {
    this.start = pos;
    this.algorithmController?.setStart(pos);
  }
  setEnd(pos: Point): void {
    this.end = pos;
    this.algorithmController?.setEnd(pos);
  }
  removeStart(pos: Point): void {
    this.algorithmController?.removeStart(pos);
  }
  removeEnd(pos: Point): void {
    this.algorithmController?.removeEnd(pos);
  }
  setMovementStrategy(strategy: MovementModel): void {
    this.algorithmController?.setMovementStrategy(strategy);
  }
  setWalls(walls: Point[]): void {
    this.algorithmController?.setWalls(walls);
  }
  getData(): void {
    this.algorithmController?.getData();
  }
  setAlgorithmController(algorithmController: AlgorithmController): void {
    this.algorithmController = algorithmController;
  }

  setRenderer(renderer: GridRenderer): void {
    this.algorithmController?.setRenderer(renderer);
  }

  getMovementStrategy(): MovementModel {
    return this.algorithmController?.getMovementStrategy() as MovementModel;
  }
  getAlgorithmController(): AlgorithmController {
    return this.algorithmController as AlgorithmController;
  }
  getRenderer(): GridRenderer {
    return this.algorithmController?.getRenderer() as GridRenderer;
  }
  getStart(): Point {
    return this.ifNull(this.start);
  }
  getEnd(): Point {
    return this.ifNull(this.end);
  }
  draw() {
    return this.algorithmController?.draw();
  }
  /**
   *
   * @param data
   * @returns
   */
  ifNull(data: any): any {
    if (data) {
      return data;
    } else {
      throw new Error("Method not implemented.");
    }
  }
}
