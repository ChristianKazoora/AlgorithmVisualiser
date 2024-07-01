import { MovementModel } from "../../../model/Interfaces/movementModel";
import { Board } from "../../../model/subject/board/board";
import { AlgorithmController } from "../../interfaces/algorithmController";
import { CellState } from "../../interfaces/cellState";
import { Cell } from "../../../model/subject/Cell";
import { GridRenderer } from "../../interfaces/gridRenderer";
import { MazeManager } from "../../../model/subject/maze/mazeManager";
import { autoMazeGenarator } from "../../../model/subject/maze/auto/autoMazeGenarator";
import { Point } from "../../../shared/point";
export class AutoCellState implements CellState {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  algorithmController: AlgorithmController | undefined;
  walls: Array<Point> = new Array<Point>();
  start: Point = { x: 0, y: 0 };
  end: Point = { x: 0, y: 1 };
  draggingStart_End = "";
  currentPressedCell: any;

  animatePath(): void {
    this.getData();
    this.algorithmController?.animatePath();
  }
  setRenderer(renderer: GridRenderer): void {
    this.algorithmController?.setRenderer(renderer);
  }
  setBoard(board: Board): void {
    this.algorithmController?.setBoard(board);
    this.board = board;
    this.grid = board.grid;
    this.start = { x: 0, y: 0 };
    this.end = { x: board.grid.length - 1, y: board.grid[0].length - 1 };
  }
  setStart(pos: Point): void {
    this.start = pos;
    this.algorithmController?.setStart(pos);
  }
  setEnd(pos: Point): void {
    this.end = pos;
    this.algorithmController?.setEnd(pos);
  }
  removeStart(pos: Point): void {
    this.algorithmController?.removeStart(pos);
  }
  removeEnd(pos: Point): void {
    this.algorithmController?.removeEnd(pos);
  }
  setMovementStrategy(strategy: MovementModel): void {
    this.algorithmController?.setMovementStrategy(strategy);
  }
  setWalls(walls: Point[]): void {
    this.algorithmController?.setWalls(walls);
  }
  ganarateMaze(): void {
    const ganarator = new MazeManager(new autoMazeGenarator());
    ganarator.setBoard(this.ifNull(this.board));
    ganarator.generateMaze();
    this.setBoard(ganarator.getBoard());
    this.algorithmController?.reRenderCss();
  }
  getData(): void {
    this.algorithmController?.getData();
  }
  setAlgorithmController(algorithmController: AlgorithmController): void {
    this.algorithmController = algorithmController;
  }
  addEventListeners(): void {
    this.algorithmController?.reRenderCss();
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    let isDragging = false;
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        let cell = this.ifNull(this.grid)[i][j];
        let currentElement = document.getElementById(
          `cell-${cell.x}-${cell.y}`
        );
        if (currentElement) {
          this.ifNull(currentElement).onmousedown = (e: any) => {
            e.preventDefault();
            isDragging = true;
            if (cell.isStart || cell.isEnd) {
              this.currentPressedCell = cell;
            }

            this.algorithmController?.reRenderCss();
          };
          this.ifNull(currentElement).onmouseup = (e: any) => {
            e.preventDefault();
            isDragging = false;
            this.draggingStart_End = "";
            if (this.currentPressedCell) {
              if (this.currentPressedCell.isStart) {
                this.setStart({ x: i, y: j });
              } else if (this.currentPressedCell.isEnd) {
                this.setEnd({ x: i, y: j });
              }
            }
            this.algorithmController?.reRenderCss();
          };
          this.ifNull(currentElement).onmouseenter = (e: any) => {
            e.preventDefault();

            if (isDragging && this.currentPressedCell) {
              if (this.draggingStart_End === "start") {
                this.setStart({ x: i, y: j });
              } else if (this.draggingStart_End === "end") {
                this.setEnd({ x: i, y: j });
              }
              this.algorithmController?.reRenderCss();
            }
          };
          this.ifNull(currentElement).onmouseleave = (e: any) => {
            e.preventDefault();
            if (isDragging && this.currentPressedCell) {
              if (
                this.draggingStart_End === "start" ||
                this.currentPressedCell.isStart
              ) {
                this.draggingStart_End = "start";
                this.removeStart({ x: i, y: j });
              } else if (
                this.currentPressedCell.isEnd ||
                this.draggingStart_End === "end"
              ) {
                this.draggingStart_End = "end";
                this.removeEnd({ x: i, y: j });
              }
              this.algorithmController?.reRenderCss();
            }
          };
        }
      }
    }
  }
  draw() {
    return this.algorithmController?.draw();
  }
  removeWalls(pos: Point): void {
    for (let i = 0; i < this.walls.length; i++) {
      for (let j = 0; j < this.walls.length; j++) {
        if (this.walls[i].x === pos.x && this.walls[i].y === pos.y) {
          this.walls.splice(i, 1);
        }
      }
    }
    this.setWalls(this.walls);
  }
  addWalls(pos: Point): void {
    this.walls.push(pos);
    this.setWalls(this.walls);
  }
  ifNull(data: any): any {
    if (data) {
      return data;
    } else {
      throw new Error("Method not implemented.");
    }
  }
}
