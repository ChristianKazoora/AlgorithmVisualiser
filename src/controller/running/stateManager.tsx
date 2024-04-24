import { State } from "./state";

export class StateManager implements State {
  currState: State;
  constructor(initState: State) {
    this.currState = initState;
  }
  start(): void {
    this.currState.start();
  }
  pause(): void {
    this.currState.pause();
  }
  resume(): void {
    this.currState.resume();
  }
  stop(): void {
    this.currState.stop();
  }
  reset(): void {
    this.currState.reset();
  }
  setSpeed(speed: number): void {
    this.currState.setSpeed(speed);
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
