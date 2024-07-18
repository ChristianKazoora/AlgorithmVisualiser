import { Point } from "../../../../shared/point";
import { MovementModel } from "../../../Interfaces/movementModel";
import { Cell } from "../../Cell";
import { PathFindingHelper } from "./pathFindingHelper";

export class A_StarModel extends PathFindingHelper {
  private movementStrategy: MovementModel | undefined;

  aStar(): void {
    let start = this.ifNull(this.startP);
    let openSet = new Set<Cell>();
    openSet.add(start);
    while (openSet.size > 0) {
      let current = this.lowestFscore(openSet);
      openSet.delete(current);
      this.ifNull(this.visited).add(current);
      if (current.isEnd) {
        this.path = this.backtrackPath(current);
        return;
      }

      let neighbors = this.ifNull(this.movementStrategy).getNeighbours(current);

      for (let neighbor of neighbors as Cell[]) {
        if (neighbor.isWall) {
          continue;
        }
        let tempGScore = current.gScore + 1;

        if (neighbor.gScore >= tempGScore) {
          continue;
        }
        if (openSet.has(neighbor)) {
          if (neighbor.fScore >= current.fScore) {
            continue;
          }
        }
        if (this.ifNull(this.visited).contains(neighbor)) {
          if (neighbor.fScore >= current.fScore) {
            continue;
          }
        } else {
          neighbor.previousCell = current;
        }
        if (neighbor.previousCell != undefined) {
          neighbor.previousCell.nextCell = undefined;
        }
        neighbor.gScore = tempGScore;
        neighbor.hScore = this.ifNull(this.huristicModel).huristic(
          { x: neighbor.x, y: neighbor.y },
          { x: this.ifNull(this.endP).x, y: this.ifNull(this.endP).y }
        );
        neighbor.fScore = neighbor.gScore + neighbor.hScore;

        openSet.add(neighbor);
      }
      this.ifNull(this.visited).add(current);
    }
  }
  resetAllCellFscroreGscoreHscore(): void {
    this.grid?.forEach((row) => {
      row.forEach((cell) => {
        cell.fScore = 0;
        cell.gScore = 0;
        cell.hScore = 0;
      });
    });
  }

  lowestFscore(openSet: Set<Cell>): Cell {
    return Array.from(openSet).reduce((min, point) =>
      point.fScore < min.fScore ? point : min
    );
  }
  huristic(a: Point, b: Point): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  setMovementModel(movementModel: MovementModel): void {
    this.movementStrategy = movementModel;
  }
  start(): void {
    this.resetPrevNext();
    this.resetA_startVars;
    this.resetAllCellFscroreGscoreHscore();
    this.aStar();
  }
}
