import { Point } from "../../shared/point";

export interface HuristicModel {
  huristic(a: Point, b: Point): number;
}
