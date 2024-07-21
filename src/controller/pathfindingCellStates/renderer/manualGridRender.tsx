import { Cell } from "../../../model/subject/Cell";
import { Board } from "../../../model/subject/board/board";
import { GridRenderer } from "../../interfaces/gridRenderer";

import { Stack } from "../../../shared/stack";
import { VisitedPath } from "../../cellDecorations/paths/visitedPath";

import { createRoot } from "react-dom/client";
import { Line } from "../../cellDecorations/paths/line";
export class ManualGridRenderer implements GridRenderer {
  private grid: Array<Array<Cell>> | undefined;
  private path: Array<Cell> | undefined;
  private currentPoints: Stack<Cell> | undefined;
  private mazeVisitedOrder: Stack<Cell> | undefined;
  private rootsMap: Map<string, any>; // Map to store roots
  private ANIMATIONSPEED = 6;
  private timeouts: ReturnType<typeof setTimeout>[] = [];
  constructor() {
    this.rootsMap = new Map(); // Initialize the map in the constructor
  }
  animateMaze(): void {
    throw new Error("Method not implemented.");
  }
  setMazeVisitedOrder(OrderVisited: Stack<Cell>): void {
    this.mazeVisitedOrder = OrderVisited;
  }
  setBoard(board: Board): void {
    this.grid = board.grid;
  }
  setCurrentPoints(points: Stack<Cell>): void {
    this.currentPoints = points;
  }
  setPath(path: Array<Cell>): void {
    this.path = path;
  }
  clear(): void {
    this.clearTimeouts();
  }
  render(): JSX.Element[][] {
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    let result: JSX.Element[][] = [];

    for (let i = 0; i < gridLength; i++) {
      let row: JSX.Element[] = [];
      for (let j = 0; j < gridWidth; j++) {
        let cell = this.ifNull(this.grid)[i][j];

        let pos: JSX.Element | undefined;
        pos = new VisitedPath(cell).animate();

        if (pos) {
          row.push(pos);
        }
      }
      result.push(row);
    }
    return result;
  }
  ifNull(object: any) {
    if (object) {
      return object;
    } else {
      throw new Error("object is undefined");
    }
  }
  reRenderBoard(): void {
    this.clearTimeouts(); // Clear any previous timeouts before starting a new animation
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        let cell = this.ifNull(this.grid)[i][j];
        let visetedElement = document.getElementById(
          `cell-${cell.x}-${cell.y}-visited`
        );
        let wallElement = document.getElementById(
          `cell-${cell.x}-${cell.y}-wall`
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

        if (wallElement) {
          if (cell.isWall) {
            wallElement.className = "block";
          } else {
            wallElement.className = "hidden";
          }
        }

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
          visetedElement.className = "hidden";
        }
        if (pathElement) {
          pathElement.className = "hidden";
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
        const pathElement = this.ifNull(document).getElementById(cellId);
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
        }

        if (visitedElement) {
          visitedElement.className = "hidden";
        }
      }
    }
  }
  animatePath(): void {
    const points = this.ifNull(this.currentPoints);

    for (let i = 0; i < points.size(); i++) {
      if (i === points.size() - 1) {
        const timeoutId = setTimeout(
          () => {
            this.animateLinePath();
          },
          this.ANIMATIONSPEED * 1.55 * i
        );
        this.timeouts.push(timeoutId);
        return;
      }

      const timeoutId = setTimeout(
        () => {
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
            }, this.ANIMATIONSPEED * 1.55);
          }
        },
        this.ANIMATIONSPEED * 1.55 * i
      );
      this.timeouts.push(timeoutId);
    }
  }

  animateLinePath(): void {
    const path = this.ifNull(this.path);
    for (let i = 0; i < path.length; i++) {
      const timeoutId = setTimeout(
        () => {
          const cell = path[i];
          if (!cell.isStart && !cell.isEnd) {
            const cellId = `cell-${cell.x}-${cell.y}-path`;
            const pathElement = this.ifNull(document).getElementById(cellId);
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
            }

            if (visitedElement) {
              visitedElement.className = "hidden";
            }
          }
        },
        Math.pow(this.ANIMATIONSPEED, Math.sqrt(this.ANIMATIONSPEED)) * i
      );
      this.timeouts.push(timeoutId);
    }
  }

  clearTimeouts(): void {
    for (const timeoutId of this.timeouts) {
      clearTimeout(timeoutId);
    }
    this.timeouts = [];
  }
}
