import { Board } from "../../../model/subject/board/board";
import { Cell } from "../../../model/subject/Cell";
import { Stack } from "../../../shared/stack";
import { A_StarData } from "../getData/aStarData";
import { ControllerHelper } from "./controllerHelper";

export class A_StarController extends ControllerHelper {
  constructor() {
    super();
    this.data = new A_StarData();
  }
  getData(): void {
    this.data?.setBoard(this.ifNull(this.board));
    this.data?.setEnd(this.ifNull(this.end));
    this.data?.setStart(this.ifNull(this.start));
    this.data?.setWalls(this.ifNull(this.walls));
    this.data?.setMovementStrategy(this.ifNull(this.neighbourStrategy));
    this.data?.getData();
    this.setData();
  }
  setData(): void {
    this.visited = this.data?.getVisited();
    this.currentPoints = new Stack<Cell>(); // Create a new Stack object
    this.visited?.forEach((cell) => this.currentPoints?.push(cell)); // Copy elements from the Set to the Stack
    this.currentPoints?.reverse(); // Reverse the order of the elements in the Stack
    this.path = this.data?.getPath() as Array<Cell> | undefined;
    this.board = this.data?.getBoard() as Board;
    this.renderer.setCurrentPoints(this.currentPoints);
    this.renderer.setPath(this.ifNull(this.path));
  }
}