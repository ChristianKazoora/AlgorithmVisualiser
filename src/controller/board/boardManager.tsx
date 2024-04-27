import { Cell } from "../../model/subject/Cell";
import { Board } from "../../model/subject/board/board";
import { GetNeigbourWD } from "../../model/subject/board/strategies/getNeigbourWD";
import { GetNeigbour } from "../../model/subject/board/strategies/getNeighbours";
import { CellState } from "../interfaces/cellState";
import { CellStateManager } from "../pathfindingCellStates/cellStateManager";
import { ManualCellState } from "../pathfindingCellStates/manual/manualCellState";
import { BoardController } from "../interfaces/boardController";
import { Grid } from "@mui/material";
export class BoardManager implements BoardController {
  board: Board;
  grid: Array<Array<Cell>>;
  cellState: CellState;
  cellStateManager: CellState;
  walls = [
    //first top collumn
    { x: 0, y: 5 },
    { x: 1, y: 5 },
    { x: 2, y: 5 },
    { x: 3, y: 5 },
    { x: 4, y: 5 },
    { x: 5, y: 5 },
    { x: 6, y: 5 },
    { x: 7, y: 5 },
    { x: 8, y: 5 },
    { x: 9, y: 5 },
    { x: 10, y: 5 },
    { x: 11, y: 5 },
    { x: 12, y: 5 },
    { x: 13, y: 5 },
    { x: 14, y: 5 },
    { x: 15, y: 5 },
    { x: 16, y: 5 },
    { x: 17, y: 5 },
    { x: 18, y: 5 },
    { x: 19, y: 5 },
    { x: 20, y: 5 },

    //second top collumn
    { x: 0, y: 25 },
    { x: 1, y: 25 },
    { x: 2, y: 25 },
    { x: 3, y: 25 },
    { x: 4, y: 25 },
    { x: 5, y: 25 },
    { x: 6, y: 25 },
    { x: 7, y: 25 },
    { x: 8, y: 25 },
    { x: 9, y: 25 },
    { x: 10, y: 25 },
    { x: 11, y: 25 },
    { x: 12, y: 25 },
    { x: 13, y: 25 },
    { x: 14, y: 25 },
    { x: 15, y: 25 },
    { x: 16, y: 25 },
    { x: 17, y: 25 },
    { x: 18, y: 25 },
    { x: 19, y: 25 },
    { x: 20, y: 25 },

    //third top collumn
    { x: 0, y: 45 },
    { x: 1, y: 45 },
    { x: 2, y: 45 },
    { x: 3, y: 45 },
    { x: 4, y: 45 },
    { x: 5, y: 45 },
    { x: 6, y: 45 },
    { x: 7, y: 45 },
    { x: 8, y: 45 },
    { x: 9, y: 45 },
    { x: 10, y: 45 },
    { x: 11, y: 45 },
    { x: 12, y: 45 },
    { x: 13, y: 45 },
    { x: 14, y: 45 },
    { x: 15, y: 45 },
    { x: 16, y: 45 },
    { x: 17, y: 45 },
    { x: 18, y: 45 },
    { x: 19, y: 45 },
    { x: 20, y: 45 },

    //first bottom collumn
    { x: 24, y: 15 },
    { x: 23, y: 15 },
    { x: 22, y: 15 },
    { x: 21, y: 15 },
    { x: 20, y: 15 },
    { x: 19, y: 15 },
    { x: 18, y: 15 },
    { x: 17, y: 15 },
    { x: 16, y: 15 },
    { x: 15, y: 15 },
    { x: 14, y: 15 },
    { x: 13, y: 15 },
    { x: 12, y: 15 },
    { x: 11, y: 15 },
    { x: 10, y: 15 },
    { x: 9, y: 15 },
    { x: 8, y: 15 },
    { x: 7, y: 15 },
    { x: 6, y: 15 },
    { x: 5, y: 15 },
    { x: 4, y: 15 },

    //second bottom collumn
    { x: 24, y: 35 },
    { x: 23, y: 35 },
    { x: 22, y: 35 },
    { x: 21, y: 35 },
    { x: 20, y: 35 },
    { x: 19, y: 35 },
    { x: 18, y: 35 },
    { x: 17, y: 35 },
    { x: 16, y: 35 },
    { x: 15, y: 35 },
    { x: 14, y: 35 },
    { x: 13, y: 35 },
    { x: 12, y: 35 },
    { x: 11, y: 35 },
    { x: 10, y: 35 },
    { x: 9, y: 35 },
    { x: 8, y: 35 },
    { x: 7, y: 35 },
    { x: 6, y: 35 },
    { x: 5, y: 35 },
    { x: 4, y: 35 },
  ];
  constructor(size: number, _cellState: CellState = new ManualCellState()) {
    this.board = new Board(size);
    this.grid = this.board.board;
    this.cellState = _cellState;
    this.cellStateManager = new CellStateManager(
      this.board,
      { x: 0, y: 0 },

      { x: 0, y: 49 },

      new GetNeigbour(),
      this.cellState,
      this.walls
    );
  }
  setBoard(board: any): void {
    this.board = board;
    this.grid = this.board.board;
  }
  setCellState(cellState: any): void {
    this.cellState = cellState;
    this.cellStateManager = new CellStateManager(
      this.board,
      undefined,
      undefined,
      undefined,
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
