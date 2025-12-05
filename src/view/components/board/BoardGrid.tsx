import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useBoardSize } from "../../../contexts/BoardSizeContext";
import { BoardController } from "../../../controller/interfaces/boardController";

interface BoardGridProps {
  controller: BoardController;
  className?: string;
}

// Apply responsive sizing to the existing MUI Grid structure
const applyResponsiveSizing = (cellSize: number): void => {
  // Use CSS custom properties to override the hardcoded 20px dimensions
  const root = document.documentElement;
  root.style.setProperty("--dynamic-cell-size", `${cellSize}px`);

  // Apply styles to all grid cells
  const style =
    document.getElementById("dynamic-grid-styles") ||
    document.createElement("style");
  style.id = "dynamic-grid-styles";
  style.textContent = `
    .MuiGrid-item[id^="cell-"] {
      width: ${cellSize}px !important;
      height: ${cellSize}px !important;
      min-width: ${cellSize}px !important;
      min-height: ${cellSize}px !important;
      max-width: ${cellSize}px !important;
      max-height: ${cellSize}px !important;
      box-sizing: border-box !important;
      flex: none !important;
    }
  `;

  if (!document.head.contains(style)) {
    document.head.appendChild(style);
  }
};

const BoardGrid: React.FC<BoardGridProps> = ({
  controller,
  className = "",
}) => {
  const {
    dimensions: { width, height, cellSize },
    updateDimensions,
  } = useBoardSize();

  const containerRef = useRef<HTMLDivElement>(null);
  const [needsRerender, setNeedsRerender] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  // Apply responsive sizing whenever cellSize changes
  useEffect(() => {
    applyResponsiveSizing(cellSize);
  }, [cellSize]);

  // Set up a callback for the controller to notify us of resets
  useEffect(() => {
    // Store the callback in the controller if it supports it
    if (typeof (controller as any).setResetCallback === "function") {
      (controller as any).setResetCallback(() => {
        console.log("Reset callback triggered");
        setRenderKey((prev) => prev + 1);
      });
    }

    return () => {
      // Clean up callback on unmount
      if (typeof (controller as any).setResetCallback === "function") {
        (controller as any).setResetCallback(undefined);
      }
    };
  }, [controller]);

  // After the board re-renders, make sure visual elements are updated
  useEffect(() => {
    if (renderKey > 0) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        console.log("Calling clearBoard to update visual elements");
        controller.clearBoard();
      });
    }
  }, [renderKey, controller]);

  // Resize underlying data model when dimensions change
  // useEffect(() => {
  //   controller.resize(width, height);
  //   // Reattach listeners after resize (manual dragging relies on ids)
  //   controller.addEventListeners();
  // }, [width, height, controller]);

  // Use the original BoardManager draw() method which returns the proper MUI Grid structure
  const originalDraw = useMemo(() => {
    try {
      console.log("Drawing board, render key:", renderKey);
      return controller.draw();
    } catch (e) {
      console.error("Error drawing board:", e);
      return <div>Error rendering board</div>;
    }
  }, [controller, cellSize, width, height, renderKey]);

  // Detect overflow and line wrapping and flag rerender button
  useEffect(() => {
    const checkOverflow = () => {
      const el = containerRef.current;
      if (!el) return;
      const grid = el.querySelector("#board") as HTMLElement | null;
      if (!grid) return;

      // Compare actual rendered size to container viewport
      const hasHorizontalOverflow = grid.offsetWidth > el.clientWidth;
      const hasVerticalOverflow = grid.offsetHeight > el.clientHeight;
      setNeedsRerender(hasHorizontalOverflow || hasVerticalOverflow);
    };
    const raf = requestAnimationFrame(checkOverflow);
    return () => cancelAnimationFrame(raf);
  }, [originalDraw, cellSize, width, height]);

  const handleRerender = useCallback(() => {
    const el = containerRef.current;
    const grid = el?.querySelector("#board") as HTMLElement | null;

    // Try to compute a new cell size that fits the current board within container
    if (el && grid) {
      const padding = 8; // small padding allowance
      const availableW = el.clientWidth - padding;
      const availableH = el.clientHeight - padding;
      const newCellSize = Math.max(
        8,
        Math.floor(Math.min(availableW / width, availableH / height))
      );

      // If still overflowing at min size, reduce grid dimensions to fit
      const maxCols = Math.max(10, Math.floor(availableW / newCellSize));
      const maxRows = Math.max(8, Math.floor(availableH / newCellSize));

      let nextWidth = width;
      let nextHeight = height;
      if (width > maxCols || height > maxRows) {
        nextWidth = Math.min(width, maxCols);
        nextHeight = Math.min(height, maxRows);

        // Resize the underlying controller board to avoid wrapping/overflow
        controller.resize(nextWidth, nextHeight);
      }

      // Clear the board visuals before applying new sizing
      controller.clearBoard();

      // Update dimensions in context (cell size first to ensure CSS applies)
      updateDimensions({
        cellSize: newCellSize,
        width: nextWidth,
        height: nextHeight,
      });
      setNeedsRerender(false);
    } else {
      // Fallback: just clear and keep current dims but mark no rerender needed
      controller.clearBoard();
      setNeedsRerender(false);
    }
  }, [controller, height, updateDimensions, width]);

  return (
    <div
      ref={containerRef}
      className={`board-container inline-block p-2 rounded-lg ${className}`}
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "hidden",
        touchAction: "none", // Prevent page scroll during cell interactions
      }}
    >
      {/* Rerender to fit button */}
      {needsRerender && (
        <div className="w-full flex justify-center mb-2">
          <button
            className="btn btn-warning btn-sm"
            onClick={handleRerender}
            title="Recalculate cell size and dimensions to fit"
          >
            Rerender to fit
          </button>
        </div>
      )}
      <div className="algorithm-grid" style={{ touchAction: "none" }}>
        {originalDraw}
      </div>
    </div>
  );
};

export default BoardGrid;
