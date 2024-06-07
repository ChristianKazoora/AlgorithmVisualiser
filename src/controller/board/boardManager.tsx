import { Cell } from "../../model/subject/Cell";
import { Board } from "../../model/subject/board/board";
import { GetManulNeigbourWD } from "../../model/subject/board/strategies/manual/getManulNeigbourWD";
import { GetManulNeighbours } from "../../model/subject/board/strategies/manual/getManulNeighbours";
import { CellState } from "../interfaces/cellState";
import { CellStateManager } from "../pathfindingCellStates/cellStateManager";
import { ManualCellState } from "../pathfindingCellStates/manual/manualCellState";
import { BoardController } from "../interfaces/boardController";
import { Grid } from "@mui/material";
import { MovementModel } from "../../model/Interfaces/movementModel";
import { Point } from "../../shared/point";
import { AutoCellState } from "../pathfindingCellStates/auto/autoCellState";
import { useEffect, useState } from "react";
export class BoardManager implements BoardController {
  board: Board;
  grid: Array<Array<Cell>>;
  cellState: CellState;
  cellStateManager: CellState;
  height: number;
  width: number;
  start: Point;
  end: Point;
  walls: Point[];
  constructor(_cellState: CellState = new ManualCellState()) {
    this.height = Math.floor((document.documentElement.clientHeight - 60) / 25);
    this.width = Math.floor((document.documentElement.clientWidth - 30) / 20);
    this.board = new Board({ y: this.height, x: this.width });

    this.grid = this.board.grid;
    this.cellState = _cellState;
    this.end = {
      x: parseInt((this.height - 1) / 2 + ""),
      y: parseInt((this.width - 1) / 2 - 5 + ""),
    };
    this.start = {
      x: parseInt((this.height - 1) / 2 + ""),
      y: parseInt((this.width - 1) / 2 + 5 + ""),
    };

    this.walls = [
      {
        x: parseInt((this.height - 1) / 2 + 4 + ""),
        y: parseInt((this.width - 1) / 2 + ""),
      },
      {
        x: parseInt((this.height - 1) / 2 + 3 + ""),
        y: parseInt((this.width - 1) / 2 + ""),
      },
      {
        x: parseInt((this.height - 1) / 2 + 2 + ""),
        y: parseInt((this.width - 1) / 2 + ""),
      },
      {
        x: parseInt((this.height - 1) / 2 + 1 + ""),
        y: parseInt((this.width - 1) / 2 + ""),
      },
      {
        x: parseInt((this.height - 1) / 2 + ""),
        y: parseInt((this.width - 1) / 2 + ""),
      },
      {
        x: parseInt((this.height - 1) / 2 - 1 + ""),
        y: parseInt((this.width - 1) / 2 + ""),
      },
      {
        x: parseInt((this.height - 1) / 2 - 2 + ""),
        y: parseInt((this.width - 1) / 2 + ""),
      },
      {
        x: parseInt((this.height - 1) / 2 - 3 + ""),
        y: parseInt((this.width - 1) / 2 + ""),
      },
      {
        x: parseInt((this.height - 1) / 2 - 4 + ""),
        y: parseInt((this.width - 1) / 2 + ""),
      },
    ];
    this.cellStateManager = new CellStateManager(
      this.board,
      this.start,
      this.end,
      new GetManulNeighbours(),
      this.cellState
      // this.walls
    );
  }
  ganarateMaze(): void {
    this.cellState.ganarateMaze();
  }
  addEventListeners(): void {
    this.cellState.addEventListeners();
  }
  animatePath(): void {
    console.log("animatePath");
    this.cellState.animatePath();
  }
  setStart(pos: Point): void {
    throw new Error("Method not implemented.");
  }
  setEnd(pos: Point): void {
    throw new Error("Method not implemented.");
  }
  setMovementStrategy(strategy: MovementModel): void {
    throw new Error("Method not implemented.");
  }
  setWalls(walls: Point[]): void {
    throw new Error("Method not implemented.");
  }
  getData(): void {
    throw new Error("Method not implemented.");
  }
  setBoard(board: any): void {
    this.board = board;
    this.grid = this.board.grid;
  }
  setCellState(cellState: any, renderer: any, movementModel: any): void {
    this.cellState = cellState;
    this.cellStateManager = new CellStateManager(
      this.board, //board
      this.start, //start
      this.end, //end
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
}
