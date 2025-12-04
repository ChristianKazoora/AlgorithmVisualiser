import { Cell } from "../../../model/subject/Cell";
import { PathConfig } from "../pathConfig";

/**
 * Direction enum for all 8 possible movement directions
 */
export enum Direction {
  NORTH = "N",
  SOUTH = "S",
  EAST = "E",
  WEST = "W",
  NORTH_EAST = "NE",
  NORTH_WEST = "NW",
  SOUTH_EAST = "SE",
  SOUTH_WEST = "SW",
}

/**
 * SVG endpoint coordinates for each direction from center (50, 50)
 * Using 100x100 viewBox, center is at (50, 50)
 */
const DIRECTION_ENDPOINTS: Record<Direction, { x: number; y: number }> = {
  [Direction.NORTH]: { x: 50, y: 0 },
  [Direction.SOUTH]: { x: 50, y: 100 },
  [Direction.EAST]: { x: 100, y: 50 },
  [Direction.WEST]: { x: 0, y: 50 },
  [Direction.NORTH_EAST]: { x: 100, y: 0 },
  [Direction.NORTH_WEST]: { x: 0, y: 0 },
  [Direction.SOUTH_EAST]: { x: 100, y: 100 },
  [Direction.SOUTH_WEST]: { x: 0, y: 100 },
};

/**
 * Determines the direction from current cell to neighbor cell
 */
function getDirection(current: Cell, neighbor: Cell): Direction | null {
  const dx = neighbor.y - current.y; // column difference (horizontal)
  const dy = neighbor.x - current.x; // row difference (vertical)

  // Cardinal directions
  if (dx === 0 && dy < 0) return Direction.NORTH;
  if (dx === 0 && dy > 0) return Direction.SOUTH;
  if (dx > 0 && dy === 0) return Direction.EAST;
  if (dx < 0 && dy === 0) return Direction.WEST;

  // Diagonal directions
  if (dx > 0 && dy < 0) return Direction.NORTH_EAST;
  if (dx < 0 && dy < 0) return Direction.NORTH_WEST;
  if (dx > 0 && dy > 0) return Direction.SOUTH_EAST;
  if (dx < 0 && dy > 0) return Direction.SOUTH_WEST;

  return null;
}

/**
 * Configuration for path rendering
 */
interface PathRenderConfig {
  strokeColor: string;
  strokeWidth: number;
  strokeLinecap: "round" | "square" | "butt";
  strokeLinejoin: "round" | "miter" | "bevel";
}

const DEFAULT_CONFIG: PathRenderConfig = {
  strokeColor: "#ef4444", // Tailwind red-500
  strokeWidth: 20,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/**
 * Renders a single-cell SVG path segment based on the cell's previous/next neighbours.
 * Supports all 8 directions: N, S, E, W, NE, NW, SE, SW
 * This creates consistent straight/corner/diagonal segments without needing specialized components.
 */
export function renderCellPathSegment(
  cell: Cell,
  config: Partial<PathRenderConfig> = {}
): JSX.Element | null {
  const prev = cell.previousCell;
  const next = cell.nextCell;

  if (!prev && !next) {
    return null;
  }

  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const cx = 50;
  const cy = 50;

  // Collect all active directions
  const directions: Set<Direction> = new Set();

  if (prev) {
    const dir = getDirection(cell, prev);
    if (dir) directions.add(dir);
  }

  if (next) {
    const dir = getDirection(cell, next);
    if (dir) directions.add(dir);
  }

  if (directions.size === 0) {
    return null;
  }

  // Build SVG path commands
  let d = "";
  directions.forEach((dir) => {
    const endpoint = DIRECTION_ENDPOINTS[dir];
    d += `M ${cx} ${cy} L ${endpoint.x} ${endpoint.y} `;
  });

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <path
        d={d.trim()}
        stroke={mergedConfig.strokeColor}
        strokeWidth={mergedConfig.strokeWidth}
        strokeLinecap={mergedConfig.strokeLinecap}
        strokeLinejoin={mergedConfig.strokeLinejoin}
        fill="none"
      />
    </svg>
  );
}

/**
 * Renders an entire path as a single SVG overlay.
 * This is more efficient for rendering complete paths and provides smoother visuals.
 * Can be used as an alternative to per-cell rendering.
 */
export function renderFullPathSVG(
  path: Cell[],
  cellSize: number,
  config: Partial<PathRenderConfig> = {}
): JSX.Element | null {
  if (!path || path.length < 2) {
    return null;
  }

  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  // Calculate viewBox dimensions based on grid bounds
  const minX = Math.min(...path.map((c) => c.y));
  const maxX = Math.max(...path.map((c) => c.y));
  const minY = Math.min(...path.map((c) => c.x));
  const maxY = Math.max(...path.map((c) => c.x));

  const width = (maxX - minX + 1) * cellSize;
  const height = (maxY - minY + 1) * cellSize;

  // Build a single continuous path
  let d = "";
  path.forEach((cell, index) => {
    const x = (cell.y - minX) * cellSize + cellSize / 2;
    const y = (cell.x - minY) * cellSize + cellSize / 2;

    if (index === 0) {
      d += `M ${x} ${y} `;
    } else {
      d += `L ${x} ${y} `;
    }
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: "absolute",
        left: minX * cellSize,
        top: minY * cellSize,
        pointerEvents: "none",
        zIndex: PathConfig.Z_INDEX.PATH_BASE,
      }}
    >
      <path
        d={d.trim()}
        stroke={mergedConfig.strokeColor}
        strokeWidth={mergedConfig.strokeWidth * (cellSize / 100)}
        strokeLinecap={mergedConfig.strokeLinecap}
        strokeLinejoin={mergedConfig.strokeLinejoin}
        fill="none"
      />
    </svg>
  );
}

/**
 * Get direction name for debugging/logging
 */
export function getDirectionName(dir: Direction): string {
  const names: Record<Direction, string> = {
    [Direction.NORTH]: "North",
    [Direction.SOUTH]: "South",
    [Direction.EAST]: "East",
    [Direction.WEST]: "West",
    [Direction.NORTH_EAST]: "North-East",
    [Direction.NORTH_WEST]: "North-West",
    [Direction.SOUTH_EAST]: "South-East",
    [Direction.SOUTH_WEST]: "South-West",
  };
  return names[dir];
}
