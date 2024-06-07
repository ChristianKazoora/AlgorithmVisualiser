import { MovementModel } from "../../../model/Interfaces/movementModel";
import { Cell } from "../../../model/subject/Cell";
import { Board } from "../../../model/subject/board/board";
import { Point } from "../../../shared/point";
import { CellState } from "../../interfaces/cellState";
import { AlgorithmController } from "../../interfaces/algorithmController";
import { GridRenderer } from "../../interfaces/gridRenderer";
import { MazeManager } from "../../../model/subject/maze/mazeManager";
import { manualMazeGenarotor } from "../../../model/subject/maze/manual/manualMazeGenarotor";
export class ManualCellState implements CellState {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  algorithmController: AlgorithmController | undefined;
  walls: Array<Point> = new Array<Point>();
  currentPressedCell: any;
  start: Point = { x: 0, y: 0 };
  end: Point = { x: 0, y: 1 };
  draggingStart_End = "";
  setRenderer(renderer: GridRenderer): void {
    this.algorithmController?.setRenderer(renderer);
  }
  draw(): JSX.Element[][] {
    return this.algorithmController?.draw();
  }
  animatePath(): void {
    this.getData();
    this.algorithmController?.animatePath();
  }
  ganarateMaze(): void {
    const ganarator = new MazeManager(new manualMazeGenarotor());
    ganarator.setBoard(this.ifNull(this.board));
    ganarator.generateMaze();
    this.setBoard(ganarator.getBoard());
  }
  setWalls(walls: Point[]): void {
    this.algorithmController?.setWalls(walls);
  }
  setBoard(board: any): void {
    this.algorithmController?.setBoard(board);
    this.board = board;
    this.grid = board.grid;
  }
  setAlgorithmController(algorithm: AlgorithmController): void {
    this.algorithmController = algorithm;
  }
  setStart(pos: Point): void {
    this.start = pos;

    this.algorithmController?.setStart(pos);
  }
  setEnd(pos: Point): void {
    this.end = pos;
    this.algorithmController?.setEnd(pos);
  }
  setMovementStrategy(strategy: MovementModel): void {
    this.algorithmController?.setMovementStrategy(strategy);
  }
  getData(): void {
    this.algorithmController?.getData();
  }
  addWalls(pos: Point): void {
    this.walls.push(pos);
    this.setWalls(this.walls);
  }
  removeStart(pos: Point): void {
    this.algorithmController?.removeStart(pos);
  }
  removeEnd(pos: Point): void {
    this.algorithmController?.removeEnd(pos);
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

  addEventListeners(): void {
    this.algorithmController?.reRenderCss();
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    let isDragging = false;
    let isAddingWalls = false;
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
            if (cell.isWall) {
              this.currentPressedCell = cell;
              isAddingWalls = false;
            } else if (!cell.isStart && !cell.isEnd && !cell.isWall) {
              this.currentPressedCell = cell;
              isAddingWalls = true;
            }
            if (isAddingWalls) {
              this.addWalls({ x: i, y: j });
            } else if (!isAddingWalls) {
              this.removeWalls({ x: i, y: j });
            }
            this.algorithmController?.reRenderCss();
          };

          this.ifNull(currentElement).onmouseup = (e: any) => {
            e.preventDefault();
            isAddingWalls = false;
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
              } else if (isAddingWalls) {
                if (!this.walls.some((wall) => wall.x === i && wall.y === j)) {
                  this.addWalls({ x: i, y: j });
                } else {
                  this.removeWalls({ x: i, y: j });
                }
              } else {
                this.removeWalls({ x: i, y: j });
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
  ifNull(object: any) {
    if (object) {
      return object;
    } else {
      throw new Error("object is undefined");
    }
  }
}
