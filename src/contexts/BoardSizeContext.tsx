import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface BoardDimensions {
  width: number;
  height: number;
  cellSize: number;
  maxWidth: number;
  maxHeight: number;
}

export interface BoardSizeContextType {
  dimensions: BoardDimensions;
  updateDimensions: (newDimensions: Partial<BoardDimensions>) => void;
  resetToOptimal: () => void;
  isAutoSize: boolean;
  setAutoSize: (auto: boolean) => void;
}

const BoardSizeContext = createContext<BoardSizeContextType | undefined>(
  undefined
);

export const useBoardSize = (): BoardSizeContextType => {
  const context = useContext(BoardSizeContext);
  if (!context) {
    throw new Error("useBoardSize must be used within a BoardSizeProvider");
  }
  return context;
};

interface BoardSizeProviderProps {
  children: ReactNode;
}

const calculateOptimalDimensions = (): BoardDimensions => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Account for navbar (~64px), top controls (~80px), title/instructions (~100px), and padding
  const availableHeight = viewportHeight - 64 - 80 - 100 - 40; // navbar + controls + title + padding
  // Account for sidebar (on large screens) and padding
  const sidebarWidth = viewportWidth > 1024 ? 320 : 0;
  const availableWidth = viewportWidth - sidebarWidth - 60; // sidebar + padding

  // Cell size range - keep reasonable for visibility
  const minCellSize = 18;
  const maxCellSize = 32;

  // Preferred grid dimensions - balance between grid size and cell visibility
  const preferredCols =
    viewportWidth < 768 ? 18 : viewportWidth < 1024 ? 25 : 32;
  const preferredRows =
    viewportWidth < 768 ? 12 : viewportWidth < 1024 ? 16 : 20;

  // Calculate the largest cell size that fits the preferred grid in available space
  const cellSizeByWidth = Math.floor(availableWidth / preferredCols);
  const cellSizeByHeight = Math.floor(availableHeight / preferredRows);
  let cellSize = Math.max(
    minCellSize,
    Math.min(maxCellSize, Math.min(cellSizeByWidth, cellSizeByHeight))
  );

  // Calculate actual grid dimensions that fit with this cell size
  const maxCols = Math.floor(availableWidth / cellSize);
  const maxRows = Math.floor(availableHeight / cellSize);

  // Ensure reasonable minimum and maximum grid size
  const minCols = 12;
  const minRows = 8;
  const maxColsLimit = 45;
  const maxRowsLimit = 30;

  const width = Math.max(
    minCols,
    Math.min(maxCols, maxColsLimit, preferredCols)
  );
  const height = Math.max(
    minRows,
    Math.min(maxRows, maxRowsLimit, preferredRows)
  );

  return {
    width,
    height,
    cellSize: Math.floor(cellSize),
    maxWidth: maxCols,
    maxHeight: maxRows,
  };
};

export const BoardSizeProvider: React.FC<BoardSizeProviderProps> = ({
  children,
}) => {
  const [dimensions, setDimensions] = useState<BoardDimensions>(
    calculateOptimalDimensions
  );
  const [isAutoSize, setIsAutoSize] = useState(true);

  // Handle window resize
  useEffect(() => {
    if (!isAutoSize) return;

    const handleResize = () => {
      const newDimensions = calculateOptimalDimensions();
      setDimensions(newDimensions);
    };

    window.addEventListener("resize", handleResize);

    // Debounce resize events
    let timeoutId: number;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(handleResize, 250);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [isAutoSize]);

  const updateDimensions = (newDimensions: Partial<BoardDimensions>) => {
    setDimensions((prev) => {
      const updated = { ...prev, ...newDimensions };

      // Ensure dimensions don't exceed maximum values
      updated.width = Math.min(updated.width, updated.maxWidth);
      updated.height = Math.min(updated.height, updated.maxHeight);

      // Ensure minimum values
      updated.width = Math.max(updated.width, 10);
      updated.height = Math.max(updated.height, 8);
      updated.cellSize = Math.max(updated.cellSize, 8);

      return updated;
    });
  };

  const resetToOptimal = () => {
    const optimal = calculateOptimalDimensions();
    setDimensions(optimal);
    setIsAutoSize(true);
  };

  const setAutoSize = (auto: boolean) => {
    setIsAutoSize(auto);
    if (auto) {
      const optimal = calculateOptimalDimensions();
      setDimensions(optimal);
    }
  };

  const value: BoardSizeContextType = {
    dimensions,
    updateDimensions,
    resetToOptimal,
    isAutoSize,
    setAutoSize,
  };

  return (
    <BoardSizeContext.Provider value={value}>
      {children}
    </BoardSizeContext.Provider>
  );
};
