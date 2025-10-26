// Validation utilities for the algorithm actions
export class ValidationError extends Error {
  constructor(message: string, public type: "warning" | "error" = "error") {
    super(message);
    this.name = "ValidationError";
  }
}

// Board validation functions
export const validateBoardState = {
  // Check if start and end points are set
  hasStartAndEnd: (board: any): boolean => {
    // This would need to be implemented based on your board structure
    return true; // Placeholder
  },

  // Check if there's a valid path possible
  hasValidPath: (board: any): boolean => {
    // This would need pathfinding logic to determine if any path exists
    return true; // Placeholder
  },

  // Check if the board has been modified
  isBoardReady: (board: any): boolean => {
    return true; // Placeholder
  },

  // Validate algorithm selection
  isAlgorithmSelected: (algorithm: string | null): boolean => {
    return algorithm !== null && algorithm !== "";
  },

  // Validate that the board isn't empty
  hasContent: (board: any): boolean => {
    return true; // Placeholder
  },
};

// User action validation messages
export const ValidationMessages = {
  NO_START_POINT:
    "Please set a start point on the board before running the algorithm.",
  NO_END_POINT:
    "Please set an end point on the board before running the algorithm.",
  NO_ALGORITHM_SELECTED:
    "Please select an algorithm before running the visualization.",
  EMPTY_BOARD:
    "The board appears to be empty. Try generating a maze or adding some walls.",
  NO_PATH_POSSIBLE:
    "No path is possible between the start and end points with the current obstacles.",
  ALGORITHM_RUNNING:
    "An algorithm is already running. Please wait for it to complete.",
  BOARD_TOO_SMALL:
    "The board is too small for meaningful pathfinding. Try a larger grid.",
  INVALID_MAZE_SIZE:
    "Cannot generate a maze with the current board dimensions.",
  CLEAR_BOARD_CONFIRM:
    "Are you sure you want to clear the board? This will remove all walls and paths.",
};

// Validation function that throws ValidationError
export const validateAction = {
  runAlgorithm: (boardState: any, algorithmState: any) => {
    if (!validateBoardState.isAlgorithmSelected(algorithmState?.algorithm)) {
      throw new ValidationError(
        ValidationMessages.NO_ALGORITHM_SELECTED,
        "warning"
      );
    }

    if (!validateBoardState.hasStartAndEnd(boardState)) {
      throw new ValidationError(ValidationMessages.NO_START_POINT, "error");
    }

    // Add more validations as needed
  },

  generateMaze: (boardState: any) => {
    // Add maze generation validations
    return true;
  },

  clearBoard: (boardState: any) => {
    if (validateBoardState.hasContent(boardState)) {
      throw new ValidationError(
        ValidationMessages.CLEAR_BOARD_CONFIRM,
        "warning"
      );
    }
  },
};

// Helper function to get user-friendly algorithm names
export const getAlgorithmDisplayName = (algorithm: string): string => {
  const names: { [key: string]: string } = {
    bfs: "Breadth-First Search (BFS)",
    dfs: "Depth-First Search (DFS)",
    astar: "A* Search Algorithm",
    dijkstra: "Dijkstra's Algorithm",
  };

  return names[algorithm.toLowerCase()] || algorithm;
};

// Helper function to get heuristic display names
export const getHeuristicDisplayName = (heuristic: string): string => {
  const names: { [key: string]: string } = {
    manhattan: "Manhattan Distance",
    euclidean: "Euclidean Distance",
    chebyshev: "Chebyshev Distance",
  };

  return names[heuristic.toLowerCase()] || heuristic;
};

// Check if algorithm uses heuristic
export const algorithmUsesHeuristic = (algorithm: string): boolean => {
  const heuristicAlgorithms = ["a*", "astar"];
  return heuristicAlgorithms.includes(algorithm.toLowerCase());
};
