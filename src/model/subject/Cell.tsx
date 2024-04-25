import { CellModel } from "../Interfaces/cellModel";

export class Cell implements CellModel {
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  pos: number;
  x: number;
  y: number;
  previousCell: Cell | undefined;
  nextCell: Cell | undefined;
  top: Cell | undefined;
  bottom: Cell | undefined;
  left: Cell | undefined;
  right: Cell | undefined;
  topRight: Cell | undefined;
  topLeft: Cell | undefined;
  bottomLeft: Cell | undefined;
  bottomRight: Cell | undefined;
  northW: boolean;
  southW: boolean;
  westW: boolean;
  eastW: boolean;
  classNames: string = "";

  constructor(
    isWall = false,
    isStart = false,
    isEnd = false,
    pos = 0,
    x = 0,
    y = 0,
    previousCell = undefined,
    nextCell = undefined,
    top = undefined,
    bottom = undefined,
    left = undefined,
    right = undefined,
    topRight = undefined,
    topLeft = undefined,
    bottomLeft = undefined,
    bottomRight = undefined,
    northW = false,
    southW = false,
    westW = false,
    eastW = false,
    classNames = ""
  ) {
    this.isWall = isWall;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.pos = pos;
    this.x = x;
    this.y = y;
    this.previousCell = previousCell;
    this.nextCell = nextCell;
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.topRight = topRight;
    this.topLeft = topLeft;
    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;
    this.northW = northW;
    this.southW = southW;
    this.westW = westW;
    this.eastW = eastW;
    this.classNames = classNames;
  }
  print(): void {
    console.log(
      `Cell: ${this.pos} x: ${this.x} y: ${this.y} isWall: ${this.isWall} isStart: ${this.isStart} isEnd: ${this.isEnd}`
    );
  }
}