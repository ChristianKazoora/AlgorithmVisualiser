import { Cell } from "../../model/subject/Cell";
import { Board } from "../../model/subject/board/board";
import { GetNeigbourWD } from "../../model/subject/board/strategies/getNeigbourWD";
import { GetNeigbour } from "../../model/subject/board/strategies/getNeighbours";
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
  constructor(_cellState: CellState = new AutoCellState()) {
    this.height = Math.floor((document.documentElement.clientHeight - 60) / 25);
    this.width = Math.floor((document.documentElement.clientWidth - 30) / 20);
    this.board = new Board({ y: this.height, x: this.width });
    this.grid = this.board.board;
    this.cellState = _cellState;

    let walls = [
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
      {
        x: parseInt((this.height - 1) / 2 + ""),
        y: parseInt((this.width - 1) / 2 - 5 + ""),
      },

      {
        x: parseInt((this.height - 1) / 2 + ""),
        y: parseInt((this.width - 1) / 2 + 5 + ""),
      },

      new GetNeigbour(),
      this.cellState,
      walls
    );
  }
  addEventListeners(): void {
    this.cellState.addEventListeners();
  }
  animatePath(): void {
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
    this.grid = this.board.board;
  }
  setCellState(cellState: any, renderer: any): void {
    this.cellState = cellState;
    this.cellStateManager = new CellStateManager(
      this.board,
      {
        x: parseInt((this.height - 1) / 2 + ""),
        y: parseInt((this.width - 1) / 2 - 5 + ""),
      },

      {
        x: parseInt((this.height - 1) / 2 + ""),
        y: parseInt((this.width - 1) / 2 + 5 + ""),
      },
      undefined,
      this.cellState,
      undefined,
      undefined,
      renderer
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
