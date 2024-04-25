import { Cell } from "../subject/Cell";

export interface CellModel {
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  pos: number;
  x: number;
  y: number;
  previousCell?: Cell;
  nextCell?: Cell;
  top?: Cell;
  bottom?: Cell;
  left?: Cell;
  right?: Cell;
  topRight?: Cell;
  topLeft?: Cell;
  bottomLeft?: Cell;
  bottomRight?: Cell;
  northW: boolean;
  southW: boolean;
  westW: boolean;
  eastW: boolean;
  classNames: string;
}