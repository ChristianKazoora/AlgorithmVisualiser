import { Point } from "framer-motion";
import { MovementModel } from "../../../../../model/Interfaces/movementModel";
import { Board } from "../../../../../model/subject/board/board";
import { AlgorithmController } from "../../../../interfaces/algorithmController";
import { GridRenderer } from "../../../../interfaces/gridRenderer";
import { Cell } from "../../../../../model/subject/Cell";
import { Stack } from "../../../../../shared/stack";
import { GetDataController } from "../../../../interfaces/getDataController";
import { GridRenderManager } from "../../../renderer/gridRenderManager";
import { DfsData } from "../../../getData/dfsData";

export class DfsController implements AlgorithmController {
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
  constructor() {
    this.data = new DfsData();
  }
  draw() {
    this.renderer.setBoard(this.ifNull(this.board));

    return this.renderer.render();
  }
  getData(): void {
    this.data?.setBoard(this.ifNull(this.board));
    this.data?.setEnd(this.ifNull(this.end));
    this.data?.setStart(this.ifNull(this.start));
    this.data?.setWalls(this.ifNull(this.walls));
    this.data?.setMovementStrategy(this.ifNull(this.neighbourStrategy));
    this.data?.getData();

    this.visited = this.data?.getVisited() as Set<Cell> | undefined;
    this.currentPoints = new Stack<Cell>(); // Create a new Stack object
    this.visited?.forEach((cell) => this.currentPoints?.push(cell)); // Copy elements from the Set to the Stack
    this.currentPoints?.reverse(); // Reverse the order of the elements in the Stack
    this.path = this.data?.getPath() as Array<Cell> | undefined;
    this.board = this.data?.getBoard() as Board;
    this.renderer.setCurrentPoints(this.currentPoints);
    this.renderer.setPath(this.ifNull(this.path));
  }
  setBoard(board: any): void {
    this.board = board;
    this.grid = this.ifNull(this.board).grid;
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
  setGridWallsToFalse(): void {
    this.ifNull(this.grid).forEach((row: any) => {
      row.forEach((cell: Cell) => {
        cell.isWall = false;
      });
    });
  }
  animatePath(): void {
    this.renderer.animatePath();
  }
  ifNull(object: any) {
    if (object) {
      return object;
    } else {
      throw new Error("object is undefined");
    }
  }
  removeStart(pos: Point): void {
    this.ifNull(this.grid)[pos.x][pos.y].isStart = false;
  }
  removeEnd(pos: Point): void {
    this.ifNull(this.grid)[pos.x][pos.y].isEnd = false;
  }
  setStart(pos: Point): void {
    this.start = pos;
    this.ifNull(this.grid)[pos.x][pos.y].isStart = true;
    this.ifNull(this.grid)[pos.x][pos.y].isWall = false;
  }
  setEnd(pos: Point): void {
    this.end = pos;
    this.ifNull(this.grid)[pos.x][pos.y].isEnd = true;
    this.ifNull(this.grid)[pos.x][pos.y].isWall = false;
  }
  reRenderCss(): void {
    this.renderer.reRenderCss();
  }
  getRenderer(): GridRenderer {
    return this.renderer;
  }
  setRenderer(renderer: GridRenderer): void {
    this.renderer = renderer;
  }
}
