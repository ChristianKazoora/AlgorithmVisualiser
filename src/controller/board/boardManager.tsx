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
/**
 * BoardManager class that implements the BoardController interface.
 */
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

  private mazeGenerated: boolean = false;
  private currentAlgorithmController: any = null; // Store current algorithm

  isMazeGenerated(): boolean {
    return this.mazeGenerated;
  }

  setMazeGenerated(value: boolean): void {
    this.mazeGenerated = value;
  }

  /**
   * Helper method to check if a maze actually exists in the board.
   * @returns True if a maze exists, false otherwise.
   */
  private checkIfMazeExistsInBoard(): boolean {
    // A maze exists if any cell has at least one wall broken (not all walls are true)
    const gridLength = this.grid.length;
    const gridWidth = this.grid[0].length;

    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const cell = this.grid[i][j];
        // If any cell has a broken wall (false), then a maze exists
        if (!cell.northW || !cell.southW || !cell.eastW || !cell.westW) {
          return true;
        }
      }
    }
    return false;
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
  generateMaze(): void {
    this.cellState.generateMaze();
    this.mazeGenerated = true;
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
    // Don't call generateMaze() here - animateMazeGeneration handles everything
    this.cellState.animateMazeGeneration(() => {
      this.mazeGenerated = true;
      if (onComplete) {
        onComplete();
      }
    });
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

    // Store the current algorithm controller for mode switching
    this.currentAlgorithmController = algorithm;
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

    // When switching to auto mode, check if a maze already exists in the board
    // This handles the edge case where you generate a maze, switch to manual,
    // reset, then switch back to auto - the maze walls are still there
    if (cellState.constructor.name === "AutoCellState") {
      if (this.checkIfMazeExistsInBoard()) {
        this.mazeGenerated = true;
      }
    }

    // Reapply the current algorithm controller if one was previously set
    // This maintains the algorithm selection when switching between modes
    if (this.currentAlgorithmController) {
      this.setAlgorithmController(this.currentAlgorithmController);
    }
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
    this.cellState.resetBoard();
    // Reset maze generated flag
    this.mazeGenerated = false;

    // Trigger a re-render
    this.cellState.clearBoard();
  }
}
