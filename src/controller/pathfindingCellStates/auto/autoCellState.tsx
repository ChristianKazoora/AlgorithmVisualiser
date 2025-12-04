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
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.ifNull(this.grid)[i][j];
        const currentElement = document.getElementById(
          `cell-${cell.x}-${cell.y}`
        );
        if (currentElement) {
          this.ifNull(currentElement).onmousedown = (e: any) => {
            e.preventDefault();
            isDragging = true;
            if (cell.isStart || cell.isEnd) {
              this.currentPressedCell = cell;
            }

            this.algorithmController?.reRenderBoard();
          };
          this.ifNull(currentElement).onmouseup = (e: any) => {
            e.preventDefault();
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
