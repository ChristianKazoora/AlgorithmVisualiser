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

  // Account for navbar (64px) and padding
  const availableHeight = viewportHeight - 64 - 80; // navbar + padding
  // Account for sidebar (320px when open) and padding
  const availableWidth = viewportWidth - 320 - 80; // sidebar + padding

  // Ensure minimum cell size for visibility and prevent wrapping
  const minCellSize = 12;
  const maxCellSize = 30;

  // Calculate optimal cell size based on available space
  let cellSize = Math.max(
    minCellSize,
    Math.min(maxCellSize, Math.min(availableWidth / 50, availableHeight / 30))
  );

  // Calculate grid dimensions that fit in available space
  const maxCols = Math.floor(availableWidth / cellSize);
  const maxRows = Math.floor(availableHeight / cellSize);

  // Ensure reasonable minimum and maximum grid size
  const minCols = 15;
  const minRows = 10;
  const maxColsLimit = 60;
  const maxRowsLimit = 40;

  const width = Math.max(minCols, Math.min(maxCols, maxColsLimit));
  const height = Math.max(minRows, Math.min(maxRows, maxRowsLimit));

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
