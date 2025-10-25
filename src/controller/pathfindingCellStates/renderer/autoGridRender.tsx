import { createRoot } from "react-dom/client";
import { Cell } from "../../../model/subject/Cell";
import { Board } from "../../../model/subject/board/board";
import { Stack } from "../../../shared/stack";
import AutoCell from "../../cellDecorations/paths/autoCell";
import { Line } from "../../cellDecorations/paths/line";
import { GridRenderer } from "../../interfaces/gridRenderer";

export class AutoGridRenderer implements GridRenderer {
  private grid: Array<Array<Cell>> | undefined;
  // private board: Board | undefined;
  private path: Array<Cell> | undefined;
  private currentPoints: Stack<Cell> | undefined;
  private rootsMap: Map<string, any>; // Map to store roots
  private mazeVisitedOrder: Stack<Cell> | undefined;
  private ANIMATIONSPEED = 2;
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

    for (let i = 0; i < points.size(); i++) {
      let cell = points.get(i);
      let currentElement = document.getElementById(
        `cell-${cell?.x}-${cell?.y}`
      );

      const timeoutId = setTimeout(() => {
        if (currentElement) {
          // Rerender walls based on the cell's current state
          currentElement.style.borderTop = "1px solid black";
          currentElement.style.borderBottom = "1px solid black";
          currentElement.style.borderLeft = "1px solid black";
          currentElement.style.borderRight = "1px solid black";
          if (!cell?.northW) {
            currentElement.style.borderTop = "1px solid transparent";
          }
          if (!cell?.southW) {
            currentElement.style.borderBottom = "1px solid transparent";
          }
          if (!cell?.eastW) {
            currentElement.style.borderRight = "1px solid transparent";
          }
          if (!cell?.westW) {
            currentElement.style.borderLeft = "1px solid transparent";
          }

          // Set background color for the current element (black cube tracer)
          currentElement.style.background = "black";

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
          if (cell.isStart) {
            startElement.className = "block";
          } else {
            startElement.className = "hidden";
          }
        }
        if (endElement) {
          if (cell.isEnd) {
            endElement.className = "block";
          } else {
            endElement.className = "hidden";
          }
        }
        if (visetedElement) {
          if (cell.isVisited) {
            visetedElement.className = "block ";
          } else {
            visetedElement.className = "hidden";
          }
        }
        if (pathElement) {
          if (cell.isPath) {
            pathElement.className = "block";
          } else {
            pathElement.className = "hidden";
          }
        }
        if (currentElement) {
          //rerender walls
          currentElement.style.borderTop = "1px solid black";
          currentElement.style.borderBottom = "1px solid black";
          currentElement.style.borderLeft = "1px solid black";
          currentElement.style.borderRight = "1px solid black";
          if (!cell.northW) {
            currentElement.style.borderTop = "1px solid transparent";
          }
          if (!cell.southW) {
            currentElement.style.borderBottom = "1px solid transparent";
          }
          if (!cell.eastW) {
            currentElement.style.borderRight = "1px solid transparent";
          }
          if (!cell.westW) {
            currentElement.style.borderLeft = "1px solid transparent";
          }
        }
      }
    }
  }
  reRunAnimatePath(): void {
    const points = this.ifNull(this.currentPoints);

    for (let i = 0; i < points.size(); i++) {
      if (i === points.size() - 1) {
        this.reRunAnimateLinePath();

        return;
      }

      const cell = points.get(i);

      if (!cell.isStart && !cell.isEnd) {
        const visitedElement = this.ifNull(document).getElementById(
          `cell-${cell.x}-${cell.y}-visited`
        );

        if (visitedElement) {
          visitedElement.className = "block";
        }
      }
    }
  }
  reRunAnimateLinePath(): void {
    const path = this.ifNull(this.path);
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
          pathElement.className = "block";
          pathElement.className = "block";
        }
        if (visitedElement) {
          visitedElement.className = "hidden";
        }
      }
    }
  }
  animatePath(onComplete?: () => void): void {
    const points = this.ifNull(this.currentPoints);

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

        if (!cell.isStart && !cell.isEnd) {
          const visitedElement = this.ifNull(document).getElementById(
            `cell-${cell.x}-${cell.y}-visited`
          );
          const currentElement = this.ifNull(document).getElementById(
            `cell-${cell.x}-${cell.y}-current`
          );

          if (currentElement) {
            currentElement.className = " block ";
          }
          setTimeout(() => {
            if (visitedElement) {
              currentElement.className = "hidden";
              visitedElement.className = "block";
            }
          }, this.ANIMATIONSPEED);
        }
      }, this.ANIMATIONSPEED * 1.55 * i);
      this.timeouts.push(timeoutId);
    }
  }
  animateLinePath(onComplete?: () => void): void {
    const path = this.ifNull(this.path);

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
            pathElement.className = "block";
            pathElement.className = "block";
          }
          if (visitedElement) {
            visitedElement.className = "hidden";
          }
        }

        // Call onComplete callback after last cell (regardless of whether it was rendered)
        if (isLastCell && onComplete) {
          setTimeout(() => {
            onComplete();
          }, Math.pow(this.ANIMATIONSPEED, 6));
        }
      }, Math.pow(this.ANIMATIONSPEED, 6) * i);
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
