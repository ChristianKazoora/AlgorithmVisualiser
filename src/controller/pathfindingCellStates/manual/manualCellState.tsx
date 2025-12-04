import { Point } from "../../../shared/point";
import { MazeManager } from "../../../model/subject/maze/mazeManager";
import {
  RandomWallsManual,
  WallDistribution,
} from "../../../model/subject/maze/manual/randomWallsManual";
import { CellularAutomataManual } from "../../../model/subject/maze/manual/cellularAutomataManual";
import { MazeModel } from "../../../model/Interfaces/mazeModel";
import { CellStateHelper } from "../cellStateHelper";
import { PathConfig } from "../../cellDecorations/pathConfig";
import { Cell } from "../../../model/subject/Cell";

/** Available maze algorithms for manual mode */
export type ManualMazeAlgorithm = "random" | "cellular-automata";

/**
 * Cell state class for manual maze generation and pathfinding.
 */
export class ManualCellState extends CellStateHelper {
  private mazeAlgorithm: ManualMazeAlgorithm = "random";
  private wallDensity: number = 0.3;
  private wallDistribution: WallDistribution = "uniform";
  private mazeAnimationTimeouts: ReturnType<typeof setTimeout>[] = [];

  /**
   * Set the maze generation algorithm
   */
  setMazeAlgorithm(algorithm: ManualMazeAlgorithm): void {
    this.mazeAlgorithm = algorithm;
  }

  /**
   * Set wall density for maze generation (0-1)
   */
  setWallDensity(density: number): void {
    this.wallDensity = Math.max(0, Math.min(1, density));
  }

  /**
   * Get the current wall density
   */
  getWallDensity(): number {
    return this.wallDensity;
  }

  /**
   * Set wall distribution pattern
   */
  setWallDistribution(distribution: WallDistribution): void {
    this.wallDistribution = distribution;
  }

  /**
   * Get current wall distribution pattern
   */
  getWallDistribution(): WallDistribution {
    return this.wallDistribution;
  }

  /**
   * Create the appropriate maze generator based on selected algorithm
   */
  private createMazeGenerator(): MazeModel {
    switch (this.mazeAlgorithm) {
      case "cellular-automata":
        return new CellularAutomataManual(this.wallDensity, 4, 4);
      case "random":
      default:
        return new RandomWallsManual(this.wallDensity, this.wallDistribution);
    }
  }

  /**
   * Animate maze generation - progressively reveal walls
   */
  animateMazeGeneration(onComplete?: () => void): void {
    // Clear any existing animation timeouts
    this.clearMazeAnimationTimeouts();

    // First, generate the maze data
    const generator = new MazeManager(this.createMazeGenerator());
    generator.setBoard(this.ifNull(this.board));
    generator.generateMaze();
    this.setBoard(generator.getBoard());
    this.mazeVisitedOrder = generator.getOrderVisited();

    // Get the walls to animate
    const wallsToAnimate: Cell[] = [];
    const visitedOrderCopy = generator.getOrderVisited();
    while (visitedOrderCopy.size() > 0) {
      wallsToAnimate.push(visitedOrderCopy.pop() as Cell);
    }

    // Temporarily hide all walls for animation
    for (const cell of wallsToAnimate) {
      cell.isWall = false;
    }

    // Update walls array to sync with cell states
    this.walls = [];
    this.setWalls(this.walls);
    this.algorithmController?.reRenderBoard();

    // Animate walls appearing one by one
    const delayPerWall = PathConfig.ANIMATION.MAZE_CELL_DELAY;

    for (let i = 0; i < wallsToAnimate.length; i++) {
      const timeout = setTimeout(() => {
        const cell = wallsToAnimate[i];
        cell.isWall = true;
        this.walls.push({ x: cell.x, y: cell.y });
        this.setWalls(this.walls);
        this.algorithmController?.reRenderBoard();

        // Call onComplete after last wall
        if (i === wallsToAnimate.length - 1) {
          this.algorithmController?.getData();
          if (onComplete) {
            onComplete();
          }
        }
      }, delayPerWall * i);

      this.mazeAnimationTimeouts.push(timeout);
    }

    // If no walls to animate, call onComplete immediately
    if (wallsToAnimate.length === 0) {
      this.algorithmController?.getData();
      if (onComplete) {
        onComplete();
      }
    }
  }

  /**
   * Clear maze animation timeouts
   */
  private clearMazeAnimationTimeouts(): void {
    for (const timeout of this.mazeAnimationTimeouts) {
      clearTimeout(timeout);
    }
    this.mazeAnimationTimeouts = [];
  }

  /**
   * Generate maze immediately without animation
   */
  generateMaze(): void {
    // Clear any running animation
    this.clearMazeAnimationTimeouts();

    const generator = new MazeManager(this.createMazeGenerator());
    generator.setBoard(this.ifNull(this.board));
    generator.generateMaze();
    this.setBoard(generator.getBoard());
    this.mazeVisitedOrder = generator.getOrderVisited();

    // Sync walls array with cell isWall states
    this.walls = [];
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.grid![i][j];
        if (cell.isWall) {
          this.walls.push({ x: i, y: j });
        }
      }
    }
    this.setWalls(this.walls);

    // Update pathfinding data after maze generation
    this.algorithmController?.getData();
    this.algorithmController?.reRenderBoard();
  }
  /**
   * Add walls to the maze.
   * @param pos - The position of the wall to add.
   */
  addWalls(pos: Point): void {
    // Sync cell isWall property
    const cell = this.grid![pos.x][pos.y];
    cell.isWall = true;
    this.walls.push(pos);
    this.setWalls(this.walls);
  }

  resetBoard(): void {
    // Clear walls array
    this.walls = [];

    // Clear all cell properties (visited, path, walls)
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.ifNull(this.grid)[i][j];
        // Clear all cell states except start and end
        if (!cell.isStart && !cell.isEnd) {
          cell.isWall = false;
        }
        // Clear dynamic properties that may not be in the type definition
        (cell as any).isVisited = false;
        (cell as any).isPath = false;
        (cell as any).isCurrent = false;

        // Reset pathfinding scores
        cell.fScore = 0;
        cell.gScore = 0;
        cell.hScore = 0;

        // Reset previousCell/nextCell to clear stale path data
        cell.previousCell = undefined;
        cell.nextCell = undefined;
      }
    }

    // Update the algorithm controller with empty walls
    this.setWalls([]);

    // Reset renderer state and re-render the board
    const renderer = this.algorithmController?.getRenderer() as any;
    if (renderer?.resetState) {
      renderer.resetState();
    }
    this.algorithmController?.reRenderBoard();
  }
  /**
   * Remove walls from the maze.
   * @param pos - The position of the wall to remove.
   */
  removeWalls(pos: Point): void {
    // Sync cell isWall property
    const cell = this.grid![pos.x][pos.y];
    cell.isWall = false;
    this.walls = this.walls.filter((w) => w.x !== pos.x || w.y !== pos.y);
    this.setWalls(this.walls);
  }

  addEventListeners(): void {
    this.algorithmController?.reRenderBoard();
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    let isDragging = false;
    let isAddingWalls = false;
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        let cell = this.ifNull(this.grid)[i][j];
        let currentElement = document.getElementById(
          `cell-${cell.x}-${cell.y}`
        );
        if (currentElement) {
          this.ifNull(currentElement).onmousedown = (e: any) => {
            e.preventDefault();
            isDragging = true;
            if (cell.isStart || cell.isEnd) {
              this.currentPressedCell = cell;
            }
            if (cell.isWall) {
              this.currentPressedCell = cell;
              isAddingWalls = false;
            } else if (!cell.isStart && !cell.isEnd && !cell.isWall) {
              this.currentPressedCell = cell;
              isAddingWalls = true;
            }
            if (isAddingWalls) {
              this.addWalls({ x: i, y: j });
            } else if (!isAddingWalls) {
              this.removeWalls({ x: i, y: j });
            }
            this.algorithmController?.reRenderBoard();
          };

          this.ifNull(currentElement).onmouseup = (e: any) => {
            e.preventDefault();
            isAddingWalls = false;
            isDragging = false;
            this.draggingStart_End = "";
            if (this.currentPressedCell) {
              if (this.currentPressedCell.isStart) {
                this.setStart({ x: i, y: j });
              } else if (this.currentPressedCell.isEnd) {
                this.setEnd({ x: i, y: j });
              }
            }
            this.algorithmController?.getData();
            this.algorithmController?.reRenderBoard();
            this.algorithmController?.reRunAnimatePath();
          };

          this.ifNull(currentElement).onmouseenter = (e: any) => {
            e.preventDefault();

            if (isDragging && this.currentPressedCell) {
              if (this.draggingStart_End === "start") {
                this.setStart({ x: i, y: j });
              } else if (this.draggingStart_End === "end") {
                this.setEnd({ x: i, y: j });
              } else if (isAddingWalls) {
                if (!this.walls.some((wall) => wall.x === i && wall.y === j)) {
                  this.addWalls({ x: i, y: j });
                } else {
                  this.removeWalls({ x: i, y: j });
                }
              } else {
                this.removeWalls({ x: i, y: j });
              }
              this.algorithmController?.reRenderBoard();
            }
          };

          this.ifNull(currentElement).onmouseleave = (e: any) => {
            e.preventDefault();
            if (isDragging && this.currentPressedCell) {
              if (
                this.draggingStart_End === "start" ||
                this.currentPressedCell.isStart
              ) {
                this.draggingStart_End = "start";
                this.removeStart({ x: i, y: j });
              } else if (
                this.currentPressedCell.isEnd ||
                this.draggingStart_End === "end"
              ) {
                this.draggingStart_End = "end";
                this.removeEnd({ x: i, y: j });
              }
              this.algorithmController?.reRenderBoard();
            }
          };
        }
      }
    }
  }
}
