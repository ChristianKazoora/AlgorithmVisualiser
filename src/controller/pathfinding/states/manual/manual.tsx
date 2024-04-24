import { State } from "../state";

export class manual implements State {
  start(): void {
    throw new Error("Method not implemented.");
  }
  pause(): void {
    throw new Error("Method not implemented.");
  }
  resume(): void {
    throw new Error("Method not implemented.");
  }
  stop(): void {
    throw new Error("Method not implemented.");
  }
  reset(): void {
    throw new Error("Method not implemented.");
  }
  setSpeed(speed: number): void {
    throw new Error("Method not implemented.");
  }
  setAlgorithm(algorithm: number): void {
    throw new Error("Method not implemented.");
  }
  setHeuristic(heuristic: number): void {
    throw new Error("Method not implemented.");
  }
  setDiagonal(diagonal: boolean): void {
    throw new Error("Method not implemented.");
  }
  setMaze(maze: number): void {
    throw new Error("Method not implemented.");
  }
}
