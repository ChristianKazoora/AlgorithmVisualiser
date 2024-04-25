import { CellModel } from "../model/Interfaces/cellModel";
import { Cell } from "../model/subject/Cell";

export class CellDecorator implements CellModel {
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  pos: number;
  x: number;
  y: number;
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

  constructor(cell: Cell) {
    this.isWall = cell.isWall;
    this.isStart = cell.isStart;
    this.isEnd = cell.isEnd;
    this.pos = cell.pos;
    this.x = cell.x;
    this.y = cell.y;
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
  }
}
// <Grid
//   item
//   xs={0}
//   key={j}
//   data-row={i}
//   data-col={j}
//   className={style}
//   style={{
//     width: "20px",
//     height: "20px",
//     border: "1px solid black",
//   }}
// />;
