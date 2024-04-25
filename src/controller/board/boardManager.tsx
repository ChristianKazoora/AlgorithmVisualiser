import { Cell } from "../../model/subject/Cell";
import { Board } from "../../model/subject/board/board";
import { Point } from "../../shared/point";
import { CellState } from "../pathfindingCellStates/cellState";
import { CellStateManager } from "../pathfindingCellStates/cellStateManager";
import { ManualCellState } from "../pathfindingCellStates/manual/manualCellState";
import { BoardController } from "./boardController";
import { Grid } from "@mui/material";
export class BoardManager implements BoardController {
  board: Board;
  grid: Array<Array<Cell>>;
  cellState: CellState;
  cellStateManager: CellState;
  constructor(size: number, _cellState: CellState = new ManualCellState()) {
    this.board = new Board(size);
    this.grid = this.board.board;
    this.cellState = _cellState;
    this.cellStateManager = new CellStateManager(
      this.board,
      { x: 0, y: 20 },
      { x: 20, y: 30 },
      this.cellState
    );
  }
  setBoard(board: any): void {
    this.board = board;
    this.grid = this.board.board;
  }
  setCellState(cellState: any): void {
    this.cellState = cellState;
    const start: Point = { x: 10, y: 0 };
    const end: Point = {
      x: 20,
      y: 20,
    };
    this.cellStateManager = new CellStateManager(
      this.board,
      start,
      end,
      this.cellState
    );
  }
  draw(): any {
    return (
      <div className=" border-black border-[5px] flex m-auto items-center justify-center">
        <Grid>
          {this.cellStateManager.draw().map((row, i) => (
            <Grid container item key={i}>
              {row}
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
