import { Cell } from "../subject/Cell";

export interface MovementModel {
  getNeighbours(cell: Cell): Array<Cell>;
}
