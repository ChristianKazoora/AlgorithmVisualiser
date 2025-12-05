import { MazeManager } from "../../../model/subject/maze/mazeManager";
import { autoMazeGenarator } from "../../../model/subject/maze/auto/autoMazeGenarator";
import { BinaryTreeMazeAuto } from "../../../model/subject/maze/auto/binaryTreeMazeAuto";
import { PrimsMazeAuto } from "../../../model/subject/maze/auto/primsMazeAuto";
import { RecursiveDivisionMazeAuto } from "../../../model/subject/maze/auto/recursiveDivisionMazeAuto";
import { MazeModel } from "../../../model/Interfaces/mazeModel";
import { CellStateHelper } from "../cellStateHelper";

/** Available maze algorithms for auto mode */
export type AutoMazeAlgorithm =
  | "backtracker"
  | "binary-tree"
  | "prims"
  | "recursive-division";

/**
 * Cell state class for automatic maze generation and pathfinding.
 */
export class AutoCellState extends CellStateHelper {
  private mazeAlgorithm: AutoMazeAlgorithm = "backtracker";

  /**
   * Set the maze generation algorithm
   */
  setMazeAlgorithm(algorithm: AutoMazeAlgorithm): void {
    this.mazeAlgorithm = algorithm;
  }

  private globalMouseMoveListener: ((e: MouseEvent) => void) | null = null;

  /**
   * Create the appropriate maze generator based on selected algorithm
   */
  private createMazeGenerator(): MazeModel {
    switch (this.mazeAlgorithm) {
      case "binary-tree":
        return new BinaryTreeMazeAuto();
      case "prims":
        return new PrimsMazeAuto();
      case "recursive-division":
        return new RecursiveDivisionMazeAuto();
      case "backtracker":
      default:
        return new autoMazeGenarator();
    }
  }

  resetBoard(): void {
    // Clear walls array
    this.walls = [];

    // Clear all cell properties (visited, path) and reset maze walls to TRUE for auto mode
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.ifNull(this.grid)[i][j];
        // Clear all cell states except start and end
        if (!cell.isStart && !cell.isEnd) {
          cell.isWall = false;
        }
        // Clear dynamic properties
        (cell as any).isVisited = false;
        (cell as any).isPath = false;
        (cell as any).isCurrent = false;

        // For AUTO mode: Reset maze walls to TRUE (all walls up initially)
        cell.northW = true;
        cell.southW = true;
        cell.eastW = true;
        cell.westW = true;

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

    // Reset renderer state and re-render the board to show walls reset
    const renderer = this.algorithmController?.getRenderer() as any;
    if (renderer?.resetState) {
      renderer.resetState();
    }
    this.algorithmController?.reRenderBoard();
  }

  animatePath(onComplete?: () => void): void {
    this.getData();
    this.algorithmController?.animatePath(onComplete);
  }

  animateMazeGeneration(onComplete?: () => void): void {
    // First, generate the maze data (but don't render the final state yet)
    const generator = new MazeManager(this.createMazeGenerator());
    generator.setBoard(this.ifNull(this.board));
    generator.generateMaze();
    this.setBoard(generator.getBoard());
    this.mazeVisitedOrder = generator.getOrderVisited();

    // Now animate the wall-breaking process
    this.algorithmController?.setMazeVisitedOrder(
      this.ifNull(this.mazeVisitedOrder)
    );

    // After animation is set up, trigger the animation with callback
    this.algorithmController?.animateMaze(() => {
      // After maze animation completes, update pathfinding data
      this.algorithmController?.getData();
      // Then call the user's callback if provided
      if (onComplete) {
        onComplete();
      }
    });
  }

  generateMaze(): void {
    // Just generate the maze and render the final state immediately (no animation)
    const generator = new MazeManager(this.createMazeGenerator());
    generator.setBoard(this.ifNull(this.board));
    generator.generateMaze();
    this.setBoard(generator.getBoard());
    this.mazeVisitedOrder = generator.getOrderVisited();
    this.algorithmController?.reRenderBoard();
    // Update pathfinding data after maze generation
    this.algorithmController?.getData();
  }

  addEventListeners(): void {
    this.algorithmController?.reRenderBoard();
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    let isDragging = false;
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
      const cell = this.ifNull(this.grid)[i][j];

      if (cell.isStart || cell.isEnd) {
        this.currentPressedCell = cell;
        dragType = cell.isStart ? "start" : "end";
      }

      this.algorithmController?.reRenderBoard();
    };

    // Shared drag end handler
    const handleDragEnd = (i: number, j: number) => {
      isDragging = false;
      lastDraggedCell = null;

      if (dragType === "start") {
        this.setStart({ x: i, y: j });
      } else if (dragType === "end") {
        this.setEnd({ x: i, y: j });
      }

      this.draggingStart_End = "";
      this.algorithmController?.getData();
      this.algorithmController?.reRenderBoard();
      this.algorithmController?.reRunAnimatePath();
      dragType = null;
    };

    // Shared drag over handler - preview start/end markers as they're dragged
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
