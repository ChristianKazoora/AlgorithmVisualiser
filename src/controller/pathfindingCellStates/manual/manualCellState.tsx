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
  private globalMouseMoveListener: ((e: MouseEvent) => void) | null = null;

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
    let dragStartCell: { i: number; j: number } | null = null;
    let lastDraggedCell: { i: number; j: number } | null = null;
    let dragType: "start" | "end" | null = null;

    // Clean up any previously registered listener before adding a new one
    if (this.globalMouseMoveListener) {
      document.removeEventListener("mousemove", this.globalMouseMoveListener);
      document.removeEventListener("pointermove", this.globalMouseMoveListener);
      this.globalMouseMoveListener = null;
    }

    const boardEl = document.getElementById("board");
    const firstCell = document.getElementById("cell-0-0");
    const cellSize = firstCell
      ? firstCell.getBoundingClientRect().width
      : parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--dynamic-cell-size"
          )
        ) || 20;

    const pointerToCell = (clientX: number, clientY: number) => {
      if (!boardEl) return null;
      const rect = boardEl.getBoundingClientRect();
      const x = Math.floor((clientY - rect.top) / cellSize);
      const y = Math.floor((clientX - rect.left) / cellSize);
      if (x < 0 || y < 0) return null;
      if (x >= gridLength || y >= gridWidth) return null;
      return { i: x, j: y } as const;
    };

    // Shared drag start handler
    const handleDragStart = (i: number, j: number) => {
      isDragging = true;
      dragStartCell = { i, j };
      const cell = this.ifNull(this.grid)[i][j];

      if (cell.isStart || cell.isEnd) {
        this.currentPressedCell = cell;
        dragType = cell.isStart ? "start" : "end";
      }

      if (cell.isWall) {
        this.currentPressedCell = cell;
        isAddingWalls = false;
        this.removeWalls({ x: i, y: j });
      } else if (!cell.isStart && !cell.isEnd && !cell.isWall) {
        this.currentPressedCell = cell;
        isAddingWalls = true;
        this.addWalls({ x: i, y: j });
      }
      this.algorithmController?.reRenderBoard();
    };

    // Shared drag end handler
    const handleDragEnd = (i: number, j: number) => {
      isDragging = false;
      isAddingWalls = false;
      lastDraggedCell = null;

      if (dragType === "start") {
        this.setStart({ x: i, y: j });
      } else if (dragType === "end") {
        this.setEnd({ x: i, y: j });
      }

      this.draggingStart_End = "";
      dragStartCell = null;
      dragType = null;
      this.algorithmController?.getData();
      this.algorithmController?.reRenderBoard();
      this.algorithmController?.reRunAnimatePath();
    };

    // Shared drag over handler - update walls and preview start/end during drag
    const handleDragOver = (i: number, j: number) => {
      if (!isDragging || !this.currentPressedCell) return;

      // Skip if we're already on this cell
      if (lastDraggedCell && lastDraggedCell.i === i && lastDraggedCell.j === j)
        return;
      lastDraggedCell = { i, j };

      // Preview start/end markers as they're dragged - clear old position first
      if (dragType === "start") {
        this.draggingStart_End = "start";
        const oldStart = this.getStart();
        if (oldStart && (oldStart.x !== i || oldStart.y !== j)) {
          this.removeStart(oldStart);
        }
        this.setStart({ x: i, y: j });
        this.algorithmController?.reRenderBoard();
      } else if (dragType === "end") {
        this.draggingStart_End = "end";
        const oldEnd = this.getEnd();
        if (oldEnd && (oldEnd.x !== i || oldEnd.y !== j)) {
          this.removeEnd(oldEnd);
        }
        this.setEnd({ x: i, y: j });
        this.algorithmController?.reRenderBoard();
      } else if (isAddingWalls) {
        // Only add/remove walls during drag
        if (!this.walls.some((wall) => wall.x === i && wall.y === j)) {
          this.addWalls({ x: i, y: j });
        } else {
          this.removeWalls({ x: i, y: j });
        }
        this.algorithmController?.reRenderBoard();
      }
    };

    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.ifNull(this.grid)[i][j];
        const currentElement = document.getElementById(
          `cell-${cell.x}-${cell.y}`
        );

        if (currentElement) {
          // Disable touch scrolling during interactions
          currentElement.style.touchAction = "none";

          // Mouse events
          currentElement.onmousedown = (e: MouseEvent) => {
            e.preventDefault();
            handleDragStart(i, j);
          };

          currentElement.onmouseup = (e: MouseEvent) => {
            e.preventDefault();
            handleDragEnd(i, j);
          };

          currentElement.onmouseenter = (e: MouseEvent) => {
            e.preventDefault();
            if (isDragging) {
              handleDragOver(i, j);
            }
          };

          currentElement.onmouseleave = (e: MouseEvent) => {
            e.preventDefault();
          };

          // Touch events
          currentElement.ontouchstart = (e: TouchEvent) => {
            e.preventDefault();
            handleDragStart(i, j);
          };

          currentElement.ontouchend = (e: TouchEvent) => {
            e.preventDefault();
            if (e.changedTouches.length > 0) {
              const touch = e.changedTouches[0];
              const element = document.elementFromPoint(
                touch.clientX,
                touch.clientY
              );
              const cellId = (element as HTMLElement)?.closest(
                '[id^="cell-"]'
              )?.id;
              if (cellId) {
                const match = cellId.match(/^cell-(\d+)-(\d+)/);
                if (match) {
                  handleDragEnd(parseInt(match[1], 10), parseInt(match[2], 10));
                  return;
                }
              }
            }
            handleDragEnd(i, j);
          };

          currentElement.ontouchmove = (e: TouchEvent) => {
            e.preventDefault();
            if (isDragging && e.touches.length > 0) {
              const touch = e.touches[0];
              const targetCell = pointerToCell(touch.clientX, touch.clientY);
              if (targetCell) {
                handleDragOver(targetCell.i, targetCell.j);
              }
            }
          };
        }
      }
    }

    // Global mousemove listener to track dragging across cells
    const handleMouseMove = (e: MouseEvent | PointerEvent) => {
      if (!isDragging || !this.currentPressedCell) return;

      const targetCell = pointerToCell(e.clientX, e.clientY);
      if (targetCell) {
        handleDragOver(targetCell.i, targetCell.j);
      }
    };

    // Store listener reference for cleanup
    this.globalMouseMoveListener = handleMouseMove;
    document.addEventListener("mousemove", this.globalMouseMoveListener);
    document.addEventListener("pointermove", this.globalMouseMoveListener);
  }
}
