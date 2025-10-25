import { Cell } from "../../model/subject/Cell";
import { Board } from "../../model/subject/board/board";
import { GetManulNeigbourWD } from "../../model/subject/board/strategies/manual/getManulNeigbourWD";
import { CellState } from "../interfaces/cellState";
import { CellStateManager } from "../pathfindingCellStates/cellStateManager";
import { ManualCellState } from "../pathfindingCellStates/manual/manualCellState";
import { BoardController } from "../interfaces/boardController";
import { Grid } from "@mui/material";
import { MovementModel } from "../../model/Interfaces/movementModel";
import { Point } from "../../shared/point";

import { HuristicModel } from "../../model/Interfaces/huristicModel";
export class BoardManager implements BoardController {
  board: Board;
  grid: Array<Array<Cell>>;
  cellState: CellState;
  cellStateManager: CellState;
  strategy: MovementModel | undefined;
  height: number;
  width: number;
  start: Point;
  end: Point;
  walls: Point[] = [];
  renderer: any;
  huristicModel: HuristicModel | undefined;
  private resetCallback?: () => void;

  setResetCallback(callback?: () => void): void {
    this.resetCallback = callback;
  }

  constructor(_cellState: CellState = new ManualCellState()) {
    this.height = Math.floor((document.documentElement.clientHeight - 60) / 25);
    this.width = Math.floor((document.documentElement.clientWidth - 30) / 20);
    this.board = new Board({ y: this.height, x: this.width });

    this.grid = this.board.grid;
    this.cellState = _cellState;
    this.end = {
      x: parseInt((this.height - 1) / 2 + ""),
      y: parseInt((this.width - 1) / 2 - 2 + ""),
    };
    this.start = {
      x: parseInt((this.height - 1) / 2 + ""),
      y: parseInt((this.width - 1) / 2 + 2 + ""),
    };

    // this.walls = [
    //   {
    //     x: parseInt((this.height - 1) / 2 + 4 + ""),
    //     y: parseInt((this.width - 1) / 2 + ""),
    //   },
    //   {
    //     x: parseInt((this.height - 1) / 2 + 3 + ""),
    //     y: parseInt((this.width - 1) / 2 + ""),
    //   },
    //   {
    //     x: parseInt((this.height - 1) / 2 + 2 + ""),
    //     y: parseInt((this.width - 1) / 2 + ""),
    //   },
    //   {
    //     x: parseInt((this.height - 1) / 2 + 1 + ""),
    //     y: parseInt((this.width - 1) / 2 + ""),
    //   },
    //   {
    //     x: parseInt((this.height - 1) / 2 + ""),
    //     y: parseInt((this.width - 1) / 2 + ""),
    //   },
    //   {
    //     x: parseInt((this.height - 1) / 2 - 1 + ""),
    //     y: parseInt((this.width - 1) / 2 + ""),
    //   },
    //   {
    //     x: parseInt((this.height - 1) / 2 - 2 + ""),
    //     y: parseInt((this.width - 1) / 2 + ""),
    //   },
    //   {
    //     x: parseInt((this.height - 1) / 2 - 3 + ""),
    //     y: parseInt((this.width - 1) / 2 + ""),
    //   },
    //   {
    //     x: parseInt((this.height - 1) / 2 - 4 + ""),
    //     y: parseInt((this.width - 1) / 2 + ""),
    //   },
    // ];
    this.cellStateManager = new CellStateManager(
      this.board,
      this.start,
      this.end,
      new GetManulNeigbourWD(),
      this.cellState
      // this.walls
    );
  }
  resize(width: number, height: number): void {
    // Update internal sizing and rebuild the board/grid
    this.width = width;
    this.height = height;
    this.board = new Board({ y: this.height, x: this.width });
    this.grid = this.board.grid;

    // Reset start/end to be within bounds
    this.end = {
      x: Math.min(
        this.height - 1,
        Math.max(0, Math.floor((this.height - 1) / 2) - 2)
      ),
      y: Math.min(
        this.width - 1,
        Math.max(0, Math.floor((this.width - 1) / 2))
      ),
    };
    this.start = {
      x: Math.min(
        this.height - 1,
        Math.max(0, Math.floor((this.height - 1) / 2))
      ),
      y: Math.min(
        this.width - 1,
        Math.max(0, Math.floor((this.width - 1) / 2) + 2)
      ),
    };

    // Recreate the state manager with existing settings
    this.cellStateManager = new CellStateManager(
      this.board,
      this.start,
      this.end,
      this.strategy,
      this.cellState
    );
  }
  setHuristicModel(huristicModel: HuristicModel): void {
    this.huristicModel = huristicModel;
    this.cellState.setHuristicModel(huristicModel);
  }
  clearBoard(): void {
    // this.cellState.clearAnimation();
    this.cellState.clearBoard();
  }
  getBoard(): Board {
    return this.board;
  }
  ganarateMaze(): void {
    this.cellState.ganarateMaze();
  }
  addEventListeners(): void {
    this.cellState.addEventListeners();
  }
  animatePath(onComplete?: () => void): void {
    this.cellState.clearBoard();
    // Ensure pathfinding data is calculated before animating
    this.cellState.getData();
    this.cellState.animatePath(onComplete);
  }
  animateMaze(onComplete?: () => void): void {
    // Don't call ganarateMaze() here - animateMazeGenaration handles everything
    this.cellState.animateMazeGenaration(onComplete);
  }
  setAlgorithmController(algorithm: any): void {
    const bfsController = algorithm;
    bfsController.setBoard(this.getBoard());
    bfsController.setStart(this.getStart());
    bfsController.setEnd(this.getEnd());
    bfsController.setWalls(this.getWalls());
    bfsController.setMovementStrategy(this.getMovementModel());
    bfsController.setRenderer(this.renderer);
    this.cellState.setAlgorithmController(bfsController);
  }
  getAlgorithmController(): any {
    return this.cellState.getAlgorithmController();
  }
  getStart(): Point {
    return this.cellState.getStart();
  }
  getEnd(): Point {
    return this.cellState.getEnd();
  }
  getWalls(): Point[] {
    return this.walls;
  }
  getMovementModel(): MovementModel {
    return this.cellStateManager.getMovementStrategy();
  }
  setBoard(board: any): void {
    this.board = board;
    this.grid = this.board.grid;
  }
  setCellState(cellState: any, renderer: any, movementModel: any): void {
    let theStart = this.getStart();
    let theEnd = this.getEnd();
    if (theStart === undefined) {
      theStart = this.start;
    }
    if (theEnd === undefined) {
      theEnd = this.end;
    }

    this.cellState = cellState;
    this.renderer = renderer;

    // When switching to Auto mode, initialize maze walls to true
    // Check if the new cellState is AutoCellState by checking its constructor name
    if (cellState.constructor.name === "AutoCellState") {
      // Initialize all maze walls to true for auto mode
      const gridLength = this.grid.length;
      const gridWidth = this.grid[0].length;
      for (let i = 0; i < gridLength; i++) {
        for (let j = 0; j < gridWidth; j++) {
          const cell = this.grid[i][j];
          // Only set maze walls, don't touch isWall or start/end
          cell.northW = true;
          cell.southW = true;
          cell.eastW = true;
          cell.westW = true;
        }
      }
    }

    this.cellStateManager = new CellStateManager(
      this.board, //board
      theStart, //start
      theEnd, //end
      movementModel, //movementModel
      this.cellState, //cellState
      // this.walls,
      undefined, //walls
      undefined, //AlgorithmController
      renderer //renderer
    );
  }

  draw() {
    const state = this.cellStateManager;
    const iterator: JSX.Element[][] = state.draw();
    return (
      <div className="border-black border-[1px] flex m-auto justify-center">
        <Grid id="board">
          {iterator.map((row: JSX.Element[], i: number) => (
            <Grid container item key={i} style={{ flexWrap: "nowrap" }}>
              {row}
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
  setMovementModel(strategy: MovementModel): void {
    this.strategy = strategy;
    this.cellStateManager.setMovementStrategy(strategy);
  }
  resetBoard(): void {
    // Create a new board (this gives us a fresh grid with no walls)
    this.board = new Board({ y: this.height, x: this.width });
    this.grid = this.board.grid;

    // Calculate initial center positions
    const centerX = parseInt((this.height - 1) / 2 + "");
    const centerY = parseInt((this.width - 1) / 2 + "");

    // Reset start and end to initial center positions
    this.start = {
      x: centerX,
      y: centerY + 2,
    };
    this.end = {
      x: centerX,
      y: centerY - 2,
    };

    // Clear walls array
    this.walls = [];

    // Update the actual cells on the board to mark start and end positions
    this.board.grid[this.start.x][this.start.y].isStart = true;
    this.board.grid[this.end.x][this.end.y].isEnd = true;

    // Get the current renderer and movement strategy to preserve them
    const currentRenderer =
      this.renderer || this.cellStateManager.getRenderer();
    const currentStrategy =
      this.strategy || this.cellStateManager.getMovementStrategy();

    // DON'T change the cellState - keep the current one (Auto or Manual)
    // Update the cell state manager with the fresh board but same cell state
    this.cellStateManager = new CellStateManager(
      this.board,
      this.start,
      this.end,
      currentStrategy,
      this.cellState, // Keep the current cell state (Auto or Manual)
      [], // empty walls array
      undefined, // let it use default algorithm controller
      currentRenderer
    );

    // Let the cell state handle its specific reset logic (walls, maze, etc.)
    // But DON'T call reRenderBoard() here - let React handle the re-render
    this.cellStateManager.resetBoard();

    // Notify React component to re-render
    if (this.resetCallback) {
      this.resetCallback();
    }

    // Re-add event listeners through the properly initialized cellStateManager
    this.cellStateManager.addEventListeners();
  }
  // setStart(pos: Point): void {
  //   throw new Error("Method not implemented.");
  // }
  // setEnd(pos: Point): void {
  //   throw new Error("Method not implemented.");
  // }
  //
  // setWalls(walls: Point[]): void {
  //   throw new Error("Method not implemented.");
  // }
  // getData(): void {
  //   throw new Error("Method not implemented.");
  // }
}
