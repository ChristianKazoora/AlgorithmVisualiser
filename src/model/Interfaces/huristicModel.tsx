import { Point } from "../../shared/point";
/**
 * Interface for Heuristic Models used in pathfinding algorithms.
 */
export interface HuristicModel {
  /**
   * Calculates the heuristic value between two points.
   * @param a - The first point.
   * @param b - The second point.
   * @returns The heuristic value.
   */
  huristic(a: Point, b: Point): number;
}
