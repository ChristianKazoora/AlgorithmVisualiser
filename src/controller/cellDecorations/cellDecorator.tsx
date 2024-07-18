import { CellModel } from "../../model/Interfaces/cellModel";
import { Cell } from "../../model/subject/Cell";
export abstract class CellDecorator implements CellModel {
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  posFromStart: number;
  x: number;
  y: number;
  pos: number;
  previousCell?: Cell | undefined;
  nextCell?: Cell | undefined;
  top?: Cell | undefined;
  bottom?: Cell | undefined;
  left?: Cell | undefined;
  right?: Cell | undefined;
  topRight?: Cell | undefined;
  topLeft?: Cell | undefined;
  bottomLeft?: Cell | undefined;
  bottomRight?: Cell | undefined;
  northW: boolean;
  southW: boolean;
  westW: boolean;
  eastW: boolean;
  classNames: string = "";
  fScore: number = 0;
  gScore: number = 0;
  hScore: number = 0;
  abstract animate(): JSX.Element;

  constructor(cell: Cell) {
    this.isWall = cell.isWall;
    this.isStart = cell.isStart;
    this.isEnd = cell.isEnd;
    this.posFromStart = cell.posFromStart;
    this.x = cell.x;
    this.y = cell.y;
    this.pos = cell.pos;
    this.previousCell = cell.previousCell;
    this.nextCell = cell.nextCell;
    this.top = cell.top;
    this.bottom = cell.bottom;
    this.left = cell.left;
    this.right = cell.right;
    this.topRight = cell.topRight;
    this.topLeft = cell.topLeft;
    this.bottomLeft = cell.bottomLeft;
    this.bottomRight = cell.bottomRight;
    this.northW = cell.northW;
    this.southW = cell.southW;
    this.westW = cell.westW;
    this.eastW = cell.eastW;
    this.classNames = cell.classNames;
    this.fScore = cell.fScore;
    this.gScore = cell.gScore;
    this.hScore = cell.hScore;
  }
  print(): void {
    console.log(
      `Cell: ${this.posFromStart} x: ${this.x} y: ${this.y} isWall: ${this.isWall} isStart: ${this.isStart} isEnd: ${this.isEnd}`
    );
  }
}
