import { Board } from "../board";

export class Pathfinding implements PathfindingModel {
  grid: Board;
  algorithm: Algo;
  constructor(gridSize: number, algorithmType: Algo) {
    this.grid = new Board(gridSize);
    this.algorithm = algorithmType;
  }

  setStartPoint(x: number, y: number): void {
    /* Implementation */
  }
  setEndPoint(x: number, y: number): void {
    /* Implementation */
  }
  toggleWall(x: number, y: number): void {
    /* Implementation */
  }
  start(): void {
    /* Start pathfinding */
  }
  step(): void {
    /* Next step in the algorithm */
  }
  reset(): void {
    /* Reset grid and algorithm state */
  }
}
