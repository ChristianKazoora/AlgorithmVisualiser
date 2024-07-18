import { Point } from "../../../../shared/point";
import { HuristicModel } from "../../../Interfaces/huristicModel";

export class euclideanDistance implements HuristicModel {
  huristic(a: Point, b: Point): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }
}
