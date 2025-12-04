/**
 * Configuration for SVG-based path rendering
 * Centralized constants for consistent path appearance
 */

export const PathConfig = {
  // SVG stroke settings (relative to 100x100 viewBox)
  SVG: {
    STROKE_WIDTH: 35, // Stroke width in viewBox units (thicker for visibility)
    STROKE_COLOR: "oklch(var(--er))", // DaisyUI error color (theme-aware red)
    STROKE_COLOR_VISITED: "oklch(var(--in))", // DaisyUI info color (theme-aware blue)
    STROKE_LINECAP: "round" as const,
    STROKE_LINEJOIN: "round" as const,
  },

  // Z-index values for layering
  Z_INDEX: {
    PATH_BASE: -5,
    PATH_OVERLAY: 10, // For full-path SVG overlay
    VISITED: -10,
  },

  // Animation timing (ms)
  ANIMATION: {
    SPEED: 6, // Base animation speed multiplier
    STEP_DELAY: 50, // Delay between async algorithm steps
    PATH_REVEAL_DELAY: 100, // Delay between path segment reveals
    MAZE_CELL_DELAY: 10, // Delay between maze cell reveals (ms)
  },
} as const;

/**
 * Helper function to get CSS value based on cell size
 * @param fraction - Fraction of cell size (e.g., 0.5 = 50% of cell size)
 */
export const getPathSize = (fraction: number): string => {
  return `calc(var(--dynamic-cell-size, 20px) * ${fraction})`;
};

/**
 * Get CSS variable value for dynamic cell size
 */
export const getCellSizeVar = (): string => {
  return "var(--dynamic-cell-size, 20px)";
};
