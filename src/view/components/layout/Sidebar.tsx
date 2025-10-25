import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiPlay, FiTrash2, FiGrid, FiSettings, FiTarget } from "react-icons/fi";
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

interface SidebarProps {
  isOpen: boolean;
  boardController: BoardController;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, boardController }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isManual, setIsManual] = useState(true);
  const [isMazeAnimating, setIsMazeAnimating] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("BFS");
  const [hasMazeBeenGenerated, setHasMazeBeenGenerated] = useState(false);
  const { showSuccess, showError, showInfo, showWarning } = useNotification();

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

  const handleDiagonalToggle = () => {
    if (location.pathname === "/autoPathfinding") {
      showWarning("Diagonal movement settings are not available in auto mode");
      return;
    }
    if (isManual) {
      boardController.setMovementModel(new GetManulNeighbours());
      showInfo("Diagonal movement disabled");
    } else {
      boardController.setMovementModel(new GetManulNeigbourWD());
      showInfo("Diagonal movement enabled");
    }
    setIsManual(!isManual);
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

  // Enhanced control functions with notifications
  const handleRunAlgorithm = () => {
    try {
      // In auto mode, check if maze has been generated
      if (location.pathname === "/autoPathfinding" && !hasMazeBeenGenerated) {
        showWarning(
          "Please generate a maze first before running the algorithm in auto mode."
        );
        return;
      }

      // Validate before running
      validateAction.runAlgorithm(null, null); // We'd pass actual board state here

      boardController.animatePath();
      showSuccess("Algorithm started! Watch the pathfinding in action.");
    } catch (error) {
      if (error instanceof ValidationError) {
        if (error.type === "warning") {
          showWarning(error.message);
        } else {
          showError(error.message);
        }
      } else {
        showError("Failed to run algorithm. Please check your setup.");
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
    }
  };

  const isPathfindingPage =
    location.pathname === "/manualPathfinding" ||
    location.pathname === "/autoPathfinding";

  return (
    <div
      className={`sidebar bg-base-200 min-h-[calc(100vh-4rem)] transition-all duration-300 ${
        isOpen ? "w-80" : "w-0"
      } overflow-hidden border-r border-base-300`}
    >
      {isOpen && (
        <div className="p-4 space-y-6">
          {/* Algorithm Controls Section */}
          {isPathfindingPage && (
            <>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-lg font-semibold">
                  <FiTarget className="text-primary" />
                  <span>Algorithm Settings</span>
                </div>

                {/* Algorithm Selection */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Choose Algorithm
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    defaultValue="BFS"
                    onChange={(e) => handleAlgorithmChange(e.target.value)}
                  >
                    <option value="BFS">Breadth-First Search</option>
                    <option value="DFS">Depth-First Search</option>
                    <option value="A*">A* Search</option>
                  </select>
                </div>

                {/* Heuristic Selection */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Heuristic Function
                    </span>
                  </label>
                  {isHeuristicDisabled ? (
                    <div
                      className="tooltip tooltip-right"
                      data-tip="Heuristic is only used by A* algorithm"
                    >
                      <select
                        className="select select-bordered w-full"
                        defaultValue="Manhattan Distance"
                        onChange={(e) => handleHeuristicChange(e.target.value)}
                        disabled={isHeuristicDisabled}
                        style={{
                          opacity: 0.5,
                          cursor: "not-allowed",
                        }}
                      >
                        <option value="Manhattan Distance">
                          Manhattan Distance
                        </option>
                        <option value="Euclidean Distance">
                          Euclidean Distance
                        </option>
                        <option value="Chebyshev Distance">
                          Chebyshev Distance
                        </option>
                      </select>
                    </div>
                  ) : (
                    <select
                      className="select select-bordered w-full"
                      defaultValue="Manhattan Distance"
                      onChange={(e) => handleHeuristicChange(e.target.value)}
                    >
                      <option value="Manhattan Distance">
                        Manhattan Distance
                      </option>
                      <option value="Euclidean Distance">
                        Euclidean Distance
                      </option>
                      <option value="Chebyshev Distance">
                        Chebyshev Distance
                      </option>
                    </select>
                  )}
                </div>

                {/* Mode Toggle */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Pathfinding Mode
                    </span>
                  </label>
                  <div className="join w-full">
                    <button
                      className={`btn join-item flex-1 ${
                        location.pathname === "/autoPathfinding"
                          ? "btn-primary"
                          : "btn-outline"
                      }`}
                      onClick={handleModeToggle}
                    >
                      Auto
                    </button>
                    <button
                      className={`btn join-item flex-1 ${
                        location.pathname === "/manualPathfinding"
                          ? "btn-primary"
                          : "btn-outline"
                      }`}
                      onClick={handleModeToggle}
                    >
                      Manual
                    </button>
                  </div>
                </div>

                {/* Diagonal Movement Toggle */}
                {location.pathname === "/manualPathfinding" && (
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text font-medium">
                        Allow Diagonal Movement
                      </span>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={isManual}
                        onChange={handleDiagonalToggle}
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Control Buttons Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-lg font-semibold">
                  <FiSettings className="text-primary" />
                  <span>Controls</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {isRunDisabled ? (
                    <div
                      className="tooltip tooltip-right"
                      data-tip="Generate a maze first in auto mode"
                    >
                      <button
                        className="btn btn-primary btn-block"
                        onClick={handleRunAlgorithm}
                        disabled={isRunDisabled}
                        style={{
                          opacity: 0.5,
                          cursor: "not-allowed",
                        }}
                      >
                        <FiPlay className="mr-2" />
                        Run Algorithm
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary btn-block"
                      onClick={handleRunAlgorithm}
                    >
                      <FiPlay className="mr-2" />
                      Run Algorithm
                    </button>
                  )}

                  <button
                    className="btn btn-outline btn-block"
                    onClick={handleClearBoard}
                  >
                    <FiTrash2 className="mr-2" />
                    Clear Board
                  </button>

                  <button
                    className={`btn btn-block ${
                      isMazeAnimating ? "btn-warning" : "btn-outline"
                    }`}
                    onClick={handleMazeToggle}
                  >
                    <FiGrid className="mr-2" />
                    {isMazeAnimating ? "End Maze" : "Generate Maze"}
                  </button>

                  <button
                    className="btn btn-outline btn-block"
                    onClick={handleResetBoard}
                  >
                    <FiTrash2 className="mr-2" />
                    Reset Board
                  </button>
                </div>
              </div>
            </>
          )}

          {/* When not on pathfinding pages */}
          {!isPathfindingPage && (
            <div className="space-y-4">
              <div className="text-center py-8">
                <FiTarget className="mx-auto text-4xl text-base-content/50 mb-4" />
                <p className="text-base-content/70">
                  Select a pathfinding mode to see algorithm controls
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => navigate("/manualPathfinding")}
                >
                  Manual Pathfinding
                </button>
                <button
                  className="btn btn-secondary btn-block"
                  onClick={() => navigate("/autoPathfinding")}
                >
                  Auto Pathfinding
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
