/**
 * Custom error class for validation errors.
 */
export class ValidationError extends Error {
  constructor(message: string, public type: "warning" | "error" = "error") {
    super(message);
    this.name = "ValidationError";
  }
}

export const algorithmUsesHeuristic = (algorithm: string): boolean => {
  const heuristicAlgorithms = ["a*", "astar"];
  return heuristicAlgorithms.includes(algorithm.toLowerCase());
};
