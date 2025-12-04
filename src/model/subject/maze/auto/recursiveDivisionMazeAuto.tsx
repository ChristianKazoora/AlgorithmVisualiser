import { MazeModel } from "../../../Interfaces/mazeModel";
import { Board } from "../../board/board";
import { Cell } from "../../Cell";
import { Stack } from "../../../../shared/stack";

/**
 * Recursive Division maze generator for auto mode.
 *
 * Algorithm:
 * 1. Start with an open grid (all walls removed between cells)
 * 2. Recursively divide the space:
 *    a. Choose a random orientation (horizontal or vertical) - bias based on aspect ratio
 *    b. Draw a wall across the entire width/height of the chamber
 *    c. Create a single random passage through that wall
 *    d. Recursively divide the sub-chambers
 * 3. Stop when chambers are too small (1 cell wide or tall)
 *
 * Produces mazes with long straight walls and room-like spaces.
 * Very different visual style from passage-carving algorithms.
 */
export class RecursiveDivisionMazeAuto implements MazeModel {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  orderOfVisited = new Stack<Cell>();

  generateMaze(): void {
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;

    // Step 1: Remove all internal walls (create open field)
    this.removeAllWalls(gridLength, gridWidth);

    // Step 2: Recursively divide the space
    this.divide(0, 0, gridLength - 1, gridWidth - 1);
  }

  /**
   * Remove all internal walls, leaving only border walls
   */
  private removeAllWalls(gridLength: number, gridWidth: number): void {
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.grid![i][j];

        // Remove south wall if not at bottom edge
        if (i < gridLength - 1) {
          cell.southW = false;
          this.grid![i + 1][j].northW = false;
        }

        // Remove east wall if not at right edge
        if (j < gridWidth - 1) {
          cell.eastW = false;
          this.grid![i][j + 1].westW = false;
        }
      }
    }
  }

  /**
   * Recursively divide a chamber
   * @param minRow - Top row of chamber
   * @param minCol - Left column of chamber
   * @param maxRow - Bottom row of chamber
   * @param maxCol - Right column of chamber
   */
  private divide(
    minRow: number,
    minCol: number,
    maxRow: number,
    maxCol: number
  ): void {
    const height = maxRow - minRow + 1;
    const width = maxCol - minCol + 1;

    // Base case: chamber too small to divide
    if (height < 2 || width < 2) {
      return;
    }

    // Choose orientation based on aspect ratio (with some randomness)
    const horizontal = this.chooseOrientation(width, height);

    if (horizontal) {
      this.divideHorizontally(minRow, minCol, maxRow, maxCol);
    } else {
      this.divideVertically(minRow, minCol, maxRow, maxCol);
    }
  }

  /**
   * Choose whether to divide horizontally or vertically
   * Wider chambers tend to get horizontal walls, taller chambers vertical
   */
  private chooseOrientation(width: number, height: number): boolean {
    if (width < height) {
      return true; // Horizontal wall for tall chambers
    } else if (height < width) {
      return false; // Vertical wall for wide chambers
    } else {
      return Math.random() < 0.5; // Random for square chambers
    }
  }

  /**
   * Draw a horizontal wall with one passage
   */
  private divideHorizontally(
    minRow: number,
    minCol: number,
    maxRow: number,
    maxCol: number
  ): void {
    // Choose a row to place the wall (not at the edges)
    // Wall is placed BETWEEN wallRow and wallRow+1
    const wallRow = minRow + Math.floor(Math.random() * (maxRow - minRow));

    // Choose a column for the passage
    const passageCol =
      minCol + Math.floor(Math.random() * (maxCol - minCol + 1));

    // Draw the wall across all columns except passage
    for (let col = minCol; col <= maxCol; col++) {
      if (col === passageCol) {
        continue; // Skip passage
      }

      const cell = this.grid![wallRow][col];
      const cellBelow = this.grid![wallRow + 1][col];

      // Add wall between cells
      cell.southW = true;
      cellBelow.northW = true;

      this.orderOfVisited.push(cell);
    }

    // Recursively divide the two sub-chambers
    this.divide(minRow, minCol, wallRow, maxCol); // Top chamber
    this.divide(wallRow + 1, minCol, maxRow, maxCol); // Bottom chamber
  }

  /**
   * Draw a vertical wall with one passage
   */
  private divideVertically(
    minRow: number,
    minCol: number,
    maxRow: number,
    maxCol: number
  ): void {
    // Choose a column to place the wall (not at the edges)
    // Wall is placed BETWEEN wallCol and wallCol+1
    const wallCol = minCol + Math.floor(Math.random() * (maxCol - minCol));

    // Choose a row for the passage
    const passageRow =
      minRow + Math.floor(Math.random() * (maxRow - minRow + 1));

    // Draw the wall across all rows except passage
    for (let row = minRow; row <= maxRow; row++) {
      if (row === passageRow) {
        continue; // Skip passage
      }

      const cell = this.grid![row][wallCol];
      const cellRight = this.grid![row][wallCol + 1];

      // Add wall between cells
      cell.eastW = true;
      cellRight.westW = true;

      this.orderOfVisited.push(cell);
    }

    // Recursively divide the two sub-chambers
    this.divide(minRow, minCol, maxRow, wallCol); // Left chamber
    this.divide(minRow, wallCol + 1, maxRow, maxCol); // Right chamber
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

  ifNull(data: any): any {
    if (data) {
      return data;
    } else {
      throw new Error("Data is null or undefined");
    }
  }
}
