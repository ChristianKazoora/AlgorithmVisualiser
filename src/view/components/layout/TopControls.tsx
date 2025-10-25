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
import {
  ValidationError,
  validateAction,
  algorithmUsesHeuristic,
} from "../../../utils/validation";

const TopControls: React.FC<{ boardController: BoardController }> = ({
  boardController,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isManualDiagonal, setIsManualDiagonal] = useState(true);
  const [isMazeAnimating, setIsMazeAnimating] = useState(false);
  const [isPathAnimating, setIsPathAnimating] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("BFS");
  const [hasMazeBeenGenerated, setHasMazeBeenGenerated] = useState(false);
  const { showSuccess, showError, showInfo, showWarning } = useNotification();

  const isPathfindingPage =
    location.pathname === "/manualPathfinding" ||
    location.pathname === "/autoPathfinding";

  // Reset animation states when page changes
  useEffect(() => {
    setIsMazeAnimating(false);
    setIsPathAnimating(false);
    setHasMazeBeenGenerated(false);
  }, [location.pathname]);

  if (!isPathfindingPage) return null;

  const handleAlgorithmChange = (algorithm: string) => {
    setSelectedAlgorithm(algorithm);
    switch (algorithm) {
      case "DFS":
        boardController.setAlgorithmController(new DfsController());
        showSuccess(`Algorithm changed to Depth-First Search (DFS)`);
        break;
      case "BFS":
        boardController.setAlgorithmController(new BfsController());
        showSuccess(`Algorithm changed to Breadth-First Search (BFS)`);
        break;
      case "A*":
        boardController.setAlgorithmController(new A_StarController());
        showSuccess(`Algorithm changed to A* Search`);
        break;
    }
  };

  // Check if heuristic should be disabled
  const isHeuristicDisabled = !algorithmUsesHeuristic(selectedAlgorithm);

  // Check if run button should be disabled
  const isRunDisabled =
    location.pathname === "/autoPathfinding" && !hasMazeBeenGenerated;

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
      if (location.pathname === "/autoPathfinding" && !hasMazeBeenGenerated) {
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
        validateAction.runAlgorithm(null, null);
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
        setHasMazeBeenGenerated(true);
        showInfo("Maze generation completed.");
      } else {
        // Start animation
        if (location.pathname === "/autoPathfinding") {
          setIsMazeAnimating(true);
          showInfo("Maze generation animation started.");

          // Use callback to properly track when animation completes
          boardController.animateMaze(() => {
            setIsMazeAnimating(false);
            setHasMazeBeenGenerated(true);
            showSuccess("Maze generated! Ready for pathfinding.");
          });
        } else {
          // In manual mode, just generate without animation
          boardController.ganarateMaze();
          setHasMazeBeenGenerated(true);
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
            defaultValue="BFS"
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
