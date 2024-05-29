import { Stack } from "../../shared/stack";
import { Cell } from "../subject/Cell";

export interface MazeMovementModel {
  getNeighbour(cell: any): Cell;
  setVisited(cell: Stack<Cell>): void;
}
