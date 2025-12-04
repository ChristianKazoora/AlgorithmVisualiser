import { MazeModel } from "../../../Interfaces/mazeModel";
import { Board } from "../../board/board";
import { Cell } from "../../Cell";
import { Stack } from "../../../../shared/stack";

/**
 * Prim's Algorithm maze generator for auto mode.
 *
 * Algorithm (Randomized Prim's):
 * 1. Start with a grid where all walls are up
 * 2. Pick a random starting cell, mark it as part of the maze
 * 3. Add the walls of that cell to the wall list (frontier)
 * 4. While there are walls in the list:
 *    a. Pick a random wall from the list
 *    b. If only one of the cells that the wall divides is visited:
 *       - Make the wall a passage (remove it)
 *       - Mark the unvisited cell as part of the maze
 *       - Add the neighboring walls of the cell to the wall list
 *    c. Remove the wall from the list
 *
 * Produces mazes with many short dead ends, tends to create more "bushy" patterns.
 */
export class PrimsMazeAuto implements MazeModel {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  orderOfVisited = new Stack<Cell>();
  private visited: Set<Cell> = new Set();

  generateMaze(): void {
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;

    // Reset visited set
    this.visited = new Set();

    // Wall frontier: each entry is [cell, neighbor, direction]
    type WallEntry = {
      cell: Cell;
      neighbor: Cell;
      direction: "north" | "south" | "east" | "west";
    };
    const walls: WallEntry[] = [];

    // Start from a random cell
    const startX = Math.floor(Math.random() * gridLength);
    const startY = Math.floor(Math.random() * gridWidth);
    const startCell = this.grid![startX][startY];

    this.visited.add(startCell);
    this.orderOfVisited.push(startCell);

    // Add initial cell's walls to frontier
    this.addWallsToFrontier(startCell, walls);

    // Process walls until frontier is empty
    while (walls.length > 0) {
      // Pick a random wall from frontier
      const randomIndex = Math.floor(Math.random() * walls.length);
      const wallEntry = walls[randomIndex];

      // Remove this wall from frontier
      walls.splice(randomIndex, 1);

      const { cell, neighbor, direction } = wallEntry;

      // If neighbor is not yet visited, carve passage
      if (!this.visited.has(neighbor)) {
        // Remove the wall between cell and neighbor
        this.removeWall(cell, neighbor, direction);

        // Mark neighbor as visited
        this.visited.add(neighbor);
        this.orderOfVisited.push(neighbor);

        // Add neighbor's walls to frontier
        this.addWallsToFrontier(neighbor, walls);
      }
    }
  }

  /**
   * Add all walls of a cell to the frontier (only walls leading to unvisited cells)
   */
  private addWallsToFrontier(
    cell: Cell,
    walls: {
      cell: Cell;
      neighbor: Cell;
      direction: "north" | "south" | "east" | "west";
    }[]
  ): void {
    // North neighbor
    if (cell.top && !this.visited.has(cell.top)) {
      walls.push({ cell, neighbor: cell.top, direction: "north" });
    }
    // South neighbor
    if (cell.bottom && !this.visited.has(cell.bottom)) {
      walls.push({ cell, neighbor: cell.bottom, direction: "south" });
    }
    // East neighbor
    if (cell.right && !this.visited.has(cell.right)) {
      walls.push({ cell, neighbor: cell.right, direction: "east" });
    }
    // West neighbor
    if (cell.left && !this.visited.has(cell.left)) {
      walls.push({ cell, neighbor: cell.left, direction: "west" });
    }
  }

  /**
   * Remove the wall between two adjacent cells
   */
  private removeWall(
    cell: Cell,
    neighbor: Cell,
    direction: "north" | "south" | "east" | "west"
  ): void {
    switch (direction) {
      case "north":
        cell.northW = false;
        neighbor.southW = false;
        break;
      case "south":
        cell.southW = false;
        neighbor.northW = false;
        break;
      case "east":
        cell.eastW = false;
        neighbor.westW = false;
        break;
      case "west":
        cell.westW = false;
        neighbor.eastW = false;
        break;
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

  ifNull(data: any): any {
    if (data) {
      return data;
    } else {
      throw new Error("Data is null or undefined");
    }
  }
}
