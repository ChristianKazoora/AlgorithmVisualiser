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
  height: number;
  width: number;
  start: Point;
  end: Point;
  walls: Point[] = [];
  renderer: any;
  huristicModel: HuristicModel | undefined;
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
  setHuristicModel(huristicModel: HuristicModel): void {
    this.huristicModel = huristicModel;
    this.cellState.setHuristicModel(huristicModel);
  }
  clearBoard(): void {
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
  animatePath(): void {
    this.cellState.animatePath();
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
    const iterator = state.draw();
    return (
      <div className="border-black border-[5px] flex m-auto justify-center">
        <Grid id="board">
          {iterator.map((row: number, i: number) => (
            <Grid container item key={i}>
              {row}
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
  setMovementModel(strategy: MovementModel): void {
    this.cellStateManager.setMovementStrategy(strategy);
  }
  setStart(pos: Point): void {
    throw new Error("Method not implemented.");
  }
  setEnd(pos: Point): void {
    throw new Error("Method not implemented.");
  }

  setWalls(walls: Point[]): void {
    throw new Error("Method not implemented.");
  }
  getData(): void {
    throw new Error("Method not implemented.");
  }
}
