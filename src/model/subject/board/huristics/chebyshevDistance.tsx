import { Point } from "../../../../shared/point";
import { HuristicModel } from "../../../Interfaces/huristicModel";

/**
 * chebyshevDistance class that implements the HuristicModel interface.
 */
export class chebyshevDistance implements HuristicModel {
  huristic(a: Point, b: Point): number {
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
  }
}
