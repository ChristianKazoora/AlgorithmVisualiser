import { createRoot } from "react-dom/client";
import { Cell } from "../../../model/subject/Cell";
import { Board } from "../../../model/subject/board/board";
import { Stack } from "../../../shared/stack";
import AutoCell from "../../cellDecorations/paths/autoCell";
import { Line } from "../../cellDecorations/paths/line";
import { GridRenderer } from "../../interfaces/gridRenderer";
import { PathConfig } from "../../cellDecorations/pathConfig";

export class AutoGridRenderer implements GridRenderer {
  private grid: Array<Array<Cell>> | undefined;
  // private board: Board | undefined;
  private path: Array<Cell> | undefined;
  private currentPoints: Stack<Cell> | undefined;
  private rootsMap: Map<string, any>; // Map to store roots
  private mazeVisitedOrder: Stack<Cell> | undefined;
  private ANIMATIONSPEED = PathConfig.ANIMATION.SPEED; // Normalized with ManualGridRenderer for consistent timing
  private timeouts: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    this.rootsMap = new Map(); // Initialize the map in the constructor
  }
  setMazeVisitedOrder(OrderVisited: Stack<Cell>): void {
    this.mazeVisitedOrder = OrderVisited;
  }

  render() {
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    let result: JSX.Element[][] = [];
    for (let i = 0; i < gridLength; i++) {
      let row: JSX.Element[] = [];
      for (let j = 0; j < gridWidth; j++) {
        let cell = this.ifNull(this.grid)[i][j];

        let pos: JSX.Element | undefined;
        pos = new AutoCell(cell).animate();
        if (pos) {
          row.push(pos);
        }
      }
      result.push(row);
    }
    return result;
  }
  setPath(path: Cell[]): void {
    this.path = path;
  }
  clear(): void {
    throw new Error("Method not implemented.");
  }
  setBoard(board: Board): void {
    this.grid = board.grid;
  }
  setCurrentPoints(points: Stack<Cell>): void {
    this.currentPoints = points;
  }

  // Track cells currently shown as path for cleanup
  private currentPathCells: Set<string> = new Set();

  /**
   * Reset renderer state - call when clearing/resetting board
   */
  resetState(): void {
    this.currentPathCells.clear();
    this.clearTimeouts();
    // Clear cached path data to prevent stale animations after reset
    this.path = undefined;
    this.currentPoints = undefined;
  }

  /**
   * Apply a step snapshot and immediately render the current state.
   * This shows the evolving path during A* search (path changes each step).
   */
  applyStep(snapshot: {
    current: Cell | null;
    visited: import("../../../shared/set").Set<Cell>;
    path: Array<Cell>;
    isComplete: boolean;
  }): void {
    const points = new Stack<Cell>();
    snapshot.visited.forEach((cell) => points.push(cell));
    points.reverse();
    this.currentPoints = points;
    this.path = snapshot.path;

    // Render visited cells
    snapshot.visited.forEach((cell) => {
      if (!cell.isStart && !cell.isEnd) {
        const visitedElement = document.getElementById(
          `cell-${cell.x}-${cell.y}-visited`
        );
        if (visitedElement) {
          visitedElement.className = "block bg-neutral rounded-full absolute";
        }
      }
    });

    // Highlight current cell being explored
    if (
      snapshot.current &&
      !snapshot.current.isStart &&
      !snapshot.current.isEnd
    ) {
      const currentElement = document.getElementById(
        `cell-${snapshot.current.x}-${snapshot.current.y}-current`
      );
      if (currentElement) {
        currentElement.className = "block bg-warning rounded-full absolute";
        // Hide it after a brief moment
        setTimeout(() => {
          currentElement.className = "hidden bg-warning rounded-full absolute";
        }, 50);
      }
    }

    // Clear previous path cells that are no longer in the current path
    const newPathCells = new Set<string>();
    snapshot.path.forEach((cell) => {
      newPathCells.add(`${cell.x}-${cell.y}`);
    });

    // Hide cells that were in path but no longer are
    this.currentPathCells.forEach((cellKey) => {
      if (!newPathCells.has(cellKey)) {
        const [x, y] = cellKey.split("-");
        const pathElement = document.getElementById(`cell-${x}-${y}-path`);
        const visitedElement = document.getElementById(
          `cell-${x}-${y}-visited`
        );
        if (pathElement) {
          pathElement.className = "hidden absolute";
        }
        // Show as visited instead
        if (visitedElement) {
          visitedElement.className = "block bg-neutral rounded-full absolute";
        }
      }
    });

    // Render current path (shows evolving "best path so far" for A*)
    snapshot.path.forEach((cell) => {
      if (!cell.isStart && !cell.isEnd) {
        const cellId = `cell-${cell.x}-${cell.y}-path`;
        const pathElement = document.getElementById(cellId);
        const visitedElement = document.getElementById(
          `cell-${cell.x}-${cell.y}-visited`
        );

        if (pathElement) {
          const toAdd = new Line(cell).animate();
          if (this.rootsMap.has(cellId)) {
            const existingRoot = this.rootsMap.get(cellId);
            existingRoot.render(toAdd);
          } else {
            const newRoot = createRoot(pathElement);
            newRoot.render(toAdd);
            this.rootsMap.set(cellId, newRoot);
          }
          pathElement.className = "block absolute";
        }
        if (visitedElement) {
          visitedElement.className = "hidden bg-neutral rounded-full absolute";
        }
      }
    });

    // Update tracked path cells
    this.currentPathCells = newPathCells;
  }
  ifNull(object: any) {
    if (object) {
      return object;
    } else {
      throw new Error("object is undefined");
    }
  }
  animateMaze(onComplete?: () => void): void {
    const points = this.ifNull(this.mazeVisitedOrder) as Stack<Cell>;

    // Clear any existing timeouts first
    this.clearTimeouts();

    // Calculate animation timing constants
    const delayPerCell = Math.sqrt(this.ANIMATIONSPEED + 330) * 3;
    const fadeoutTime = delayPerCell + 100;

    // Cache CSS variable lookups once (major perf improvement)
    const borderColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--bc")
      .trim();
    const borderStyle = `1px solid oklch(${borderColor})`;
    const bgColor = `oklch(${borderColor})`;

    for (let i = 0; i < points.size(); i++) {
      let cell = points.get(i);
      let currentElement = document.getElementById(
        `cell-${cell?.x}-${cell?.y}`
      );

      const timeoutId = setTimeout(() => {
        if (currentElement) {
          // Rerender walls based on the cell's current state using cached styles
          currentElement.style.borderTop = cell?.northW
            ? borderStyle
            : "1px solid transparent";
          currentElement.style.borderBottom = cell?.southW
            ? borderStyle
            : "1px solid transparent";
          currentElement.style.borderLeft = cell?.westW
            ? borderStyle
            : "1px solid transparent";
          currentElement.style.borderRight = cell?.eastW
            ? borderStyle
            : "1px solid transparent";

          // Set background color for the current element (tracer)
          currentElement.style.background = bgColor;

          // Reset background color after a short delay
          setTimeout(() => {
            currentElement.style.backgroundColor = "";
          }, delayPerCell);
        }

        // On the last iteration, ensure final maze state is rendered
        if (i === points.size() - 1) {
          setTimeout(() => {
            this.reRenderBoard();
            // Call the completion callback if provided
            if (onComplete) {
              onComplete();
            }
          }, fadeoutTime);
        }
      }, delayPerCell * i);
      this.timeouts.push(timeoutId);
    }
  }

  reRenderBoard(): void {
    this.clearTimeouts();
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;

    // Cache the border color once instead of per-cell (major perf improvement)
    const borderColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--bc")
      .trim();
    const borderStyle = `1px solid oklch(${borderColor})`;

    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        let cell = this.ifNull(this.grid)[i][j];
        let visetedElement = document.getElementById(
          `cell-${cell.x}-${cell.y}-visited`
        );

        let startElement = document.getElementById(
          `cell-${cell.x}-${cell.y}-start`
        );
        let endElement = document.getElementById(
          `cell-${cell.x}-${cell.y}-end`
        );
        let pathElement = document.getElementById(
          `cell-${cell.x}-${cell.y}-path`
        );
        let currentElement = document.getElementById(
          `cell-${cell.x}-${cell.y}`
        );

        if (startElement) {
          startElement.className = cell.isStart ? "block" : "hidden";
        }
        if (endElement) {
          endElement.className = cell.isEnd ? "block" : "hidden";
        }
        if (visetedElement) {
          visetedElement.className = cell.isVisited
            ? "block bg-neutral rounded-full absolute"
            : "hidden bg-neutral rounded-full absolute";
        }
        if (pathElement) {
          pathElement.className = cell.isPath
            ? "block absolute"
            : "hidden absolute";
        }
        if (currentElement) {
          //rerender walls using cached border style
          currentElement.style.borderTop = cell.northW
            ? borderStyle
            : "1px solid transparent";
          currentElement.style.borderBottom = cell.southW
            ? borderStyle
            : "1px solid transparent";
          currentElement.style.borderLeft = cell.westW
            ? borderStyle
            : "1px solid transparent";
          currentElement.style.borderRight = cell.eastW
            ? borderStyle
            : "1px solid transparent";
        }
      }
    }
  }
  reRunAnimatePath(): void {
    // Handle edge case: no points data (e.g., after reset)
    if (!this.currentPoints) {
      return;
    }

    const points = this.currentPoints;

    for (let i = 0; i < points.size(); i++) {
      if (i === points.size() - 1) {
        this.reRunAnimateLinePath();

        return;
      }

      const cell = points.get(i);
      if (!cell) continue;

      if (!cell.isStart && !cell.isEnd) {
        const visitedElement = this.ifNull(document).getElementById(
          `cell-${cell.x}-${cell.y}-visited`
        );

        if (visitedElement) {
          visitedElement.className = "block bg-neutral rounded-full absolute";
        }
      }
    }
  }
  reRunAnimateLinePath(): void {
    // Handle edge case: no path data (e.g., after reset)
    if (!this.path) {
      return;
    }

    const path = this.path;
    for (let i = 0; i < path.length; i++) {
      const cell = path[i];
      if (!cell.isStart && !cell.isEnd) {
        const cellId = `cell-${cell.x}-${cell.y}-path`;

        const pathElement = this.ifNull(document).getElementById(
          `cell-${cell.x}-${cell.y}-path`
        );
        const visitedElement = this.ifNull(document).getElementById(
          `cell-${cell.x}-${cell.y}-visited`
        );
        if (pathElement) {
          let toAdd = new Line(cell).animate();
          // Check if a root already exists for this element
          if (this.rootsMap.has(cellId)) {
            const existingRoot = this.rootsMap.get(cellId);
            existingRoot.render(toAdd); // Use the existing root to render
          } else {
            // Create a new root and store it in the map
            const newRoot = createRoot(pathElement);
            newRoot.render(toAdd);
            this.rootsMap.set(cellId, newRoot);
          }
          pathElement.className = "block absolute";
        }
        if (visitedElement) {
          visitedElement.className = "hidden bg-neutral rounded-full absolute";
        }
      }
    }
  }
  animatePath(onComplete?: () => void): void {
    // Handle edge case: no points data (e.g., after reset)
    if (!this.currentPoints) {
      this.animateLinePath(onComplete);
      return;
    }

    const points = this.currentPoints;

    // Handle edge case: no points to animate
    if (points.size() === 0) {
      this.animateLinePath(onComplete);
      return;
    }

    for (let i = 0; i < points.size(); i++) {
      if (i === points.size() - 1) {
        const timeoutId = setTimeout(() => {
          this.animateLinePath(onComplete);
        }, this.ANIMATIONSPEED * 1.55 * i);
        this.timeouts.push(timeoutId);

        return;
      }
      const timeoutId = setTimeout(() => {
        const cell = points.get(i);
        if (!cell) return;

        if (!cell.isStart && !cell.isEnd) {
          const visitedElement = this.ifNull(document).getElementById(
            `cell-${cell.x}-${cell.y}-visited`
          );
          const currentElement = this.ifNull(document).getElementById(
            `cell-${cell.x}-${cell.y}-current`
          );

          if (currentElement) {
            currentElement.className = "block bg-warning rounded-full absolute";
          }
          setTimeout(() => {
            if (currentElement) {
              currentElement.className =
                "hidden bg-warning rounded-full absolute";
            }
            if (visitedElement) {
              visitedElement.className =
                "block bg-neutral rounded-full absolute";
            }
          }, this.ANIMATIONSPEED * 1.55);
        }
      }, this.ANIMATIONSPEED * 1.55 * i);
      this.timeouts.push(timeoutId);
    }
  }
  animateLinePath(onComplete?: () => void): void {
    // Handle edge case: no path data (e.g., after reset)
    if (!this.path) {
      if (onComplete) {
        onComplete();
      }
      return;
    }

    const path = this.path;

    // Handle edge case: empty path or only start/end cells
    if (path.length === 0) {
      if (onComplete) {
        onComplete();
      }
      return;
    }

    for (let i = 0; i < path.length; i++) {
      const isLastCell = i === path.length - 1;

      const timeoutId = setTimeout(() => {
        const cell = path[i];
        if (!cell.isStart && !cell.isEnd) {
          const cellId = `cell-${cell.x}-${cell.y}-path`;

          const pathElement = this.ifNull(document).getElementById(
            `cell-${cell.x}-${cell.y}-path`
          );
          const visitedElement = this.ifNull(document).getElementById(
            `cell-${cell.x}-${cell.y}-visited`
          );
          if (pathElement) {
            let toAdd = new Line(cell).animate();
            // Check if a root already exists for this element
            if (this.rootsMap.has(cellId)) {
              const existingRoot = this.rootsMap.get(cellId);
              existingRoot.render(toAdd); // Use the existing root to render
            } else {
              // Create a new root and store it in the map
              const newRoot = createRoot(pathElement);
              newRoot.render(toAdd);
              this.rootsMap.set(cellId, newRoot);
            }
            pathElement.className = "block absolute";
          }
          if (visitedElement) {
            visitedElement.className =
              "hidden bg-neutral rounded-full absolute";
          }
        }

        // Call onComplete callback after last cell (regardless of whether it was rendered)
        if (isLastCell && onComplete) {
          setTimeout(() => {
            onComplete();
          }, Math.pow(this.ANIMATIONSPEED, Math.sqrt(this.ANIMATIONSPEED)));
        }
      }, Math.pow(this.ANIMATIONSPEED, Math.sqrt(this.ANIMATIONSPEED)) * i);
      this.timeouts.push(timeoutId);
    }
  }
  clearTimeouts(): void {
    for (const timeoutId of this.timeouts) {
      clearTimeout(timeoutId);
    }
    this.timeouts = [];
  }

  completeMazeImmediately(): void {
    // Clear all pending animations
    this.clearTimeouts();

    // Immediately render the final maze state
    this.reRenderBoard();
  }

  completePathImmediately(): void {
    // Clear all pending animations
    this.clearTimeouts();

    // Immediately render visited cells and path
    this.reRunAnimatePath();
  }
}
