import { Point } from "../../../../shared/point";
import { HuristicModel } from "../../../Interfaces/huristicModel";

export class chebyshevDistance implements HuristicModel {
  huristic(a: Point, b: Point): number {
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
  }
}
