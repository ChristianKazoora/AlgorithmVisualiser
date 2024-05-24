import { MovementModel } from "../../../model/Interfaces/movementModel";
import { Cell } from "../../../model/subject/Cell";
import { Board } from "../../../model/subject/board/board";
import { Point } from "../../../shared/point";
import { CellState } from "../../interfaces/cellState";
import { AlgorithmController } from "../../interfaces/algorithmController";
export class ManualCellState implements CellState {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  algorithmController: AlgorithmController | undefined;
  walls: Array<Point> = new Array<Point>();
  currentPressedCell: any;

  draw(): JSX.Element[][] {
    return this.algorithmController?.draw();
  }
  animatePath(): void {
    this.algorithmController?.animatePath();
  }
  setWalls(walls: Point[]): void {
    // console.log("setWalls", walls);
    this.algorithmController?.setWalls(walls);
  }
  setBoard(board: any): void {
    this.algorithmController?.setBoard(board);
    this.board = board;
    this.grid = board.board;
  }
  setAlgorithmController(algorithm: AlgorithmController): void {
    this.algorithmController = algorithm;
  }
  setStart(pos: Point): void {
    this.algorithmController?.setStart(pos);
  }
  setEnd(pos: Point): void {
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
    console.log("addWalls", this.walls);
  }
  removeWalls(pos: Point): void {
    this.walls = this.walls.filter(
      (wall) => wall.x !== pos.x && wall.y !== pos.y
    );
    this.setWalls(this.walls);
    console.log("removeWalls", this.walls);
  }
  // addEventListeners(): void {
  //   const gridLength = this.ifNull(this.grid).length;
  //   const gridWidth = this.ifNull(this.grid)[0].length;
  //   for (let i = 0; i < gridLength; i++) {
  //     for (let j = 0; j < gridWidth; j++) {
  //       let cell = this.ifNull(this.grid)[i][j];
  //       let currentElement = document.getElementById(
  //         `cell-${cell.x}-${cell.y}`
  //       );
  //       this.ifNull(currentElement).onmousedown = (e: any) => {
  //         e.preventDefault();
  //         if (cell.isStart || cell.isEnd) {
  //           this.currentPressedCell = cell;
  //           console.log(
  //             "mouseDownOn",
  //             this.currentPressedCell,
  //             cell.isStart,
  //             cell.isEnd
  //           );
  //         }
  //         if (cell.isWall) {
  //           this.currentPressedCell = cell;
  //           console.log("mouseDownOnWall", this.currentPressedCell);
  //         }

  //         if (!cell.isStart && !cell.isEnd && !cell.isWall) {
  //           this.currentPressedCell = undefined;
  //           console.log("mouseDownOnEmpty", this.currentPressedCell);
  //         }
  //       };
  //       // this.ifNull(currentElement).onmouseup = (e: any) => {
  //       //   e.preventDefault();
  //       //   if (this.currentPressedCell.isStart) {
  //       //     this.setStart({ x: i, y: j });
  //       //   } else if (this.currentPressedCell.isEnd) {
  //       //     this.setEnd({ x: i, y: j });
  //       //   } else if (this.currentPressedCell.isWall) {
  //       //     this.removeWalls({ x: i, y: j });
  //       //   } else {
  //       //     this.addWalls({ x: i, y: j });
  //       //   }
  //       // };

  //       // this.ifNull(currentElement).onmouseenter = (e: any) => {
  //       //   e.preventDefault();
  //       //   if (this.currentPressedCell) {
  //       //     if (this.currentPressedCell.isStart) {
  //       //       this.setStart({ x: i, y: j });
  //       //     } else if (this.currentPressedCell.isEnd) {
  //       //       this.setEnd({ x: i, y: j });
  //       //     } else if (this.currentPressedCell.isWall) {
  //       //       this.removeWalls({ x: i, y: j });
  //       //     } else {
  //       //       this.addWalls({ x: i, y: j });
  //       //     }
  //       //   }
  //       // };
  //     }
  //   }
  // }

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
        this.ifNull(currentElement).onmousedown = (e: any) => {
          e.preventDefault();
          isDragging = true;
          // console.log("            this.walls.length", this.walls.length);
          if (cell.isStart || cell.isEnd) {
            this.currentPressedCell = cell;
            // this.algorithmController?.reRenderCss();
          }
          if (cell.isWall) {
            this.currentPressedCell = cell;
            isAddingWalls = false;
          } else if (!cell.isStart && !cell.isEnd && !cell.isWall) {
            this.currentPressedCell = undefined;
            isAddingWalls = true;
          }
          if (isAddingWalls) {
            this.addWalls({ x: i, y: j });
          } else if (!isAddingWalls) {
            this.removeWalls({ x: i, y: j });
          }
          this.algorithmController?.reRenderCss();

          // else {
          //   this.currentPressedCell = undefined;
          //   isAddingWalls = true;
          //   this.algorithmController?.reRenderCss();
          // }
          console.log(
            "onmousedown",
            this.currentPressedCell,
            "isDragging",
            isDragging,
            "isAddingWalls",
            isAddingWalls
          );
        };

        this.ifNull(currentElement).onmouseup = (e: any) => {
          e.preventDefault();
          isAddingWalls = false;
          isDragging = false;
          if (this.currentPressedCell) {
            if (this.currentPressedCell.isStart) {
              this.setStart({ x: i, y: j });
            } else if (this.currentPressedCell.isEnd) {
              this.setEnd({ x: i, y: j });
            } else if (isAddingWalls) {
              this.addWalls({ x: i, y: j });
            } else {
              this.removeWalls({ x: i, y: j });
            }
          }
          console.log(
            "onmouseup",
            this.currentPressedCell,
            "isDragging",
            isDragging,
            "isAddingWalls",
            isAddingWalls
          );
        };

        this.ifNull(currentElement).onmouseenter = (e: any) => {
          e.preventDefault();
          if (isDragging && this.currentPressedCell) {
            if (this.currentPressedCell.isStart) {
              this.setStart({ x: i, y: j });
            } else if (this.currentPressedCell.isEnd) {
              this.setEnd({ x: i, y: j });
            } else if (isAddingWalls) {
              this.addWalls({ x: i, y: j });
            } else {
              this.removeWalls({ x: i, y: j });
            }
            console.log(
              "onmouseenter",
              this.currentPressedCell,
              "isDragging",
              isDragging,
              "isAddingWalls",
              isAddingWalls
            );
          }
        };
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
