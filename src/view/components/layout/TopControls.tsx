import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BoardController } from "../../../controller/interfaces/boardController";
import { BfsController } from "../../../controller/pathfindingCellStates/algoControllers/bfsController";
import { DfsController } from "../../../controller/pathfindingCellStates/algoControllers/dfsController";
import { A_StarController } from "../../../controller/pathfindingCellStates/algoControllers/aStarController";
import { manhattanDistance } from "../../../model/subject/board/huristics/manhattanDistance";
import { euclideanDistance } from "../../../model/subject/board/huristics/euclideanDistance";
import { chebyshevDistance } from "../../../model/subject/board/huristics/chebyshevDistance";
import { GetManulNeighbours } from "../../../model/subject/board/strategies/manual/getManulNeighbours";
import { GetManulNeigbourWD } from "../../../model/subject/board/strategies/manual/getManulNeigbourWD";
import { useNotification } from "../notifications/NotificationProvider";
import { ValidationError } from "../../../utils/validation";

const TopControls: React.FC<{ boardController: BoardController }> = ({
  boardController,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isManualDiagonal, setIsManualDiagonal] = useState(true);
  const [isMazeAnimating, setIsMazeAnimating] = useState(false);
  const [isPathAnimating, setIsPathAnimating] = useState(false);
  const [selectedAlgorithmController, setSelectedAlgorithmController] =
    useState<BfsController | DfsController | A_StarController | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("BFS");
  const [forceUpdate, setForceUpdate] = useState(0); // Used to force re-render when maze state changes
  const { showSuccess, showError, showInfo, showWarning } = useNotification();

  const isPathfindingPage =
    location.pathname === "/manualPathfinding" ||
    location.pathname === "/autoPathfinding";

  // Reset animation states when page changes and sync algorithm selection
  useEffect(() => {
    setIsMazeAnimating(false);
    setIsPathAnimating(false);
    // Force re-render to update Run button availability after mode switch
    setForceUpdate((prev) => prev + 1);

    // Sync the selected algorithm from the controller when switching modes
    const currentController = boardController.getAlgorithmController() as
      | BfsController
      | DfsController
      | A_StarController
      | null;

    if (currentController) {
      setSelectedAlgorithmController(currentController);
    } else {
      // Initialize with BFS if no controller exists
      const defaultController = new BfsController();
      boardController.setAlgorithmController(defaultController);
      setSelectedAlgorithmController(defaultController);
    }

    // Don't reset maze state - it persists in the boardController
  }, [location.pathname, boardController]);

  if (!isPathfindingPage) return null;

  const handleAlgorithmChange = (algorithm: string) => {
    setSelectedAlgorithm(algorithm);
    let newController: BfsController | DfsController | A_StarController;

    switch (algorithm) {
      case "DFS":
        newController = new DfsController();
        boardController.setAlgorithmController(newController);
        setSelectedAlgorithmController(newController);
        showSuccess(`Algorithm changed to Depth-First Search (DFS)`);
        break;
      case "BFS":
        newController = new BfsController();
        boardController.setAlgorithmController(newController);
        setSelectedAlgorithmController(newController);
        showSuccess(`Algorithm changed to Breadth-First Search (BFS)`);
        break;
      case "A*":
        newController = new A_StarController();
        boardController.setAlgorithmController(newController);
        setSelectedAlgorithmController(newController);
        showSuccess(`Algorithm changed to A* Search`);
        break;
    }
  };

  // Check if heuristic should be disabled
  // If controller is null, default to disabled. Only enable if usesHeuristic() returns true.
  const isHeuristicDisabled =
    !selectedAlgorithmController ||
    selectedAlgorithmController.usesHeuristic() !== true;

  // Check if run button should be disabled - use boardController's state directly
  // forceUpdate triggers re-calculation when maze state changes
  const isRunDisabled =
    (location.pathname === "/autoPathfinding" &&
      !boardController.isMazeGenerated()) ||
    forceUpdate < 0; // Reference forceUpdate to ensure recalculation (always false)

  const handleHeuristicChange = (heuristic: string) => {
    switch (heuristic) {
      case "Manhattan Distance":
        boardController.setHuristicModel(new manhattanDistance());
        showInfo(`Heuristic set to Manhattan Distance`);
        break;
      case "Euclidean Distance":
        boardController.setHuristicModel(new euclideanDistance());
        showInfo(`Heuristic set to Euclidean Distance`);
        break;
      case "Chebyshev Distance":
        boardController.setHuristicModel(new chebyshevDistance());
        showInfo(`Heuristic set to Chebyshev Distance`);
        break;
    }
  };

  const handleModeToggle = () => {
    if (location.pathname === "/manualPathfinding") {
      navigate("/autoPathfinding");
      showSuccess("Switched to Auto Pathfinding mode");
    } else if (location.pathname === "/autoPathfinding") {
      navigate("/manualPathfinding");
      showSuccess("Switched to Manual Pathfinding mode");
    }
  };

  const handleDiagonalToggle = () => {
    if (location.pathname === "/autoPathfinding") {
      showWarning("Diagonal movement settings are not available in auto mode");
      return;
    }
    if (isManualDiagonal) {
      boardController.setMovementModel(new GetManulNeighbours());
      showInfo("Diagonal movement disabled");
    } else {
      boardController.setMovementModel(new GetManulNeigbourWD());
      showInfo("Diagonal movement enabled");
    }
    setIsManualDiagonal(!isManualDiagonal);
  };

  const handleRunAlgorithm = () => {
    try {
      // In auto mode, check if maze has been generated
      if (
        location.pathname === "/autoPathfinding" &&
        !boardController.isMazeGenerated()
      ) {
        showWarning(
          "Please generate a maze first before running the algorithm in auto mode."
        );
        return;
      }

      if (isPathAnimating) {
        // Skip to end of animation by completing immediately
        const controller = boardController.getAlgorithmController();
        if (controller) {
          controller.completePathImmediately();
        }
        setIsPathAnimating(false);
        showInfo("Pathfinding animation completed.");
      } else {
        // Start animation
        // validateAction.runAlgorithm(null, null);
        setIsPathAnimating(true);
        showSuccess("Algorithm started! Watch the pathfinding in action.");

        // Use callback to properly track when animation completes
        boardController.animatePath(() => {
          setIsPathAnimating(false);
          showSuccess("Pathfinding complete!");
        });
      }
    } catch (error) {
      setIsPathAnimating(false);
      if (error instanceof ValidationError) {
        if (error.type === "warning") showWarning(error.message);
        else showError(error.message);
      } else {
        showError("Failed to run algorithm. Please check your setup.");
        console.error("Run algorithm error:", error);
      }
    }
  };

  const handleClearBoard = () => {
    try {
      boardController.clearBoard();
      showInfo("Board cleared successfully.");
    } catch (error) {
      showError("Failed to clear the board.");
    }
  };

  const handleMazeToggle = () => {
    try {
      if (isMazeAnimating) {
        // Skip to end of animation by completing immediately
        const controller = boardController.getAlgorithmController();
        if (controller) {
          controller.completeMazeImmediately();
        }
        setIsMazeAnimating(false);
        boardController.setMazeGenerated(true);
        setForceUpdate((prev) => prev + 1); // Force re-render
        showInfo("Maze generation completed.");
      } else {
        // Start animation
        if (location.pathname === "/autoPathfinding") {
          setIsMazeAnimating(true);
          showInfo("Maze generation animation started.");

          // Use callback to properly track when animation completes
          boardController.animateMaze(() => {
            setIsMazeAnimating(false);
            setForceUpdate((prev) => prev + 1); // Force re-render
            // Maze generated flag is set in boardController.animateMaze()
            showSuccess("Maze generated! Ready for pathfinding.");
          });
        } else {
          // In manual mode, just generate without animation
          boardController.generateMaze();
          setForceUpdate((prev) => prev + 1); // Force re-render
          // Maze generated flag is set in boardController.generateMaze()
          showSuccess("Maze generated! Ready for pathfinding.");
        }
      }
    } catch (error) {
      setIsMazeAnimating(false);
      showError("Failed to generate maze.");
    }
  };

  const handleResetBoard = () => {
    try {
      boardController.resetBoard();
      // Reset animation states when board is reset
      setIsMazeAnimating(false);
      setIsPathAnimating(false);
      setForceUpdate((prev) => prev + 1); // Force re-render to update isRunDisabled
      boardController.setMazeGenerated(false);
      showInfo("Board reset to initial state.");
    } catch (error) {
      showError("Failed to reset the board.");
      console.error("Reset board error:", error);
    }
  };

  return (
    <div className="bg-base-200 border-b border-base-300">
      <div className="max-w-full px-4 py-2">
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Toggle */}
          <div className="join">
            <button
              className={`btn join-item ${
                location.pathname === "/autoPathfinding"
                  ? "btn-primary"
                  : "btn-outline"
              }`}
              onClick={handleModeToggle}
            >
              Auto
            </button>
            <button
              className={`btn join-item ${
                location.pathname === "/manualPathfinding"
                  ? "btn-primary"
                  : "btn-outline"
              }`}
              onClick={handleModeToggle}
            >
              Manual
            </button>
          </div>

          {/* Algorithm Selection */}
          <select
            className="select select-bordered"
            value={selectedAlgorithm}
            onChange={(e) => handleAlgorithmChange(e.target.value)}
          >
            <option value="BFS">BFS</option>
            <option value="DFS">DFS</option>
            <option value="A*">A*</option>
          </select>

          {/* Heuristic (disabled if algorithm doesn't use it) */}
          {isHeuristicDisabled ? (
            <div
              className="tooltip"
              data-tip="Heuristic is only used by A* algorithm"
            >
              <select
                className="select select-bordered"
                defaultValue="Manhattan Distance"
                onChange={(e) => handleHeuristicChange(e.target.value)}
                disabled={isHeuristicDisabled}
                style={{
                  opacity: 0.5,
                  cursor: "not-allowed",
                }}
              >
                <option value="Manhattan Distance">Manhattan</option>
                <option value="Euclidean Distance">Euclidean</option>
                <option value="Chebyshev Distance">Chebyshev</option>
              </select>
            </div>
          ) : (
            <select
              className="select select-bordered"
              defaultValue="Manhattan Distance"
              onChange={(e) => handleHeuristicChange(e.target.value)}
            >
              <option value="Manhattan Distance">Manhattan</option>
              <option value="Euclidean Distance">Euclidean</option>
              <option value="Chebyshev Distance">Chebyshev</option>
            </select>
          )}

          {/* Diagonal (manual only) */}
          {location.pathname === "/manualPathfinding" && (
            <label className="label cursor-pointer gap-2 items-center">
              <span className="label-text">Diagonal</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={isManualDiagonal}
                onChange={handleDiagonalToggle}
              />
            </label>
          )}

          <div className="ml-auto flex flex-wrap gap-2">
            {isRunDisabled ? (
              <div
                className="tooltip"
                data-tip="Generate a maze first in auto mode"
              >
                <button
                  className="btn btn-primary"
                  onClick={handleRunAlgorithm}
                  disabled={isRunDisabled}
                  style={{
                    opacity: 0.5,
                    cursor: "not-allowed",
                  }}
                >
                  Run
                </button>
              </div>
            ) : (
              <button
                className={`btn ${
                  isPathAnimating ? "btn-warning" : "btn-primary"
                }`}
                onClick={handleRunAlgorithm}
              >
                {isPathAnimating ? "Skip" : "Run"}
              </button>
            )}
            <button className="btn" onClick={handleClearBoard}>
              Clear
            </button>
            <button
              className={`btn ${isMazeAnimating ? "btn-warning" : ""}`}
              onClick={handleMazeToggle}
            >
              {isMazeAnimating ? "Skip" : "Maze"}
            </button>
            <button className="btn" onClick={handleResetBoard}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopControls;
