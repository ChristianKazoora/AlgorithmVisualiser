import { MazeModel } from "../../../Interfaces/mazeModel";
import { Board } from "../../board/board";
import { Cell } from "../../Cell";
import { Stack } from "../../../../shared/stack";

/** Wall distribution pattern for maze generation */
export type WallDistribution =
  | "uniform"
  | "center-focused"
  | "edge-focused"
  | "gradient";

/**
 * Random Walls maze generator for manual mode.
 * Places walls randomly on the grid based on a density parameter.
 * Supports different distribution patterns for wall placement.
 */
export class RandomWallsManual implements MazeModel {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  orderOfVisited = new Stack<Cell>();
  private density: number;
  private distribution: WallDistribution;

  /**
   * @param density - Probability (0-1) that a cell becomes a wall. Default 0.3 (30%)
   * @param distribution - Wall distribution pattern. Default 'uniform'
   */
  constructor(
    density: number = 0.3,
    distribution: WallDistribution = "uniform"
  ) {
    this.density = Math.max(0, Math.min(1, density)); // Clamp between 0 and 1
    this.distribution = distribution;
  }

  /**
   * Calculate weighted density based on position and distribution pattern
   */
  private getWeightedDensity(
    x: number,
    y: number,
    gridLength: number,
    gridWidth: number
  ): number {
    // Calculate normalized distance from center (0-1)
    const centerX = (gridLength - 1) / 2;
    const centerY = (gridWidth - 1) / 2;
    const distX = Math.abs(x - centerX) / Math.max(centerX, 1);
    const distY = Math.abs(y - centerY) / Math.max(centerY, 1);
    const distFromCenter =
      Math.sqrt(distX * distX + distY * distY) / Math.sqrt(2);

    switch (this.distribution) {
      case "center-focused":
        // More walls in the middle, fewer at edges
        return this.density * (1 - distFromCenter * 0.7);

      case "edge-focused":
        // More walls at edges, fewer in middle
        return this.density * (0.3 + distFromCenter * 0.7);

      case "gradient":
        // Gaussian-like distribution (bell curve toward center)
        return this.density * Math.exp(-distFromCenter * 1.5);

      case "uniform":
      default:
        return this.density;
    }
  }

  generateMaze(): void {
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;

    // Reset order visited
    this.orderOfVisited = new Stack<Cell>();

    // First pass: clear all walls
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.grid![i][j];
        cell.isWall = false;
      }
    }

    // Second pass: randomly place walls with weighted distribution
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.grid![i][j];

        // Don't place walls on start or end cells
        if (cell.isStart || cell.isEnd) {
          continue;
        }

        // Get weighted density based on position
        const weightedDensity = this.getWeightedDensity(
          i,
          j,
          gridLength,
          gridWidth
        );

        // Randomly decide if this cell should be a wall
        if (Math.random() < weightedDensity) {
          cell.isWall = true;
          this.orderOfVisited.push(cell);
        }
      }
    }
  }

  getOrderVisited(): Stack<Cell> {
    return this.orderOfVisited;
  }

  getBoard(): Board {
    return this.ifNull(this.board);
  }

  setBoard(board: Board): void {
    this.board = board;
    this.grid = board.grid;
  }

  /**
   * Set the wall density
   * @param density - Probability (0-1) that a cell becomes a wall
   */
  setDensity(density: number): void {
    this.density = Math.max(0, Math.min(1, density));
  }

  getDensity(): number {
    return this.density;
  }

  /**
   * Set the wall distribution pattern
   */
  setDistribution(distribution: WallDistribution): void {
    this.distribution = distribution;
  }

  getDistribution(): WallDistribution {
    return this.distribution;
  }

  ifNull(data: any): any {
    if (data) {
      return data;
    } else {
      throw new Error("Data is null or undefined");
    }
  }
}
