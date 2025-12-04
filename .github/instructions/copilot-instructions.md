# Algorithm Visualizer - AI Coding Instructions

## Architecture Overview

This is a **React + TypeScript + Vite** pathfinding algorithm visualizer using MVC-inspired architecture:

```
Model (src/model/)      → Data structures, algorithm logic (A*, BFS, DFS), maze generation
Controller (src/controller/) → State management, rendering coordination, animation orchestration
View (src/view/)        → React components, pages, UI layout
```

### Core Data Flow

1. **BoardManager** (`controller/board/boardManager.tsx`) - Central coordinator
2. **CellStateManager** → delegates to **CellStateHelper** subclasses:
   - `ManualCellState` - user draws walls, uses `isWall` property
   - `AutoCellState` - maze-based, uses wall flags (`northW`, `southW`, `eastW`, `westW`)
3. **AlgorithmController** (A\*/BFS/DFS) → produces visited cells + path
4. **GridRenderer** → animates results via DOM manipulation

### Two Movement Strategies

- **Manual mode**: `GetManulNeigbourWD` - checks `neighbor.isWall`
- **Auto mode**: `GetAutoNeigbour` - checks `cell.northW/southW/eastW/westW` (walls between cells)

**Critical**: Auto mode requires maze generation first (all walls start UP/true). Without a maze, no neighbors are reachable.

## Key Patterns

### Async Algorithm Animation

Algorithms use **async generators** for step-by-step visualization:

```typescript
// In model (e.g., aStarModel.tsx)
async *aStarAsyncSteps(): AsyncGenerator<AStarStepSnapshot, void, void> {
  // ... algorithm loop
  yield { current, visited, path, isComplete: false };
  await Promise.resolve(); // yield control
}

// In data layer (e.g., aStarData.tsx) - consume with delays
for await (const step of controller.asyncSteps()) {
  onStep(step);
  await delay(PathConfig.ANIMATION.STEP_DELAY); // 50ms default
}
```

### Renderer Pattern

Renderers use direct DOM manipulation for performance:

```typescript
// Show element: element.className = "block"
// Hide element: element.className = "hidden"
// Cell IDs: `cell-${x}-${y}-visited`, `cell-${x}-${y}-path`, `cell-${x}-${y}-wall`
```

### Cell Structure (`model/subject/Cell.tsx`)

```typescript
// Navigation walls (for maze/auto mode)
northW, southW, eastW, westW: boolean  // true = wall UP, false = passable

// Manual mode walls
isWall: boolean

// Pathfinding state
fScore, gScore, hScore: number  // A* scores
previousCell, nextCell: Cell    // path reconstruction
```

## Development Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # TypeScript compile + Vite build
npm run test     # Run Vitest tests
npm run test:ui  # Vitest with UI
```

## Common Pitfalls

1. **Auto mode shows no path**: Maze must be generated first. Check `boardManager.isMazeGenerated()`
2. **Animation not visible**: Ensure delays exist in data layer's async consumer loop
3. **Stale path data**: Call `renderer.resetState()` or clear `previousCell`/`nextCell` before re-running
4. **Skip not working**: Async animations need abort mechanism - check `shouldAbort()` pattern in controllers
5. **Mode switching causes stale state**: `boardManager.setCellState()` calls `renderer.resetState()` to clear tracked path cells and timeouts

## File Locations for Common Changes

| Task                    | Files                                                                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Add new algorithm       | `model/subject/algorithms/pathFinding/`, `controller/pathfindingCellStates/algoControllers/`, `controller/pathfindingCellStates/getData/` |
| Modify animation timing | `controller/cellDecorations/pathConfig.ts`                                                                                                |
| Change path rendering   | `controller/cellDecorations/paths/line.tsx`                                                                                               |
| Add movement strategy   | `model/subject/board/strategies/`                                                                                                         |
| Modify grid rendering   | `controller/pathfindingCellStates/renderer/`                                                                                              |
| Add maze algorithm      | `model/subject/maze/auto/` or `model/subject/maze/manual/`, implements `MazeModel` interface                                              |

## Testing Approach

Tests live in `src/test/` using Vitest. Focus on algorithm correctness:

- `bfs.test.js`, `a_star.test.js` - pathfinding logic
- `board.test.js` - board/cell structure

## UI Stack

- **Styling**: Tailwind CSS + DaisyUI components (themes configured in `tailwind.config.js`)
- **Animations**: Framer Motion (UI), setTimeout chains (algorithm visualization)
- **Notifications**: react-hot-toast via `NotificationProvider` - toggle with `NOTIFICATIONS_ENABLED` constant in `TopControls.tsx` and `Sidebar.tsx`
- **Routing**: react-router-dom (/, /manualPathfinding, /autoPathfinding)

## UI Component Structure

```
Layout.tsx              → Main layout wrapper with TopNavbar, LoadingBar, TopControls
├── TopNavbar.tsx       → Primary nav with logo, page tabs, settings dropdown
├── TopControls.tsx     → Secondary controls bar (algorithm, heuristic, run/clear/maze/reset)
├── Sidebar.tsx         → Left sidebar (shown on home page only)
└── LoadingBar.tsx      → Animation progress indicator
```

### Animation Speed Constants

Both renderers should use consistent timing:

- `ANIMATIONSPEED = 6` - Base multiplier for animation delays
- Visited cell reveal: `ANIMATIONSPEED * 1.55 * i` ms
- Path reveal: `Math.pow(ANIMATIONSPEED, Math.sqrt(ANIMATIONSPEED)) * i` ms
