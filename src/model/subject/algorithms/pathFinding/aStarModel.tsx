import { Point } from "../../../../shared/point";
import { MovementModel } from "../../../Interfaces/movementModel";
import { Cell } from "../../Cell";
import { PathFindingHelper } from "./pathFindingHelper";

export class A_StarModel extends PathFindingHelper {
  private movementStrategy: MovementModel | undefined;

  aStar(): void {
    let start = this.ifNull(this.startP);
    let openSet = new Set<Cell>();
    let closedSet = new Set<Cell>();
    openSet.add(start);
    while (openSet.size > 0) {
      let current = this.lowestFscore(openSet);
      if (current.isEnd) {
        this.path = this.backtrackPath(current);
        return;
      }
      openSet.delete(current);
      closedSet.add(current);
      let neighbours = this.ifNull(this.movementStrategy).getNeighbours(
        current
      );
      for (let i = 0; i < neighbours.length; i++) {
        let neighbour = neighbours[i];
        if (closedSet.has(neighbour) || neighbour.isWall) {
          continue;
        }
        let tempG = current.posFromStart + 1;
        if (!openSet.has(neighbour)) {
          openSet.add(neighbour);
        } else if (tempG >= neighbour.posFromStart) {
          continue;
        }
        neighbour.previousCell = current;
        neighbour.posFromStart = tempG;
        neighbour.posFromEnd = this.huristic(
          neighbour.pos,
          this.ifNull(this.endP).pos
        );
      }
    }
  }
  //all cell fScore are initialized to infinity
  lowestFscore(openSet: Set<Cell>): Cell {
    let lowest = Infinity;
    let lowestCell = new Cell();
    openSet.forEach((cell) => {
      if (cell.fScore < lowest) {
        lowest = cell.fScore;
        lowestCell = cell;
      }
    });
    return lowestCell;
  }
  huristic(a: Point, b: Point): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  setMovementModel(movementModel: MovementModel): void {
    this.movementStrategy = movementModel;
  }
  start(): void {
    this.aStar();
  }
}
