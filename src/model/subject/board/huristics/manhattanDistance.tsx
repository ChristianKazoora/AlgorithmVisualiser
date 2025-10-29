import { Point } from "../../../../shared/point";
import { HuristicModel } from "../../../Interfaces/huristicModel";
/**
 * manhattanDistance class that implements the HuristicModel interface.
 */
export class manhattanDistance implements HuristicModel {
  huristic(a: Point, b: Point): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
}
