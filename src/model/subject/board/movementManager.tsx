import { MovementModel } from "../../Interfaces/movementModel";
import { Cell } from "../Cell";
/**
 * MovementManager class that implements the MovementModel interface.
 */
export class MovementManager implements MovementModel {
  strategy: MovementModel;
  constructor(strategy: MovementModel) {
    this.strategy = strategy;
  }
  getNeighbours(cell: Cell): Array<Cell> {
    return this.strategy.getNeighbours(cell);
  }
}
