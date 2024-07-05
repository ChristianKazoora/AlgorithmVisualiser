import { Cell } from "../../model/subject/Cell";
// East to SouthWest
// East to NorthWest
// West to SouthEast
// West to NorthEast
// North to SouthEast
// North to SouthWest
// South to NorthEast
// South to NorthWest

// NorthEast to NorthWest || NorthWest to NorthEast
// NorthEast to SouthEast || SouthEast to NorthEast
// NorthWest to SouthWest || SouthWest to NorthWest
// SouthEast to SouthWest || SouthWest to SouthEast

export class TurnHelper {
  // corner turns
  //horizontal
  static eastToSouthWest(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.bottomLeft && cell.previousCell == cell.right) ||
        (cell.nextCell == cell.right && cell.previousCell == cell.bottomLeft)
      ) {
        result = true;
      }
    }
    return result;
  }
  static eastToNorthWest(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.topLeft && cell.previousCell == cell.right) ||
        (cell.nextCell == cell.right && cell.previousCell == cell.topLeft)
      ) {
        result = true;
      }
    }
    return result;
  }
  static westToSouthEast(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.bottomRight && cell.previousCell == cell.left) ||
        (cell.nextCell == cell.left && cell.previousCell == cell.bottomRight)
      ) {
        result = true;
      }
    }
    return result;
  }
  static westToNorthEast(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.topRight && cell.previousCell == cell.left) ||
        (cell.nextCell == cell.left && cell.previousCell == cell.topRight)
      ) {
        result = true;
      }
    }
    return result;
  }
  // corner turns
  //vertical
  static northToSouthEast(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.bottomRight && cell.previousCell == cell.top) ||
        (cell.nextCell == cell.top && cell.previousCell == cell.bottomRight)
      ) {
        result = true;
      }
    }
    return result;
  }
  static northToSouthWest(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.bottomLeft && cell.previousCell == cell.top) ||
        (cell.nextCell == cell.top && cell.previousCell == cell.bottomLeft)
      ) {
        result = true;
      }
    }
    return result;
  }
  static southToNorthEast(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.topRight && cell.previousCell == cell.bottom) ||
        (cell.nextCell == cell.bottom && cell.previousCell == cell.topRight)
      ) {
        result = true;
      }
    }
    return result;
  }
  static southToNorthWest(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.topLeft && cell.previousCell == cell.bottom) ||
        (cell.nextCell == cell.bottom && cell.previousCell == cell.topLeft)
      ) {
        result = true;
      }
    }
    return result;
  }
  // corner To Corner line

  static northEastToSouthWest(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.bottomLeft &&
          cell.previousCell == cell.topRight) ||
        (cell.nextCell == cell.topRight && cell.previousCell == cell.bottomLeft)
      ) {
        result = true;
      }
    }
    return result;
  }
  static northWestToSouthEast(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.bottomRight &&
          cell.previousCell == cell.topLeft) ||
        (cell.nextCell == cell.topLeft && cell.previousCell == cell.bottomRight)
      ) {
        result = true;
      }
    }
    return result;
  }

  // corner to corner turns
  static northEastToNorthWest(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.topLeft && cell.previousCell == cell.topRight) ||
        (cell.nextCell == cell.topRight && cell.previousCell == cell.topLeft)
      ) {
        result = true;
      }
    }
    return result;
  }
  static northEastToSouthEast(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.bottomRight &&
          cell.previousCell == cell.topRight) ||
        (cell.nextCell == cell.topRight &&
          cell.previousCell == cell.bottomRight)
      ) {
        result = true;
      }
    }
    return result;
  }
  static northWestToSouthWest(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.bottomLeft &&
          cell.previousCell == cell.topLeft) ||
        (cell.nextCell == cell.topLeft && cell.previousCell == cell.bottomLeft)
      ) {
        result = true;
      }
    }
    return result;
  }
  static southEastToSouthWest(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.bottomLeft &&
          cell.previousCell == cell.bottomRight) ||
        (cell.nextCell == cell.bottomRight &&
          cell.previousCell == cell.bottomLeft)
      ) {
        result = true;
      }
    }
    return result;
  }
  // leftToRight
  static leftToRight(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.right && cell.previousCell == cell.left) {
        result = true;
      }
    }
    return result;
  }
  // rightToLeft
  static rightToLeft(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.left && cell.previousCell == cell.right) {
        result = true;
      }
    }
    return result;
  }
  // topToBottom
  static topToBottom(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.bottom && cell.previousCell == cell.top) {
        result = true;
      }
    }
    return result;
  }
  // bottomToTop
  static bottomToTop(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.top && cell.previousCell == cell.bottom) {
        result = true;
      }
    }
    return result;
  }
  // topRightToBottomLeft
  static left_Right(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.right && cell.previousCell == cell.left) ||
        (cell.nextCell == cell.left && cell.previousCell == cell.right)
      ) {
        return true;
      }
    }
    return result;
  }
  // up_Down
  static up_Down(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.top && cell.previousCell == cell.bottom) ||
        (cell.nextCell == cell.bottom && cell.previousCell == cell.top)
      ) {
        return true;
      }
    }
    return result;
  }
  static topToRightTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.right && cell.previousCell == cell.top) {
        result = true;
      }
    }
    return result;
  }
  static bottomToRightTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.right && cell.previousCell == cell.bottom) {
        result = true;
      }
    }
    return result;
  }
  static leftToBottomTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.bottom && cell.previousCell == cell.left) {
        result = true;
      }
    }
    return result;
  }
  static rightToBottomTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.bottom && cell.previousCell == cell.right) {
        result = true;
      }
    }
    return result;
  }
  static bottomToLeftTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.left && cell.previousCell == cell.bottom) {
        result = true;
      }
    }
    return result;
  }
  static leftToTopTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      console.log();
      if (cell.nextCell == cell.top && cell.previousCell == cell.left) {
        result = true;
      }
    }
    return result;
  }
  static topToLeftTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.left && cell.previousCell == cell.top) {
        result = true;
      }
    }
    return result;
  }
  static rightToTopTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.top && cell.previousCell == cell.right) {
        result = true;
      }
    }
    return result;
  }

  static bottomToNorthEastTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.topRight && cell.previousCell == cell.bottom) {
        result = true;
      }
    }
    return result;
  }
  static topToSouthEastTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.bottomRight && cell.previousCell == cell.top) {
        result = true;
      }
    }
    return result;
  }
  static bottomToNorthWestTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.topLeft && cell.previousCell == cell.bottom) {
        result = true;
      }
    }
    return result;
  }
  static topToSouthWestTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (cell.nextCell == cell.bottomLeft && cell.previousCell == cell.top) {
        result = true;
      }
    }
    return result;
  }
  static topApexTurnToRight(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        cell.nextCell == cell.bottomRight &&
        cell.previousCell == cell.bottomLeft
      ) {
        result = true;
      }
    }
    return result;
  }
  static bottomApexTurn(cell: Cell): boolean {
    let result = false;
    if (cell.nextCell !== undefined && cell.previousCell !== undefined) {
      if (
        (cell.nextCell == cell.topRight && cell.previousCell == cell.topLeft) ||
        (cell.nextCell == cell.left && cell.previousCell == cell.right)
      ) {
        result = true;
      }
    }
    return result;
  }
}
