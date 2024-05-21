import { Cell } from "../../../../../model/subject/Cell";
import { BfsModel } from "../../../../../model/subject/algorithms/pathFinding/bfsModel";
import { Board } from "../../../../../model/subject/board/board";
import { Point } from "../../../../../shared/point";
import { AlgorithmController } from "../../../../interfaces/algorithmController";
import { Set } from "../../../../../shared/set";
import { Pathfinding } from "../../../../../model/subject/algorithms/pathFinding/Pathfinding";
import { Stack } from "../../../../../shared/stack";
import { PathfindingModel } from "../../../../../model/Interfaces/pathfindingModel";
import { MainPath } from "../../../../cellDecorations/paths/mainPath";
import { VisitedPath } from "../../../../cellDecorations/paths/visitedPath";
import { MovementModel } from "../../../../../model/Interfaces/movementModel";
import { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";
import { EmptyCellAnimation } from "../../../../cellDecorations/decorators/emptyCellAnimation";
import { EndCellAnimation } from "../../../../cellDecorations/decorators/endCellAnimation";
import { StartCellAnimation } from "../../../../cellDecorations/decorators/startCellAnimation";
import { WallCellAnimation } from "../../../../cellDecorations/decorators/wallCellAnimation";
import { GetDataController } from "../../../../interfaces/getDataController";
import { BfsData } from "../../../getData/bfsData";
import { GridRenderManager } from "../../../renderer/gridRenderManager";
import { GridRenderer } from "../../../../interfaces/gridRenderer";

export class BfsController implements AlgorithmController {
  board: Board | undefined;
  grid: Array<Array<Cell>> | undefined;
  start: Point | undefined;
  end: Point | undefined;
  visited: Set<Cell> | undefined;
  path: Array<Cell> | undefined;
  currentPoints: Stack<Cell> | undefined;
  neighbourStrategy: MovementModel | undefined;
  walls: Array<Point> | undefined;
  data: GetDataController | undefined;
  renderer: GridRenderer = new GridRenderManager();
  constructor() {
    this.data = new BfsData();
  }

  draw(): any {
    const renderer = this.renderer;
    renderer.setBoard(this.ifNull(this.board));
    let i: number = 0;

    // while (!this.currentPoints?.isEmpty()) {
    //   this.ifNull(this.currentPoints).pop();

    //   let curr = this.ifNull(this.currentPoints).pop() as Cell;
    renderer.setCurrentPoints(this.ifNull(this.currentPoints));
    renderer.setPath(this.ifNull(this.path));
    //   console.log(this.ifNull(this.currentPoints).size());
    //   // yield renderer.render();
    // }

    return renderer.render();
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
  }
  setBoard(board: any): void {
    this.board = board;
    this.grid = this.ifNull(this.board).board;
  }
  setMovementStrategy(strategy: MovementModel): void {
    this.neighbourStrategy = strategy;
  }
  setWalls(walls: Array<Point>): void {
    this.walls = walls;
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
  setStart(pos: Point): void {
    this.start = pos;
    this.ifNull(this.grid)[pos.x][pos.y].isStart = true;
  }
  setEnd(pos: Point): void {
    this.end = pos;
    this.ifNull(this.grid)[pos.x][pos.y].isEnd = true;
  }
}
