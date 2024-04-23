export class Cell {
  pos: number = 0;
  x: number = 0;
  y: number = 0;
  top: Cell | undefined;
  bottom: Cell | undefined;
  left: Cell | undefined;
  right: Cell | undefined;
  topRight: Cell | undefined;
  topLeft: Cell | undefined;
  bottomLeft: Cell | undefined;
  bottomRight: Cell | undefined;

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
    bottomRight: Cell | undefined
  ) {
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
}
