import { MazeModel } from "../../../Interfaces/mazeModel";
import { Board } from "../../board/board";
import { Cell } from "../../Cell";
import { Stack } from "../../../../shared/stack";

/**
 * Cellular Automata maze generator for manual mode.
 * Creates organic cave-like patterns using cellular automata rules.
 *
 * Algorithm:
 * 1. Start with random walls based on initial density
 * 2. Apply smoothing rules for N iterations:
 *    - A cell becomes a wall if 4+ neighbors are walls
 *    - Otherwise it becomes open
 * 3. Results in natural-looking cave formations
 */
export class CellularAutomataManual implements MazeModel {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  orderOfVisited = new Stack<Cell>();
  private initialDensity: number;
  private iterations: number;
  private wallThreshold: number;

  /**
   * @param initialDensity - Initial probability (0-1) for random walls. Default 0.45 (45%)
   * @param iterations - Number of smoothing iterations. Default 4
   * @param wallThreshold - Number of wall neighbors needed to become/stay a wall. Default 4
   */
  constructor(
    initialDensity: number = 0.45,
    iterations: number = 4,
    wallThreshold: number = 4
  ) {
    this.initialDensity = Math.max(0, Math.min(1, initialDensity));
    this.iterations = Math.max(1, iterations);
    this.wallThreshold = Math.max(0, Math.min(8, wallThreshold));
  }

  generateMaze(): void {
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;

    // Step 1: Initialize with random walls
    this.initializeRandomWalls(gridLength, gridWidth);

    // Step 2: Apply cellular automata rules for N iterations
    for (let iter = 0; iter < this.iterations; iter++) {
      this.applyAutomataRules(gridLength, gridWidth);
    }

    // Step 3: Ensure start and end are not walls and have clear surroundings
    this.ensureStartEndAccessible(gridLength, gridWidth);

    // Step 4: Record final wall positions for animation
    this.recordWallOrder(gridLength, gridWidth);
  }

  /**
   * Initialize grid with random walls based on initial density
   */
  private initializeRandomWalls(gridLength: number, gridWidth: number): void {
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.grid![i][j];

        // Don't place walls on start or end cells
        if (cell.isStart || cell.isEnd) {
          cell.isWall = false;
          continue;
        }

        cell.isWall = Math.random() < this.initialDensity;
      }
    }
  }

  /**
   * Apply cellular automata smoothing rules
   */
  private applyAutomataRules(gridLength: number, gridWidth: number): void {
    // Create a copy of current wall states
    const wallStates: boolean[][] = [];
    for (let i = 0; i < gridLength; i++) {
      wallStates[i] = [];
      for (let j = 0; j < gridWidth; j++) {
        wallStates[i][j] = this.grid![i][j].isWall;
      }
    }

    // Apply rules based on neighbor count
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.grid![i][j];

        // Don't modify start or end cells
        if (cell.isStart || cell.isEnd) {
          continue;
        }

        const wallNeighbors = this.countWallNeighbors(
          wallStates,
          i,
          j,
          gridLength,
          gridWidth
        );

        // Rule: If 4+ neighbors are walls, become/stay a wall
        // Also: Edge cells tend to be walls to create borders
        const isEdge =
          i === 0 || i === gridLength - 1 || j === 0 || j === gridWidth - 1;
        cell.isWall =
          wallNeighbors >= this.wallThreshold || (isEdge && wallNeighbors >= 3);
      }
    }
  }

  /**
   * Count the number of wall neighbors (8-directional)
   */
  private countWallNeighbors(
    wallStates: boolean[][],
    x: number,
    y: number,
    gridLength: number,
    gridWidth: number
  ): number {
    let count = 0;

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue; // Skip self

        const nx = x + dx;
        const ny = y + dy;

        // Out of bounds counts as wall (helps create borders)
        if (nx < 0 || nx >= gridLength || ny < 0 || ny >= gridWidth) {
          count++;
        } else if (wallStates[nx][ny]) {
          count++;
        }
      }
    }

    return count;
  }

  /**
   * Ensure start and end cells and their immediate neighbors are accessible
   */
  private ensureStartEndAccessible(
    gridLength: number,
    gridWidth: number
  ): void {
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.grid![i][j];

        if (cell.isStart || cell.isEnd) {
          cell.isWall = false;

          // Clear immediate neighbors (4-directional)
          const neighbors = [
            { x: i - 1, y: j },
            { x: i + 1, y: j },
            { x: i, y: j - 1 },
            { x: i, y: j + 1 },
          ];

          for (const n of neighbors) {
            if (n.x >= 0 && n.x < gridLength && n.y >= 0 && n.y < gridWidth) {
              const neighbor = this.grid![n.x][n.y];
              if (!neighbor.isStart && !neighbor.isEnd) {
                neighbor.isWall = false;
              }
            }
          }
        }
      }
    }
  }

  /**
   * Record walls in order for animation
   */
  private recordWallOrder(gridLength: number, gridWidth: number): void {
    this.orderOfVisited = new Stack<Cell>();

    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.grid![i][j];
        if (cell.isWall) {
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
   * Set configuration parameters
   */
  setConfig(
    initialDensity?: number,
    iterations?: number,
    wallThreshold?: number
  ): void {
    if (initialDensity !== undefined) {
      this.initialDensity = Math.max(0, Math.min(1, initialDensity));
    }
    if (iterations !== undefined) {
      this.iterations = Math.max(1, iterations);
    }
    if (wallThreshold !== undefined) {
      this.wallThreshold = Math.max(0, Math.min(8, wallThreshold));
    }
  }

  ifNull(data: any): any {
    if (data) {
      return data;
    } else {
      throw new Error("Data is null or undefined");
    }
  }
}
