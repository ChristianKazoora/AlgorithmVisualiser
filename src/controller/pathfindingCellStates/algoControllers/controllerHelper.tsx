import { HuristicModel } from "../../../model/Interfaces/huristicModel";
import { MovementModel } from "../../../model/Interfaces/movementModel";
import { Board } from "../../../model/subject/board/board";
import { Cell } from "../../../model/subject/Cell";
import { Point } from "../../../shared/point";
import { Stack } from "../../../shared/stack";
import { AlgorithmController } from "../../interfaces/algorithmController";
import { GetDataController } from "../../interfaces/getDataController";
import { GridRenderer } from "../../interfaces/gridRenderer";
import { GridRenderManager } from "../renderer/gridRenderManager";

export abstract class ControllerHelper implements AlgorithmController {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  start: Point | undefined;
  end: Point | undefined;
  visited: Set<Cell> | undefined;
  path: Array<Cell> | undefined;
  currentPoints: Stack<Cell> | undefined;
  neighbourStrategy: MovementModel | undefined;
  walls: Array<Point> = new Array<Point>();
  data: GetDataController | undefined;
  renderer: GridRenderer = new GridRenderManager();
  huristicModel: HuristicModel | undefined;
  abstract getData(): void;
  setHuristicModel(huristicModel: HuristicModel): void {
    this.huristicModel = huristicModel;
  }
  animatePath(): void {
    this.renderer.animatePath();
  }

  reRunAnimatePath(): void {
    this.renderer.reRunAnimatePath();
  }
  setMazeVisitedOrder(OrderVisited: Stack<Cell>): void {
    this.renderer.setMazeVisitedOrder(OrderVisited);
    this.renderer.animateMaze();
  }
  animateMaze(): void {
    this.renderer.animateMaze();
  }

  setBoard(board: any): void {
    this.board = board;
    this.grid = this.ifNull(this.board).grid;
  }
  setStart(pos: Point): void {
    this.start = pos;
    this.ifNull(this.grid)[pos.x][pos.y].isStart = true;
    this.ifNull(this.grid)[pos.x][pos.y].isWall = false;
  }
  removeStart(pos: Point): void {
    this.ifNull(this.grid)[pos.x][pos.y].isStart = false;
  }
  removeEnd(pos: Point): void {
    this.ifNull(this.grid)[pos.x][pos.y].isEnd = false;
  }
  setEnd(pos: Point): void {
    this.end = pos;
    this.ifNull(this.grid)[pos.x][pos.y].isEnd = true;
    this.ifNull(this.grid)[pos.x][pos.y].isWall = false;
  }
  setMovementStrategy(strategy: MovementModel): void {
    this.neighbourStrategy = strategy;
  }
  getMovementStrategy(): MovementModel {
    return this.ifNull(this.neighbourStrategy);
  }
  setWalls(walls: Array<Point>): void {
    if (walls.length === 0) {
      return;
    }
    this.setGridWallsToFalse();
    //remove start and end from walls
    this.walls = walls.filter((wall: any) => {
      return !(
        (wall.x === this.ifNull(this.start).x &&
          wall.y === this.ifNull(this.start).y) ||
        (wall.x === this.ifNull(this.end).x &&
          wall.y === this.ifNull(this.end).y)
      );
    });

    this.ifNull(this.walls).forEach((wall: any) => {
      this.ifNull(this.grid)[wall.x][wall.y].isWall = true;
    });
    this.ifNull(this.grid)[this.ifNull(this.start).x][
      this.ifNull(this.start).y
    ].isWall = false;
    this.ifNull(this.grid)[this.ifNull(this.end).x][
      this.ifNull(this.end).y
    ].isWall = false;
  }
  reRenderBoard(): void {
    this.renderer.reRenderBoard();
  }
  setGridWallsToFalse(): void {
    this.ifNull(this.grid).forEach((row: any) => {
      row.forEach((cell: Cell) => {
        cell.isWall = false;
      });
    });
  }
  setRenderer(renderer: GridRenderer): void {
    this.renderer = renderer;
  }
  getRenderer(): GridRenderer {
    return this.renderer;
  }
  draw(): any {
    this.renderer.setBoard(this.ifNull(this.board));
    return this.renderer.render();
  }
  ifNull(object: any) {
    if (object) {
      return object;
    } else {
      throw new Error("object is undefined");
    }
  }
}
