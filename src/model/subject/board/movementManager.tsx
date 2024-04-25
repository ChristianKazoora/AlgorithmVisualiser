import { MovementModel } from "../../Interfaces/movementModel";
import { Cell } from "../Cell";

export class MovementManager implements MovementModel {
  strategy: MovementModel;
  constructor(strategy: MovementModel) {
    this.strategy = strategy;
  }
  getNeighbours(cell: Cell): Array<Cell> {
    return this.strategy.getNeighbours(cell);
  }
}
