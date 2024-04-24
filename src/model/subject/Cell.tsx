export class Cell {
  isWall: boolean = false;
  isStart: boolean = false;
  isEnd: boolean = false;
  pos: number = 0;
  x: number = 0;
  y: number = 0;
  previousCell: Cell | undefined;
  top: Cell | undefined;
  bottom: Cell | undefined;
  left: Cell | undefined;
  right: Cell | undefined;
  topRight: Cell | undefined;
  topLeft: Cell | undefined;
  bottomLeft: Cell | undefined;
  bottomRight: Cell | undefined;
  northW: boolean = false;
  southW: boolean = false;
  westW: boolean = false;
  eastW: boolean = false;

  constructor(
    pos: number,
    x: number,
    y: number,
    top: Cell | undefined,
    bottom: Cell | undefined,
    left: Cell | undefined,
    right: Cell | undefined,
    topRight: Cell | undefined,
    topLeft: Cell | undefined,
    bottomLeft: Cell | undefined,
    bottomRight: Cell | undefined,
    isWall: boolean = false,
    isStart: boolean = false,
    isEnd: boolean = false
  ) {
    this.isWall = isWall;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.pos = pos;
    this.x = x;
    this.y = y;
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.topRight = topRight;
    this.topLeft = topLeft;
    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;
  }
  print(): void {
    console.log(
      `Cell: ${this.pos} x: ${this.x} y: ${this.y} isWall: ${this.isWall} isStart: ${this.isStart} isEnd: ${this.isEnd}`
    );
  }
}
