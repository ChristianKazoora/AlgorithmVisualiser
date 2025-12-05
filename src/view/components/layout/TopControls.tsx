import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  BoardController,
  AutoMazeAlgorithm,
  ManualMazeAlgorithm,
  WallDistribution,
} from "../../../controller/interfaces/boardController";
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

// Set to true to enable notifications, false to disable
const NOTIFICATIONS_ENABLED = false;

// FAB corner positions
type FabCorner = "bottom-right" | "bottom-left" | "top-right" | "top-left";

const TopControls: React.FC<{ boardController: BoardController }> = ({
  boardController,
}) => {
  const location = useLocation();
  const [isManualDiagonal, setIsManualDiagonal] = useState(true);
  const [isMazeAnimating, setIsMazeAnimating] = useState(false);
  const [isPathAnimating, setIsPathAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAlgorithmController, setSelectedAlgorithmController] =
    useState<BfsController | DfsController | A_StarController | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("BFS");
  const [selectedMazeAlgorithm, setSelectedMazeAlgorithm] =
    useState<string>("backtracker");
  const [wallDensity, setWallDensity] = useState<number>(0.3);
  const [wallDistribution, setWallDistribution] =
    useState<WallDistribution>("uniform");
  const [showDensityFab, setShowDensityFab] = useState<boolean>(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const notification = useNotification();

  // FAB dragging state
  const [fabCorner, setFabCorner] = useState<FabCorner>("bottom-right");
  const [isDraggingFab, setIsDraggingFab] = useState(false);
  const [fabDragOffset, setFabDragOffset] = useState({ x: 0, y: 0 });
  const [fabTempPos, setFabTempPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const fabRef = useRef<HTMLDivElement>(null);

  // Determine if we're on a small screen (enable FAB dragging)
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close FAB popup when clicking outside
  useEffect(() => {
    if (!showDensityFab) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) {
        setShowDensityFab(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDensityFab]);

  // Get corner position styles
  const getCornerStyles = (corner: FabCorner): React.CSSProperties => {
    switch (corner) {
      case "bottom-right":
        return { bottom: 24, right: 24 };
      case "bottom-left":
        return { bottom: 24, left: 24 };
      case "top-right":
        return { top: 80, right: 24 }; // Account for navbar
      case "top-left":
        return { top: 80, left: 24 };
      default:
        return { bottom: 24, right: 24 };
    }
  };

  // Snap to nearest corner
  const snapToCorner = useCallback((x: number, y: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const midX = vw / 2;
    const midY = vh / 2;

    const isRight = x > midX;
    const isBottom = y > midY;

    if (isRight && isBottom) return "bottom-right";
    if (!isRight && isBottom) return "bottom-left";
    if (isRight && !isBottom) return "top-right";
    return "top-left";
  }, []);

  // Handle FAB drag start
  const handleFabDragStart = (e: React.PointerEvent | React.TouchEvent) => {
    if (!isSmallScreen) return;
    e.stopPropagation();
    setIsDraggingFab(true);
    setShowDensityFab(false); // Close popup while dragging

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    if (fabRef.current) {
      const rect = fabRef.current.getBoundingClientRect();
      setFabDragOffset({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });
      setFabTempPos({ x: rect.left, y: rect.top });
    }
  };

  // Handle FAB drag move
  useEffect(() => {
    if (!isDraggingFab) return;

    const handleMove = (e: PointerEvent | TouchEvent) => {
      e.preventDefault();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      setFabTempPos({
        x: clientX - fabDragOffset.x,
        y: clientY - fabDragOffset.y,
      });
    };

    const handleEnd = (e: PointerEvent | TouchEvent) => {
      const clientX =
        "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
      const clientY =
        "changedTouches" in e ? e.changedTouches[0].clientY : e.clientY;

      const newCorner = snapToCorner(clientX, clientY);
      setFabCorner(newCorner);
      setIsDraggingFab(false);
      setFabTempPos(null);
    };

    window.addEventListener("pointermove", handleMove, { passive: false });
    window.addEventListener("pointerup", handleEnd);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDraggingFab, fabDragOffset, snapToCorner]);

  // Wrapper functions that respect NOTIFICATIONS_ENABLED flag
  const showSuccess = (msg: string) =>
    NOTIFICATIONS_ENABLED && notification.showSuccess(msg);
  const showError = (msg: string) =>
    NOTIFICATIONS_ENABLED && notification.showError(msg);
  const showInfo = (msg: string) =>
    NOTIFICATIONS_ENABLED && notification.showInfo(msg);
  const showWarning = (msg: string) =>
    NOTIFICATIONS_ENABLED && notification.showWarning(msg);

  const isPathfindingPage =
    location.pathname === "/manualPathfinding" ||
    location.pathname === "/autoPathfinding";

  const isAutoMode = location.pathname === "/autoPathfinding";

  // Notify board controller of any loading state changes
  React.useEffect(() => {
    const callback = (boardController as any).setAnimatingCallback;
    if (callback) {
      callback(isLoading || isMazeAnimating || isPathAnimating);
    }
  }, [isLoading, isMazeAnimating, isPathAnimating, boardController]);

  // Reset animation states when page changes and sync algorithm selection
  useEffect(() => {
    setIsMazeAnimating(false);
    setIsPathAnimating(false);
    setForceUpdate((prev) => prev + 1);

    // Reset maze algorithm selection based on mode
    if (isAutoMode) {
      setSelectedMazeAlgorithm("backtracker");
      boardController.setMazeAlgorithm("backtracker");
    } else {
      setSelectedMazeAlgorithm("random");
      boardController.setMazeAlgorithm("random");
    }

    const currentController = boardController.getAlgorithmController() as
      | BfsController
      | DfsController
      | A_StarController
      | null;

    if (currentController) {
      setSelectedAlgorithmController(currentController);
    } else {
      const defaultController = new BfsController();
      boardController.setAlgorithmController(defaultController);
      setSelectedAlgorithmController(defaultController);
    }
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

  const isHeuristicDisabled =
    !selectedAlgorithmController ||
    selectedAlgorithmController.usesHeuristic() !== true;

  const isRunDisabled =
    (isAutoMode && !boardController.isMazeGenerated()) || forceUpdate < 0;

  const handleHeuristicChange = (heuristic: string) => {
    switch (heuristic) {
      case "Manhattan":
        boardController.setHuristicModel(new manhattanDistance());
        showInfo(`Heuristic set to Manhattan Distance`);
        break;
      case "Euclidean":
        boardController.setHuristicModel(new euclideanDistance());
        showInfo(`Heuristic set to Euclidean Distance`);
        break;
      case "Chebyshev":
        boardController.setHuristicModel(new chebyshevDistance());
        showInfo(`Heuristic set to Chebyshev Distance`);
        break;
    }
  };

  const handleDiagonalToggle = () => {
    if (isAutoMode) {
      showWarning("Diagonal movement is not available in auto mode");
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

  const handleMazeAlgorithmChange = (algorithm: string) => {
    setSelectedMazeAlgorithm(algorithm);
    boardController.setMazeAlgorithm(
      algorithm as AutoMazeAlgorithm | ManualMazeAlgorithm
    );

    const algorithmNames: Record<string, string> = {
      // Auto mode algorithms
      backtracker: "Recursive Backtracker",
      "binary-tree": "Binary Tree",
      prims: "Prim's Algorithm",
      "recursive-division": "Recursive Division",
      // Manual mode algorithms
      random: "Random Walls",
      "cellular-automata": "Cellular Automata",
    };
    showInfo(`Maze algorithm set to ${algorithmNames[algorithm] || algorithm}`);
  };

  const handleDensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const density = parseFloat(e.target.value);
    setWallDensity(density);
    boardController.setWallDensity(density);
  };

  const handleDistributionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const distribution = e.target.value as WallDistribution;
    setWallDistribution(distribution);
    boardController.setWallDistribution(distribution);

    const distributionNames: Record<WallDistribution, string> = {
      uniform: "Uniform Distribution",
      "center-focused": "Center Focused",
      "edge-focused": "Edge Focused",
      gradient: "Gradient Pattern",
    };
    showInfo(`Wall distribution set to ${distributionNames[distribution]}`);
  };

  const handleRunAlgorithm = async () => {
    try {
      if (isAutoMode && !boardController.isMazeGenerated()) {
        showWarning("Please generate a maze first in auto mode.");
        return;
      }

      if (isPathAnimating) {
        const controller = boardController.getAlgorithmController();
        if (controller) {
          controller.completePathImmediately();
        }
        setIsPathAnimating(false);
        showInfo("Pathfinding animation completed.");
      } else {
        setIsPathAnimating(true);
        showSuccess("Algorithm started!");

        await boardController.animatePathAsync(() => {
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
        showError("Failed to run algorithm.");
        console.error("Run algorithm error:", error);
      }
    }
  };

  const handleClearBoard = () => {
    try {
      boardController.clearBoard();
      showInfo("Board cleared.");
    } catch (error) {
      showError("Failed to clear the board.");
    }
  };

  const handleMazeToggle = () => {
    try {
      if (isMazeAnimating) {
        const controller = boardController.getAlgorithmController();
        if (controller) {
          controller.completeMazeImmediately();
        }
        setIsMazeAnimating(false);
        boardController.setMazeGenerated(true);
        setForceUpdate((prev) => prev + 1);
        showInfo("Maze generation completed.");
      } else {
        if (isAutoMode) {
          setIsMazeAnimating(true);
          showInfo("Generating maze...");

          boardController.animateMaze(() => {
            setIsMazeAnimating(false);
            setForceUpdate((prev) => prev + 1);
            showSuccess("Maze generated!");
          });
        } else {
          boardController.generateMaze();
          setForceUpdate((prev) => prev + 1);
          showSuccess("Maze generated!");
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
      setIsMazeAnimating(false);
      setIsPathAnimating(false);
      setForceUpdate((prev) => prev + 1);
      boardController.setMazeGenerated(false);
      showInfo("Board reset.");
    } catch (error) {
      showError("Failed to reset the board.");
      console.error("Reset board error:", error);
    }
  };

  return (
    <div className="bg-base-200 border-b border-base-300 px-2 py-2">
      {/* Row 1: Selectors */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
        {/* Algorithm Selection */}
        <select
          className="select select-bordered select-sm"
          value={selectedAlgorithm}
          onChange={(e) => handleAlgorithmChange(e.target.value)}
        >
          <option value="BFS">BFS</option>
          <option value="DFS">DFS</option>
          <option value="A*">A*</option>
        </select>

        {/* Heuristic */}
        <select
          className="select select-bordered select-sm"
          defaultValue="Manhattan"
          onChange={(e) => handleHeuristicChange(e.target.value)}
          disabled={isHeuristicDisabled}
          style={isHeuristicDisabled ? { opacity: 0.5 } : {}}
          title={isHeuristicDisabled ? "Only used by A*" : ""}
        >
          <option value="Manhattan">Manhattan</option>
          <option value="Euclidean">Euclidean</option>
          <option value="Chebyshev">Chebyshev</option>
        </select>

        {/* Maze Algorithm Selector */}
        {isAutoMode ? (
          <select
            className="select select-bordered select-sm"
            value={selectedMazeAlgorithm}
            onChange={(e) => handleMazeAlgorithmChange(e.target.value)}
            title="Maze generation algorithm"
          >
            <option value="backtracker">Recursive Backtracker</option>
            <option value="binary-tree">Binary Tree</option>
            <option value="prims">Prim's Algorithm</option>
            <option value="recursive-division">Recursive Division</option>
          </select>
        ) : (
          <select
            className="select select-bordered select-sm"
            value={selectedMazeAlgorithm}
            onChange={(e) => handleMazeAlgorithmChange(e.target.value)}
            title="Maze generation algorithm"
          >
            <option value="random">Random Walls</option>
            <option value="cellular-automata">Cellular Automata</option>
          </select>
        )}

        {/* Diagonal Toggle - Manual mode only */}
        {!isAutoMode && (
          <label className="flex items-center gap-1 cursor-pointer">
            <span className="text-sm">Diagonal</span>
            <input
              type="checkbox"
              className="toggle toggle-sm toggle-primary"
              checked={isManualDiagonal}
              onChange={handleDiagonalToggle}
            />
          </label>
        )}
      </div>

      {/* Row 2: Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          className={`btn btn-sm ${
            isPathAnimating ? "btn-warning" : "btn-primary"
          }`}
          onClick={handleRunAlgorithm}
          disabled={isRunDisabled && !isPathAnimating}
          title={isRunDisabled ? "Generate a maze first" : ""}
        >
          {isPathAnimating ? "Skip" : "Run"}
        </button>

        <button className="btn btn-sm" onClick={handleClearBoard}>
          Clear
        </button>

        <button
          className={`btn btn-sm ${isMazeAnimating ? "btn-warning" : ""}`}
          onClick={handleMazeToggle}
        >
          {isMazeAnimating ? "Skip" : "Maze"}
        </button>

        <button className="btn btn-sm" onClick={handleResetBoard}>
          Reset
        </button>
      </div>

      {/* FAB for Wall Density Control - Manual mode only */}
      {!isAutoMode && (
        <div
          ref={fabRef}
          className="fixed z-50"
          style={
            isDraggingFab && fabTempPos
              ? {
                  left: fabTempPos.x,
                  top: fabTempPos.y,
                  transition: "none",
                  cursor: "grabbing",
                }
              : {
                  ...getCornerStyles(fabCorner),
                  transition: "all 0.3s ease-out",
                  cursor: isSmallScreen ? "grab" : "default",
                }
          }
        >
          <div className={`fab fab-flower ${showDensityFab ? "fab-open" : ""}`}>
            {/* Main FAB button */}
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-lg btn-primary btn-circle shadow-lg ${
                isDraggingFab ? "scale-110" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!isDraggingFab) {
                  setShowDensityFab(!showDensityFab);
                }
              }}
              onPointerDown={handleFabDragStart}
              onTouchStart={handleFabDragStart}
              title={
                isSmallScreen
                  ? "Drag to move, tap to open settings"
                  : "Wall Density Settings"
              }
              style={{ touchAction: "none" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>

            {/* Density slider popup - position based on corner */}
            {showDensityFab && !isDraggingFab && (
              <div
                className="absolute bg-base-200 rounded-lg shadow-xl p-4 min-w-[220px] border border-base-300"
                style={{
                  ...(fabCorner.includes("bottom")
                    ? { bottom: 64 }
                    : { top: 64 }),
                  ...(fabCorner.includes("right") ? { right: 0 } : { left: 0 }),
                }}
              >
                <div className="text-sm font-medium mb-2">
                  Wall Density: {Math.round(wallDensity * 100)}%
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.6"
                  step="0.05"
                  value={wallDensity}
                  onChange={handleDensityChange}
                  className="range range-primary range-sm w-full"
                />
                <div className="flex justify-between text-xs text-base-content/60 mt-1 mb-3">
                  <span>Sparse</span>
                  <span>Dense</span>
                </div>

                {/* Distribution selector - only for Random Walls */}
                {selectedMazeAlgorithm === "random" && (
                  <>
                    <div className="divider my-2"></div>
                    <div className="text-sm font-medium mb-2">
                      Wall Distribution
                    </div>
                    <select
                      className="select select-bordered select-sm w-full"
                      value={wallDistribution}
                      onChange={handleDistributionChange}
                      title="How walls are distributed across the board"
                    >
                      <option value="uniform">Uniform</option>
                      <option value="center-focused">Center Focused</option>
                      <option value="edge-focused">Edge Focused</option>
                      <option value="gradient">Gradient</option>
                    </select>
                    <div className="text-xs text-base-content/60 mt-2">
                      {wallDistribution === "uniform" &&
                        "Equal chance everywhere"}
                      {wallDistribution === "center-focused" &&
                        "More walls in the center"}
                      {wallDistribution === "edge-focused" &&
                        "More walls at edges"}
                      {wallDistribution === "gradient" &&
                        "Density increases left to right"}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopControls;
